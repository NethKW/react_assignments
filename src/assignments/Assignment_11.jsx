import "./Assignment_11.css";
import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material";
import TextField from "@mui/material/TextField";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#020e1aff",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#020e1aff",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#020e1aff",
    },
    "&:hover fieldset": {
      borderColor: "#020e1aff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#020e1aff",
    },
  },
});

const LoginButton = styled(Button)({
  backgroundColor: "#0E2148",
  "&:hover": {
    backgroundColor: "#1f5b8dff",
  },
});

function Assignment_11() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = () => {
    if (isLoading) return;
    setIsLoading(true);
    setError("");
    setUserDetails(null);

    axios
      .post("https://auth.dnjs.lk/api/login", { email, password })
      .then((res) => {
        console.log("Login Response:", res.data);
        const accessToken = res.data.access_token;
        if (accessToken) fetchUserDetails(accessToken);
      })
      .catch((err) => {
        console.error("Login Error:", err.response?.data || err.message);
        setError(err.response?.data?.message || "Login Failed. Try again.");
      })
      .finally(() => setIsLoading(false));
  };

  const fetchUserDetails = (token) => {
    axios
      .get("https://auth.dnjs.lk/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("User Details:", res.data);
        setUserDetails(res.data);
      })
      .catch((err) => {
        console.error("Fetch User Error:", err.response?.data || err.message);
        setError("Failed to fetch user details.");
      });
  };

  return (
    <div className="main asg-11">
      <h1>Assignment #11</h1>
      <div className="login">
        {!userDetails ? (
          <Box
            component="form"
            sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
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
              onClick={login}
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </LoginButton>
          </Box>
        ) : (
          <Box className="response">
            <div className="profile">
              <h2>Profile</h2>
            </div>
            <div className="pDetails">
              {userDetails.avatar && (
                <img
                  src={userDetails.avatar}
                  alt="Profile"
                  className="pPic"
                />
              )}
              <h3 className="pName">
                Welcome, {userDetails.name}!
              </h3>
              <p className="pBio">
                {userDetails.bio || "No bio available."}
              </p>
            </div>
          </Box>
        )}
        {error && <p color="error">{error}</p>}
      </div>
    </div>
  );
}

export default Assignment_11;
