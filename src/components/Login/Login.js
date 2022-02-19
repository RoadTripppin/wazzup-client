import { Alert, Avatar, Box, Button, Container, CssBaseline, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { LoginAPI } from "../../api/WazzupServerLib";
import logo from "../../assets/logo.jpg";

const Login = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState(searchParams.get("email") ?? "");
  const [alertStatus, setAlertStatus] = useState("");

  const handleLogin = async (event) => {
    //TODO: handle login functionality
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = data.get("password");
    let re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(email)) {
      // this is a valid email address
      setAlertStatus("");
      if (password !== "") {
        const res = await LoginAPI(data.get("email"), data.get("password"));
        if (res) {
          //Successful Login
          console.log("Success!");
        } else {
          setAlertStatus("Invalid Credentials");
        }
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
          Login
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email Address"
            type="email"
            id="loginComponentEmail"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="loginComponentPassword"
            autoComplete="current-password"
          />
          {alertStatus ? <Alert severity="error">{alertStatus}</Alert> : null}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Login
          </Button>
          <Link to={`/register?email=${email}`}>{"Don't have an account? Sign Up"}</Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
