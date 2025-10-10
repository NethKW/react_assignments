import "./Assignment_12.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": { color: "#020e1aff" },
  "& .MuiInput-underline:after": { borderBottomColor: "#020e1aff" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#020e1aff" },
    "&:hover fieldset": { borderColor: "#020e1aff" },
    "&.Mui-focused fieldset": { borderColor: "#020e1aff" },
  },
});

const LoginButton = styled(Button)({
  backgroundColor: "#0E2148",
  "&:hover": { backgroundColor: "#1f5b8dff" },
});

function Assignment_12() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedToken =
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token");

    if (storedToken) {
      fetchUserDetails(storedToken);
    }
  }, []);

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
        if (accessToken) {
          if (keepLoggedIn) {
            localStorage.setItem("access_token", accessToken);
          } else {
            sessionStorage.setItem("access_token", accessToken);
          }
          fetchUserDetails(accessToken);
        }
      })
      .catch((err) => {
        console.error("Login Error:", err.response?.data || err.message);
        setError(err.response?.data?.error.message);
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

  const logout = () => {
    localStorage.removeItem("access_token");
    sessionStorage.removeItem("access_token");
    setUserDetails(null);
  };

  return (
    <div className="main asg-12">
      <h1>Assignment #12</h1>

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

            <FormControlLabel
              control={
                <Checkbox
                  checked={keepLoggedIn}
                  onChange={(e) => setKeepLoggedIn(e.target.checked)}
                  color="primary"
                />
              }
              label="Keep me logged in"
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

              <div className="profile-info">
                <h3 className="pName">Welcome, {userDetails.name}!</h3>
                <p className="pBio">{userDetails.description || "No description available."}</p>
              </div>

              <Button variant="contained" color="primary" onClick={logout}>
                Logout
              </Button>
            </div>
          </Box>
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

export default Assignment_12;
