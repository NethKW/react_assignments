import "./Assignment_10.css";
import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material";
import TextField from "@mui/material/TextField";


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

const LoginButton = styled(Button)({
  backgroundColor: "#0E2148",
  "&:hover": {
    backgroundColor: "#1f5b8dff",
  },
});

function Assignment_10() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = () => {
    if (isLoading) return;
    setIsLoading(true);
    setError("");
    setResponse(null);

    axios
      .post("https://auth.dnjs.lk/api/login", {
        email,
        password,
      })
      .then((res) => {
        console.log("API Response:", res.data);
        setResponse(res.data);
      })
      .catch((err) => {
        console.error("Login Error:", err.response?.data || err.message);
        setError(err.response?.data?.message || "Login Failed. Try again.");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="main asg-10">
      <h1>Assignment #10</h1>

      <div className="login">
        <Box
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete="off"
        >
          <CssTextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <CssTextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <LoginButton
            variant="contained"
            color="primary"
            onClick={login}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </LoginButton>
        </Box>

        {error && <p color="error">{error}</p>}

        {response && (
          <Box className="response">
            <h3>Login Success</h3>
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </Box>
        )}
      </div>
    </div>
  );
}

export default Assignment_10;
