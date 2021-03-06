import logo from "../../assets/logo.jpg";
import { Container, CssBaseline, Typography, Avatar, Box, TextField, Button, Alert } from "@mui/material";
import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import Resizer from "react-image-file-resizer";
import { RegisterAPI } from "../../api/WazzupServerLib";

const Register = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState(searchParams.get("email") ?? "");
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
      console.log(image);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const [name, mail, password, confirm_password] = data.values();
    console.log(name, mail, password, confirm_password, imgData);
    let re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (name === "") {
      setAlertStatus("Invalid Name!");
    } else if (re.test(email)) {
      // this is a valid email address
      // call setState({email: email}) to update the email
      // or update the data in redux store.
      if (password !== confirm_password) {
        setAlertStatus("Invalid, Passwords Don't Match!");
      } else if (password.length == 0) {
        setAlertStatus("Invalid Password!");
      } else {
        try {
          const res = await RegisterAPI(mail, password, name, imgData);
          const status = res.status;
          const ret_data = res.data;

          if (status == 201) {
            localStorage.setItem("jwt_token", ret_data.token);
            localStorage.setItem("name", ret_data.user.name);
            localStorage.setItem("profilepic", ret_data.user.profilepic);
            localStorage.setItem("email", ret_data.user.email);
            //Successful Registration
            console.log("Success!");
            navigate("/chat");
          } else {
            setAlertStatus("Register Failed");
          }
        } catch (e) {
          setAlertStatus("Register Failed, Server Error");
        }
      }
    } else {
      setAlertStatus("Invalid Email Address!");
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
              label="Profile Picture"
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
