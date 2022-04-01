import logo from "../../assets/logo.jpg";
import { Container, CssBaseline, Typography, Avatar, Box, TextField, Button, Alert } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Resizer from "react-image-file-resizer";
import { UpdateAPI } from "../../api/WazzupServerLib";

const UpdateUser = () => {
  const [alertStatus, setAlertStatus] = useState("");
  const [imgData, setImgData] = useState(null);
  let navigate = useNavigate();

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        150,
        150,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64",
        150,
        150
      );
    });

  const onChangePicture = async (event) => {
    try {
      const file = event.target.files[0];
      const image = await resizeFile(file);
      setImgData(image);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const [name, password, confirm_password] = data.values();
    let change = false;

    if (password !== "" || confirm_password !== "" || name !== "" || imgData !== null) {
      change = true;
      if (password !== confirm_password) {
        setAlertStatus("Passwords don't match!");
      } else {
        try {
          const res = await UpdateAPI(name, password, imgData);
          const status = res.status;
          const ret_data = res.data;
          if (status == 200) {
            localStorage.setItem("jwt_token", ret_data.token);
            localStorage.setItem("name", ret_data.user.name);
            localStorage.setItem("profilepic", ret_data.user.profilepic);
            localStorage.setItem("email", ret_data.user.email);
            navigate("/chat");
          } else {
            setAlertStatus("Error!");
          }
        } catch (e) {
          setAlertStatus("Login Failed, Server Error");
        }
      }
    }

    if (change === false) {
      setAlertStatus("Enter details to be updated!");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar alt="Wazzup Logo" src={logo} sx={{ m: 2, width: 75, height: 75 }} />
        <Typography component="h1" variant="h5">
          Update Profile
        </Typography>
        <Box component="form" onSubmit={handleUpdate} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            name="name"
            label="Name"
            type="text"
            id="updateUserComponentName"
            autoComplete="name"
            autoFocus
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="updateUserComponentPassword"
            autoComplete="new-password"
          />
          <TextField
            margin="normal"
            fullWidth
            name="confirm_password"
            label="Confirm Password"
            type="password"
            id="updateUserComponentPasswordConfirmation"
            autoComplete="new-password"
          />
          <Button variant="contained" component="label">
            Upload Profile Picture
            <input
              id="updateUserComponentProfilePicture"
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={onChangePicture}
              hidden
            />
          </Button>

          <Box
            sx={{
              marginTop: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img className="userProfilePicture" src={imgData} />
          </Box>
          {alertStatus ? <Alert severity="error">{alertStatus}</Alert> : null}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Update
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default UpdateUser;
