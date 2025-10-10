import "./Assignment_15.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';
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

const UploadButton = styled(Button)({
  backgroundColor: "#107ab8ff",
  color: "white",
  "&:hover": { backgroundColor: "#1373abff" },
});

const accessToken = () => {
  return localStorage.getItem("access_token") ||
    sessionStorage.getItem("access_token");
}



// eslint-disable-next-line react-refresh/only-export-components
function LoginScreen({ setLogged, setUserDetails }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const login = () => {
    if (isLoading) return;
    setIsLoading(true);
    setError("");

    axios
      .post("https://auth.dnjs.lk/api/login", { email, password })
      .then((res) => {
        const token = res.data.access_token;
        if (token) {
          if (keepLoggedIn) {
            localStorage.setItem("access_token", token);
          } else {
            sessionStorage.setItem("access_token", token);
          }

          axios
            .get("https://auth.dnjs.lk/api/user", {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
              setUserDetails(res.data);
              setLogged(true);
            })
            .catch(() => setError("Failed to fetch user details."));
        }
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Login failed. Try again.");
      })
      .finally(() => setIsLoading(false));
  };

  return (
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

      {error && <p style={{ color: "red" }}>{error}</p>}
    </Box>
  );
}


// eslint-disable-next-line react-refresh/only-export-components
function ProfileScreen({ userDetails, setUserDetails, setLogged }) {
  const [error, setError] = useState("");
  const [name, setName] = useState(userDetails.name || "");
  const [description, setDescription] = useState(userDetails.description || "");
  const [avatarFile, setAvatarFile] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // useEffect(() => {
  //   setName(userDetails.name || "");
  //   setDescription(userDetails.description || "");
  // }, [userDetails]);

  const saveProfile = async () => {
    setIsUpdating(true);
    setError("");

    try {
      const res = await axios.put(
        "https://auth.dnjs.lk/api/user",
        { name: name, description: description },
        { headers: { Authorization: `Bearer ${accessToken()}` } }
      );
      setUserDetails(res.data);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update Error:", err.response?.data || err.message);
      setError("Failed to update profile.");
    } finally {
      setIsUpdating(false);
    }
  };

  const uploadImage = async () => {

    if (!avatarFile) return alert('Please select an image first.');
    setIsUploading(true);
    setError("");

    const formData = new FormData();
    formData.append('avatar', avatarFile);

    try {
      const res = await axios.post(
        'https://auth.dnjs.lk/api/avatar',
        formData, {
        headers: {
          Authorization: `Bearer ${accessToken()}`,
          'Content-Type': 'multipart/form-data',
        },
      }
      );

      setUserDetails({ ...userDetails, avatar: res.data.avatar });
      alert('Avatar updated successfully!');
    } catch (err) {
      console.error('Avatar Upload Error:', err.response?.data || err.message);
      setError(err.response?.data.error.message || 'Failed to upload avatar.');
    }
    finally {
      setIsUploading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setError("");

    try {
      await axios.post(
        "https://auth.dnjs.lk/api/logout",
        {},
        { headers: { Authorization: `Bearer ${accessToken()}` } }
      );
    } catch (err) {
      console.error("Logout Error:", err.response?.data || err.message);
    }

    localStorage.removeItem("access_token");
    sessionStorage.removeItem("access_token");
    setUserDetails(null);
    setLogged(false);
    setIsLoading(false);
  };

  return (
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

        <CssTextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <CssTextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={saveProfile}
          disabled={isUpdating}
        >
          {isUpdating ? "Saving..." : "Save"}
        </Button>

        <div className="upload-section">
          <input
            type="file"
            accept="image/*"
            className="upload"
            onChange={(e) => setAvatarFile(e.target.files[0])}
          />
          <UploadButton onClick={uploadImage} disabled={isUploading}>{isUploading ? "Uploading..." : "Upload Avatar"}</UploadButton>
        </div>

        <Button className="" variant="contained" color="primary" onClick={logout} disabled={isLoading}>
          {isLoading ? "Logging out..." : "Logout"}
        </Button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </Box>
  );
}

function Assignment_15() {
  const [logged, setLogged] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {

    if (accessToken()) {
      axios
        .get("https://auth.dnjs.lk/api/user", {
          headers: { Authorization: `Bearer ${accessToken()}` },
        })
        .then((res) => {
          setUserDetails(res.data);
          setLogged(true);
        })
        .catch(() => setLogged(false));
    }
  }, []);

  return (
    <div className="main asg-15">
      <h1>Assignment #15</h1>
      <div className="login">
        {!logged ? (
          <LoginScreen setLogged={setLogged} setUserDetails={setUserDetails} />
        ) : (
          <ProfileScreen
            userDetails={userDetails}
            setUserDetails={setUserDetails}
            setLogged={setLogged}
          />
        )}
      </div>
    </div>
  );
}

export default Assignment_15;
