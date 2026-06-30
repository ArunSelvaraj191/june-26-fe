import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import User from "./User";

const Dashboard = () => {
  const navigate = useNavigate();

  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };
  return (
    <Box>
      <Container sx={{ mt: 5 }}>
        <Typography>Hi, I'm {username}</Typography>
        <Button sx={{ mt: 5 }} onClick={handleLogout} variant="contained">
          Logout
        </Button>
        <Box sx={{ mt: 5 }}>
          <User />
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;
