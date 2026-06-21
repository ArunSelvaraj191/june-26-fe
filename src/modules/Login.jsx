import LoginIcon from "@mui/icons-material/Login";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// moounting,updating,unmounting

const LoginPage = () => {
  const navigate = useNavigate();

  // const [count, setCount] = useState(0);
  const handleNavigate = () => {
    navigate("/register");
  };

  // useEffect(() => {
  //   console.log("Count Updating", count);
  // }, [count]);

  useEffect(() => {
    console.log("Login Mounting");
    return () => {
      console.log("Login unmount");
    };
  }, []);
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
