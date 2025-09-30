import "./Assignment_3.css";
import React, { useState } from "react";
import { styled } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

function Assignment_3() {
  const [numbers, setNumbers] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const ColorButton = styled(Button)({
    backgroundColor: "#0E2148",
    "&:hover": {
      backgroundColor: "#1f5b8dff",
    },
  });

  const handleAdd = () => {

    const num = parseFloat(inputValue);
    if (!isNaN(num)) {
      setNumbers([...numbers, num]);
      setInputValue("");
    }
  };


  const total = numbers.reduce((acc, curr) => acc + curr, 0);
  const average = numbers.length > 0 ? (total / numbers.length).toFixed(2) : 0;

  return (
    <div className="main asg-3">
      <h1>Assignment #3</h1>

      <div className="box">
        <h3>Total: {total}</h3>
        <h3>Average: {average}</h3>

        <ul className="horizontal">
          {numbers.map((num, index) => (
            <li key={index}>{num}</li>
          ))}
        </ul>


        <Stack direction="row" spacing={2} alignItems="center">
          <input type="number" placeholder="Enter a number" value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <ColorButton onClick={handleAdd} variant="contained">
            Add
          </ColorButton>
        </Stack>
      </div>
    </div>
  );
}

export default Assignment_3;
