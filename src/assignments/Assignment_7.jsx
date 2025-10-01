import "./Assignment_7.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";

function Assignment_7() {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    axios
      .get("https://apis.dnjs.lk/objects/colors.php")
      .then((response) => {
        setColors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching colors:", error);
      });
  }, []);

  return (
    <div className="main asg-7">
      <h1>Assignment #7</h1>

      <div className="box">
        <h3>Colors from API</h3>
        <div className="color-grid">
          {colors.map((color, index) => (
            <Box
              key={index}
              sx={{
                backgroundColor: color.code,
                color: "black",
                padding: "10px",
                margin: "10px",
                borderRadius: "8px",
                textAlign: "center",
                width: "320px",
              }}
            >
              <strong> {color.name} </strong> : {color.code}
            </Box>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Assignment_7;
