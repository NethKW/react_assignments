import "./Assignment_1.css"
import React, {useState} from "react";
import Button from '@mui/material/Button';
import { styled } from "@mui/material";
import Stack from '@mui/material/Stack';


function Assignment_1() {
    const [currentState, setcurrentState] = useState(0);

    const ColorButton = styled(Button)({
        backgroundColor: '#0E2148',
        "&:hover":{
            backgroundColor:'#1f5b8dff'
        }
    })
  return (
    <div className="main">
        <h1>Assignment #1</h1>
        <Stack direction="row" spacing={2}>
            <ColorButton className="" onClick={() => {setcurrentState(1);}} variant="contained">Section #1</ColorButton>
            <ColorButton onClick={() => {setcurrentState(2);}} variant="contained" >Section #2</ColorButton>
            <ColorButton onClick={() => {setcurrentState(3);}} variant="contained">Section #3</ColorButton>
        </Stack>
        <div>
            {currentState === 1 && <p>this is first</p>}
            {currentState === 2 && <p>this is second</p>}
            {currentState === 3 && <p>this is third</p>}
        </div>
        
    </div>
  )
}

export default Assignment_1;