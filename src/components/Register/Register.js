import logo from "../../assets/logo.jpg";
import {
  Container,
  CssBaseline,
  Typography,
  Avatar,
  Box,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Resizer from "react-image-file-resizer";

const Register = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState(searchParams.get("email") ?? "");
  const [imgData, setImgData] = useState(null);

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

  const handleRegister = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
      confirm_password: data.get("confirm-password"),
      name: data.get("name"),
    });
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
        <Avatar
          alt="Wazzup Logo"
          src={logo}
          sx={{ m: 2, width: 75, height: 75 }}
        />
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box
          component="form"
          onSubmit={handleRegister}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            name="name"
            label="Name"
            id="registerComponentName"
            autoComplete="name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email Address"
            id="registerComponentEmail"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="registerComponentPassword"
            autoComplete="new-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirm-password"
            label="Confirm Password"
            type="password"
            id="registerComponentPasswordConfirmation"
            autoComplete="new-password"
          />
          <Button variant="contained" component="label">
            Upload Profile Picture
            <input
              id="registerComponentProfilePicture"
              type="file"
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
            <img className="playerProfilePic_home_tile" src={imgData} />
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <Link to={`/?email=${email}`}>
            {"Already have an account? Login"}
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
