import "./Assignment_5.css";
import React, { useState } from "react";
import { styled } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

function Assignment_5() {
  const [numbers, setNumbers] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const ColorButton = styled(Button)({
    backgroundColor: "#0E2148",
    "&:hover": {
      backgroundColor: "#1f5b8dff",
    },
  });

  const MoveButton = styled(Button)({
    backgroundColor: "#8787872b",
    "&:hover": {
      backgroundColor: "#3d4c58ff",
    },
  });

  const handleAdd = () => {
    const num = parseFloat(inputValue);
    if (!isNaN(num)) {
      setNumbers([...numbers, num]);
      setInputValue("");
    }
  };

  const handleDelete = (indexToRemove) => {
    setNumbers(numbers.filter((_, index) => index !== indexToRemove));
  };

  const handleSortAsc = () => {
    setNumbers([...numbers].sort((a, b) => a - b));
  };

  const handleSortDesc = () => {
    setNumbers([...numbers].sort((a, b) => b - a));
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const newArr = [...numbers];
    const [item] = newArr.splice(index, 1);       
    newArr.splice(index - 1, 0, item);           
    setNumbers(newArr);
  };

  const handleMoveDown = (index) => {
    if (index === numbers.length - 1) return;
    const newArr = [...numbers];
    const [item] = newArr.splice(index, 1);       
    newArr.splice(index + 1, 0, item);           
    setNumbers(newArr);
  };

  return (
    <div className="main asg-5">
      <h1>Assignment #5</h1>

      <div className="box">
        
        <Stack direction="row" spacing={2} alignItems="center" marginBottom={2}>
          <ColorButton onClick={handleSortAsc} variant="contained">
            Sort Ascending
          </ColorButton>
          <ColorButton onClick={handleSortDesc} variant="contained">
            Sort Descending
          </ColorButton>
        </Stack>

        
        <ol className="list">
          {numbers.map((num, index) => (
            <li key={index}>
              <span>{num}</span>
              <Stack direction="row" spacing={1}>
                <MoveButton
                  variant="outlined"
                  color="blue"
                  size="small"
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0}
                >
                  Move Up
                </MoveButton>
                <MoveButton 
                  variant="outlined"
                  color="blue"
                  size="small"
                  onClick={() => handleMoveDown(index)}
                  disabled={index === numbers.length - 1}
                >
                  Move Down
                </MoveButton>
                <Button className="delete"
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </Button>
              </Stack>
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

export default Assignment_5;
