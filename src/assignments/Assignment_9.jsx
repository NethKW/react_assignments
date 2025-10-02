import "./Assignment_9.css";
import React, { useState, /*useEffect*/ } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material";


const PageButton = styled(Button)({
  backgroundColor: "#bcbcbc2b",
  color: "HighlightText",
  border: "1px solid",
  "&:hover": {
    backgroundColor: "#0c2c47ff",
  },
});

function Assignment_9() {
  const [colors, setColors] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10; 
  const [total, setTotal] = useState(0);


  const fetchColors = (query = search, pg = page) => {
    axios
      .get(
        `https://apis.dnjs.lk/objects/colors.php?search=${query}&page=${pg}&limit=${limit}`
      )
      .then((response) => {
        setColors(response.data.data);
        setPage(response.data.page);
        setTotal(response.data.total);
      })
      .catch((error) => {
        console.error("Error fetching colors:", error);
      });
  };


  const handleSearch = () => {

    if (!search.trim()) {
      return;
    }
    setPage(1);
    fetchColors(search, 1);
  };


  const handlePageChange = (newPage) => {
    fetchColors(search, newPage);
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="main asg-9">
      <h1>Assignment #9</h1>


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


      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <PageButton
            key={i + 1}
            variant={page === i + 1 ? "contained" : "outlined"}
            onClick={() => handlePageChange(i + 1)}
            sx={{ margin: "5px" }}
          >
            {i + 1}
          </PageButton>
        ))}
      </div>
    </div>
  );
}

export default Assignment_9;
