import "./Assignment_8.css";
import React, { useState, /*useEffect*/ } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function Assignment_8() {
  const [colors, setColors] = useState([]);
  const [search, setSearch] = useState("");


//   useEffect(() => {
//     axios
//       .get("https://apis.dnjs.lk/objects/colors.php")
//       .then((response) => {
//         setColors(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching colors:", error);
//       });
//   }, []);

  const handleSearch = () => {
    axios
      .get(`https://apis.dnjs.lk/objects/colors.php?search=${search}`)
      .then((response) => {
        setColors(response.data);
      })
      .catch((error) => {
        console.error("Error searching colors:", error);
      });
  };

  return (
    <div className="main asg-8">
      <h1>Assignment #8</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter color name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </div>

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
              <strong>{color.name}</strong> : {color.code}
            </Box>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Assignment_8;
