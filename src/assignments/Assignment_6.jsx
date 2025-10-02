import "./Assignment_6.css";
import React, { useState } from "react";
import { styled } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


const ColorButton = styled(Button)({
  backgroundColor: "#0E2148",
  "&:hover": {
    backgroundColor: "#1f5b8dff",
  },
});

const DeleteButton = styled(Button)({
  backgroundColor: "#bcbcbc2b",
  "&:hover": {
    backgroundColor: "#3d4c58ff",
  },
});

function Assignment_6() {
  const [style, setStyle] = useState([]);
  const [cssProperty, setCssProperty] = useState("");
  const [cssValue, setCssValue] = useState("");



  const handleAdd = () => {
    if (cssProperty.trim() !== "" && cssValue.trim() !== "") {
      setStyle([...style, { name: cssProperty, value: cssValue }]);
      setCssProperty("");
      setCssValue("");
    }
  };

  const handleDelete = (indexToRemove) => {
    setStyle(style.filter((_, index) => index !== indexToRemove));
  };


  const cssObject = style.reduce(
    (obj, item) => ({ ...obj, [item.name]: item.value }),
    {}
  );

  return (
    <div className="main asg-6">
      <h1>Assignment #6</h1>

      <div className="box">



        <Stack direction="row" spacing={2} alignItems="center" marginBottom={2}>

          <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
          >
            <TextField id="css_property" label="CSS Property" variant="outlined"
              placeholder="Enter CSS property"
              value={cssProperty}
              onChange={(e) => setCssProperty(e.target.value)} />
          </Box>
          <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
          >
            <TextField id="css_value" label="CSS Value" variant="outlined"
              placeholder="Enter CSS value"
              value={cssValue}
              onChange={(e) => setCssValue(e.target.value)} />
          </Box>

          <ColorButton onClick={handleAdd} variant="contained">
            Add
          </ColorButton>

        </Stack>


        <ol className="list">
          {style.map((rule, index) => (
            <li key={index}>
              <span>
                {rule.name}: {rule.value}
              </span>
              <DeleteButton
                variant="outlined"
                size="small"
                color="black"
                onClick={() => handleDelete(index)}
              >
                Delete
              </DeleteButton>
            </li>
          ))}
        </ol>


        <div className="sample-text" style={cssObject}>
          Sample Text
        </div>
      </div>
    </div>
  );
}

export default Assignment_6;
