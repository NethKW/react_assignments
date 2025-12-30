import React, { useState, useRef } from "react";
import "./AssignmentW_40.css";
import typing from "../assets/typing.png"
import voice from "../assets/voice record3.png"
function AssignmentW_40() {
    const [textToSpeak, setTextToSpeak] = useState("");
    const [recognizedText, setRecognizedText] = useState("");
    const recognitionRef = useRef(null);
    const [error, setError] = useState("");

    const handleSpeak = () => {
        if (!textToSpeak.trim()) {
            setError("Please type something first!");
            setTimeout(()=>{setError("");
            }, 2000);
            return;
        }
        setError("");
        const msg = new SpeechSynthesisUtterance(textToSpeak);
        window.speechSynthesis.speak(msg);
    };

    const startRecognition = () => {
        setRecognizedText("");

        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event) => {
            let finalTranscript = "";
            for (let i = 0; i < event.results.length; i++) {
                finalTranscript += event.results[i][0].transcript;
            }
            setRecognizedText(finalTranscript);
        };

        recognition.start();
        recognitionRef.current = recognition;
    };

    const stopRecognition = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
    };

    return (
        <div className="main asgW-40">
            <h2>Text & Speech </h2>
            <div className="section">
                <img src={typing} alt="typing" className="image" />

                <textarea
                    placeholder="Type something to speak..."
                    value={textToSpeak}
                    onChange={(e) => setTextToSpeak(e.target.value)}
                />

                <button onClick={handleSpeak}>Start Speech</button>
                {error && <p className="error-msg">{error}</p>}

            </div>

            <div className="section">
                <img src={voice} alt="voice" className="image" />

                <div className="btn">
                    <button onClick={startRecognition}>Start Recognition</button>
                    <button onClick={stopRecognition}>Stop</button>
                </div>

                <h4>Recognized Text:</h4>
                <div className="text-box">{recognizedText}</div>
            </div>
        </div>
    );
}

export default AssignmentW_40;
