import logo from "../../assets/logo.jpg";
import { Container, CssBaseline, Typography, Avatar, Box, TextField, Button, Alert } from "@mui/material";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Resizer from "react-image-file-resizer";

const Register = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState(searchParams.get("email") ?? "");
  const [alertStatus, setAlertStatus] = useState("");
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
      console.log(image);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRegister = (event) => {
    //TODO: handle register functionality
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const [name, mail, password, confirm_password] = data.values();
    console.log(name, mail, password, confirm_password, imgData);
    let re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(email)) {
      // this is a valid email address
      // call setState({email: email}) to update the email
      // or update the data in redux store.
      if (password !== confirm_password) {
        setAlertStatus("Passwords don't match!");
      } else if (password.length == 0) {
        setAlertStatus("Invalid Password!");
      } else {
        setAlertStatus("");
      }
    } else {
      setAlertStatus("Invalid email address!");
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
          Register
        </Typography>
        <Box component="form" onSubmit={handleRegister} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="name"
            label="Name"
            type="text"
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
            type="email"
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
            name="confirm_password"
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
            Register
          </Button>
          <Link to={`/?email=${email}`}>{"Already have an account? Login"}</Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
