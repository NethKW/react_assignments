import React, { useState } from "react";
import "./Assignment_22.css";
import filterIcon from "../assets/filter.png"; 

function Assignment_22() {
  const [imageURL, setImageURL] = useState(null);
  const [filters, setFilters] = useState({
    blur: 0,
    brightness: 100,
    contrast: 100,
    grayscale: 0,
    hueRotate: 0,
    invert: 0,
    opacity: 100,
    saturate: 100,
    sepia: 0,
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const objectURL = URL.createObjectURL(file);
    setImageURL(objectURL);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleReset = () => {
    setFilters({
      blur: 0,
      brightness: 100,
      contrast: 100,
      grayscale: 0,
      hueRotate: 0,
      invert: 0,
      opacity: 100,
      saturate: 100,
      sepia: 0,
    });
  };

  const filterControls = [
    { name: "blur", min: 0, max: 10 },
    { name: "brightness", min: 0, max: 200 },
    { name: "contrast", min: 0, max: 200 },
    { name: "grayscale", min: 0, max: 100 },
    { name: "hueRotate", min: 0, max: 360 },
    { name: "invert", min: 0, max: 100 },
    { name: "opacity", min: 0, max: 100 },
    { name: "saturate", min: 0, max: 200 },
    { name: "sepia", min: 0, max: 100 },
  ];

  const filterStyle = `
    blur(${filters.blur}px)
    brightness(${filters.brightness}%)
    contrast(${filters.contrast}%)
    grayscale(${filters.grayscale}%)
    hue-rotate(${filters.hueRotate}deg)
    invert(${filters.invert}%)
    opacity(${filters.opacity}%)
    saturate(${filters.saturate}%)
    sepia(${filters.sepia}%)
  `;

  return (
    <div className="main asg-22">
      <div className="filter-header">
        {filterIcon && <img src={filterIcon} alt="icon" className="filter-icon" />}
        <h1>... Image Filter App ...</h1>
      </div>

      <label className="upload-btn">
        Upload Image
        <input type="file" accept="image/*" onChange={handleFileUpload} />
      </label>

      {imageURL && (
        <div className="filter-preview">
          <img
            src={imageURL}
            alt="Uploaded"
            style={{ filter: filterStyle }}
            className="preview-image"
          />
        </div>
      )}

      {imageURL && (
        <div className="controls">

          {filterControls.map(({ name, min, max }) => (
            <div className="control" key={name}>
              <label>
                {name} ({filters[name]})
              </label>
              <input
                type="range"
                name={name}
                min={min}
                max={max}
                value={filters[name]}
                onChange={handleChange}
              />
            </div>
          ))}
          <button onClick={handleReset} className="reset-btn">Reset Filters</button>
        </div>
      )}
    </div>
  );
}

export default Assignment_22;
