import "./Assignment_8.css";
import React, { useState, /*useEffect*/ } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material";
import TextField from '@mui/material/TextField';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#020e1aff',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#020e1aff',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#020e1aff',
    },
    '&:hover fieldset': {
      borderColor: '#020e1aff',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#020e1aff',
    },
  },
});

const ColorButton = styled(Button)({
  backgroundColor: "#0E2148",
  "&:hover": {
    backgroundColor: "#1f5b8dff",
  },
});

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
        <div >

          <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
          >
            <CssTextField id="css_value" label="Color name" variant="outlined"
              placeholder="Enter CSS value"
              value={search}
              onChange={(e) => setSearch(e.target.value)} />
          </Box>
        </div>
        <div>
          <ColorButton variant="contained" color="primary" onClick={handleSearch}>
            Search
          </ColorButton>
        </div>
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
