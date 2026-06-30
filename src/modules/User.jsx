import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const User = () => {
  const BE_URL = import.meta.env.VITE_APP_BackendURL;
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedUsername, setSelectedUsername] = useState("");
  console.log("selectedId :::", selectedId);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setSelectedUsername(event.target.value);
  };

  const handleEdit = (id, username) => {
    // console.log("id :::", id);
    setSelectedId(id);
    setSelectedUsername(username);
  };
  const handleDelete = async (id) => {
    console.log("id :::", id);
    let payload = {
      id: id,
    };
    const response = await axios.put(`${BE_URL}/users/delete`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("response ::::", response);
    if (response.status == 200) {
      alert(response.data.message);
      fetchUser();
      setSelectedId(null);
    }
  };

  const handleSave = async () => {
    console.log("Edited user id =>", selectedId);
    console.log("Edited user name =>", selectedUsername);
    let payload = {
      id: selectedId,
      username: selectedUsername,
    };
    const response = await axios.put(`${BE_URL}/users/update`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("response ::::", response);
    if (response.status == 200) {
      alert(response.data.message);
      fetchUser();
      setSelectedId(null);
      setSelectedUsername("");
    }
  };

  const fetchUser = async () => {
    try {
      console.log("Token ::", token);
      const response = await axios.get(`${BE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setUsers(response.data?.data || []);
      } else {
        navigate("/");
      }
    } catch (error) {
      navigate("/");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: { xs: 2, md: 4 },
        background: "linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)",
      }}
    >
      <Typography variant="h4" fontWeight={700} mb={3} color="text.primary">
        User List
      </Typography>

      {users.length === 0 ? (
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
          }}
        >
          <CardContent>
            <Typography color="text.secondary">No users found yet.</Typography>
          </CardContent>
        </Card>
      ) : (
        <Stack spacing={2}>
          {users.map((user, index) => (
            <Card
              key={user._id || `${user.username}-${index}`}
              sx={{
                borderRadius: 3,
                boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 16px 36px rgba(15, 23, 42, 0.12)",
                },
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 2,
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 48,
                        height: 48,
                        bgcolor: "primary.main",
                        fontWeight: 700,
                      }}
                    >
                      {(user.username || "U").charAt(0).toUpperCase()}
                    </Avatar>

                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "start",
                        }}
                      >
                        {user._id == selectedId ? (
                          <TextField
                            variant="outlined"
                            value={selectedUsername}
                            onChange={handleChange}
                          />
                        ) : (
                          <Typography variant="h6" fontWeight={600}>
                            {user.username || "Unknown user"}
                          </Typography>
                        )}
                        <Typography variant="body1" fontWeight={600}>
                          {user.email || "Unknown user"}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box>
                    <IconButton color="primary">
                      {user._id == selectedId ? (
                        <SaveIcon onClick={handleSave} />
                      ) : (
                        <EditIcon
                          onClick={() => handleEdit(user._id, user.username)}
                        />
                      )}
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(user._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default User;
