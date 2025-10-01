import "./Assignment_4.css";
import React, { useState } from "react";
import { styled } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const ColorButton = styled(Button)({
  backgroundColor: "#0E2148",
  "&:hover": {
    backgroundColor: "#1f5b8dff",
  },
});

function Assignment_4() {
  const [numbers, setNumbers] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    const num = parseFloat(inputValue);
    if (!isNaN(num)) {
      setNumbers([...numbers, num]);
      setInputValue("");
    }
  };

  const handleDelete = (indexToRemove) => {
    const array = numbers.filter((_, index) => index !== indexToRemove);
    setNumbers(array);
  };

  return (
    <div className="main asg-4">
      <h1>Assignment #4</h1>

      <div className="box">
        <ol className="list">
          {numbers.map((num, index) => (
            <li key={index}>
              {num}{" "}
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => handleDelete(index)}
              >
                Delete
              </Button>
            </li>
          ))}
        </ol>


        <Stack direction="row" spacing={2} alignItems="center">
          <input
            type="number"
            placeholder="Enter a number"
            value={inputValue}
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

export default Assignment_4;
