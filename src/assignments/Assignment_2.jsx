import "./Assignment_2.css"
import React, {useState} from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from "@mui/material";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


export function Assignment_2() {
    const [num1,setNum1] = useState('');
    const [num2,setNum2] = useState('');
    const [operation, setOperation] = useState('');
    const [result,setResult] = useState(null
        
    );

    const ColorButton = styled(Button)({
        backgroundColor: '#0E2148',
        "&:hover":{
            backgroundColor:'#1f5b8dff'
        }
    })

    const handleChange = (event) => {
    setOperation(event.target.value);};

    const handleCalculate = () => {
        let n1 = parseFloat(num1);
        let n2 = parseFloat(num2);
        let result = null;

        switch (operation) {
            case '+':
                result = n1+n2;
                break;
            case '-':
                result = n1-n2;
                break;
            case '*':
                result = n1*n2;
                break;
            case '/':
                result = n1/n2;
                break;
        
            default:
                result = "Invalid";
        }

        setResult(result);

    }

  return (
    <div className="main">
        <h1>Assignment #2</h1>
        
        <div className="box">    
            
            <input type="number" name="first number" id="num1" placeholder="Enter your first number" onChange={(e) => setNum1(e.target.value)} />
            <input type="number" name="second number" id="num2" placeholder="Enter your second number" onChange={(e) => setNum2(e.target.value)}/>
        

        
        
        <div className="operation">
            <Box sx={{ minWidth: 220 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select the operation</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={operation}
                label="Operation"
                onChange={handleChange}
                >
                <MenuItem value={'+'}>Addition</MenuItem>
                <MenuItem value={'-'}>Subtraction</MenuItem>
                <MenuItem value={'*'}>Multiplication</MenuItem>
                <MenuItem value={'/'}>Division</MenuItem>
                
                    
                </Select>
                
            </FormControl>
            
            </Box>

            <Stack direction="row" spacing={2}>
                    <ColorButton className="" onClick={handleCalculate} variant="contained">Calculate</ColorButton>
                    
            </Stack>

        </div>

        {result !== null && (
            <h2 style={{ marginTop: "20px" }}>Result: {result}</h2>
            )}    
    </div>    
    </div>
  )
}

export default Assignment_2;