import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// moounting,updating,unmounting

const RegisterPage = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/");
  };
  useEffect(() => {
    console.log("Register Mounting");
    return () => {
      console.log("Register unmount");
    };
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
          variant="outlined"
          label="Email"
          sx={{ width: "40%", mb: 4 }}
        />
        <TextField
          variant="outlined"
          label="Password"
          sx={{ width: "40%", mb: 4 }}
        />
        <Button variant="contained" sx={{ mb: 2 }}>
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
