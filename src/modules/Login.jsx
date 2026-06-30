import LoginIcon from "@mui/icons-material/Login";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// moounting,updating,unmounting

const LoginPage = () => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  // const [count, setCount] = useState(0);
  const handleNavigate = () => {
    navigate("/register");
  };

  // useEffect(() => {
  //   console.log("Count Updating", count);
  // }, [count]);

  const handleLogin = async () => {
    const BE_URL = import.meta.env.VITE_APP_BackendURL;
    const response = await axios.post(`${BE_URL}/auth/login`, userDetails);
    if (response.status == 203) {
      alert(response.data.message);
    } else {
      alert(response.data.message);
      localStorage.setItem("username", response.data.data[0].username);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    console.log("Component rendering everytime");
    return () => {
      console.log("Component Unmounting - Clear");
    };
  }, []);

  useEffect(() => {
    console.log("Component rendering while updating", userDetails);
  }, [userDetails]);

  return (
    <>
      <Typography variant="h4">Login</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 4,
        }}
      >
        <TextField
          name="email"
          value={userDetails?.email}
          variant="outlined"
          label="Email"
          sx={{ width: "40%", mb: 4 }}
          onChange={handleChange}
        />
        <TextField
          name="password"
          value={userDetails?.password}
          variant="outlined"
          label="Password"
          type="password"
          sx={{ width: "40%", mb: 4 }}
          onChange={handleChange}
        />
        <Button variant="contained" sx={{ mb: 2 }} onClick={handleLogin}>
          Login <LoginIcon />
        </Button>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body1">Create an new Account?</Typography>
          <Button variant="text" onClick={handleNavigate}>
            Register
          </Button>
        </Box>
        {/* <Button onClick={() => setCount(count + 1)}>Count - {count}</Button> */}
      </Box>
    </>
  );
};

export default LoginPage;
