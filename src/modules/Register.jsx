import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// moounting,updating,unmounting

const RegisterPage = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleRegister = async () => {
    console.log("user details :::", userDetails);
    if (userDetails.password != userDetails.confirm_password) {
      alert("Invalid confirmpassword");
      return;
    }
    const BE_URL = import.meta.env.VITE_APP_BackendURL;
    delete userDetails.confirm_password;
    const response = await axios.post(`${BE_URL}/auth/register`, userDetails);
    console.log("response :::", response);
    if (response.status == 201) {
      alert(response.data.message);
      setUserDetails({
        username: "",
        email: "",
        password: "",
        confirm_password: "",
      });
    }
  };

  const handleNavigate = () => {
    navigate("/");
  };

  useEffect(() => {
    console.log("Register mounting :::");
  }, []);

  return (
    <>
      <Typography variant="h4">Register</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 4,
        }}
      >
        <TextField
          name="username"
          variant="outlined"
          label="Username"
          value={userDetails?.username}
          sx={{ width: "40%", mb: 4 }}
          placeholder="Enter your user name"
          onChange={handleChange}
        />
        <TextField
          name="email"
          variant="outlined"
          label="Email"
          value={userDetails?.email}
          sx={{ width: "40%", mb: 4 }}
          placeholder="Enter your Email"
          onChange={handleChange}
        />
        <TextField
          name="password"
          variant="outlined"
          label="Password"
          value={userDetails?.password}
          sx={{ width: "40%", mb: 4 }}
          placeholder="Enter your Password"
          type="password"
          onChange={handleChange}
        />
        <TextField
          name="confirm_password"
          variant="outlined"
          value={userDetails?.confirm_password}
          label="Confirm Password"
          sx={{ width: "40%", mb: 4 }}
          placeholder="Enter your Confirm Password"
          type="password"
          onChange={handleChange}
        />
        <Button variant="contained" sx={{ mb: 2 }} onClick={handleRegister}>
          Register
        </Button>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body1">Already have an account?</Typography>
          <Button variant="text" onClick={handleNavigate}>
            Login
          </Button>
          {/* <Link to={"/"}>Login</Link> */}
        </Box>
      </Box>
    </>
  );
};

export default RegisterPage;
