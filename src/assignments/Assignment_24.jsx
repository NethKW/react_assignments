import React, { useRef, useState } from "react";
import "./Assignment_24.css";
import cropIcon from "../assets/crop.png";

function Assignment_24() {
    const canvasRef = useRef(null);
    const [imageURL, setImageURL] = useState(null);
    const [isCropping, setIsCropping] = useState(false);
    const [crop, setCrop] = useState(null);
    const [start, setStart] = useState(null);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const objectURL = URL.createObjectURL(file);
        setImageURL(objectURL);

        const img = new Image();
        img.src = objectURL;
        img.onload = () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
    };

    const handleCropClick = () => {
        setIsCropping(true);
    };

    const handleMouseDown = (e) => {
        if (!isCropping) return;
        const rect = e.target.getBoundingClientRect();
        setStart({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseMove = (e) => {
        if (!isCropping || !start) return;
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setCrop({
            x: Math.min(start.x, x),
            y: Math.min(start.y, y),
            width: Math.abs(x - start.x),
            height: Math.abs(y - start.y),
        });
    };

    const handleMouseUp = () => {
        setIsCropping(false);
    };

    const handleDownload = () => {
        if (!crop) return alert("Select a crop area first!");

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const cropped = ctx.getImageData(crop.x, crop.y, crop.width, crop.height);

        const tempCanvas = document.createElement("canvas");
        const tempCtx = tempCanvas.getContext("2d");
        tempCanvas.width = crop.width;
        tempCanvas.height = crop.height;
        tempCtx.putImageData(cropped, 0, 0);

        const link = document.createElement("a");
        link.download = "cropped-image.png";
        link.href = tempCanvas.toDataURL("image/png");
        link.click();

        setCrop(null);
        setStart(null);
        setIsCropping(false);
    };

    return (
        <div className="main asg-24">
            {cropIcon && <img src={cropIcon} alt="icon" className="crop-icon" />}
            <h1>Image Crop & Download</h1>

            <label className="upload-btn">
                Upload Image
                <input type="file" accept="image/*" onChange={handleFileUpload} />
            </label>

            {imageURL && (
                <div className="canvas-section">
                    <div className="img-area">
                    <canvas
                        ref={canvasRef}
                        className="canvas"
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                    />
                    {crop && (
                        <div
                            className="crop-area"
                            style={{
                                left: crop.x,
                                top: crop.y,
                                width: crop.width,
                                height: crop.height,
                            }}
                        ></div>
                    )}</div>

                    <div className="controls">
                        <button onClick={handleCropClick} className="crop-btn">
                            Crop
                        </button>
                        <button onClick={handleDownload} className="download-btn">
                            Download
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Assignment_24;

