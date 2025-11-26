import React, { useState, useRef } from "react";
import "./Assignment_41.css";

function Assignment_41() {
    const [text, setText] = useState("");
    const fileHandleRef = useRef(null);

    const openFile = async () => {
        try {
            const [fileHandle] = await window.showOpenFilePicker({
                types: [
                    {
                        description: "Text Files",
                        accept: { "text/plain": [".txt"] },
                    },
                ],
                multiple: false,
            });
            fileHandleRef.current = fileHandle;

            const file = await fileHandle.getFile();
            const content = await file.text();
            setText(content);

        } catch {
            console.log("Open cancelled");
        }
    };

    const saveFile = async () => {
        try {
            let fileHandle = fileHandleRef.current;

            if (!fileHandle) {
                fileHandle = await window.showSaveFilePicker({
                    suggestedName: "untitled.txt",
                    types: [
                        {
                            description: "Text Files",
                            accept: { "text/plain": [".txt"] },
                        },
                    ],
                });
                fileHandleRef.current = fileHandle;
            }

            const writable = await fileHandle.createWritable();
            await writable.write(text);
            await writable.close();

            alert("File saved successfully!");

        } catch {
            console.log("Save cancelled");
        }
    };
    
    const closeFile = () => {
        fileHandleRef.current = null;
        setText("");
    };

    return (
        <div className="main asg-41">
            <h2>Text Editor</h2>

            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Start typing..."
            ></textarea>

            <div className="buttons">
                <button onClick={openFile}>Open</button>
                <button onClick={saveFile}>Save</button>
                <button onClick={closeFile}>Close</button>
            </div>
        </div>
    );
}

export default Assignment_41;
