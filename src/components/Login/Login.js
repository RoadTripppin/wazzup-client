import { Alert, Avatar, Box, Button, Container, CssBaseline, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { LoginAPI } from "../../api/WazzupServerLib";
import logo from "../../assets/logo.jpg";

const Login = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState(searchParams.get("email") ?? "");
  const [alertStatus, setAlertStatus] = useState("");
  let navigate = useNavigate();

  const handleLogin = async (event) => {
    //TODO: Test login functionality
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = data.get("password");
    const mail = data.get("email");
    let re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(mail)) {
      // this is a valid email address
      setAlertStatus("");
      if (password !== "") {
        try {
          const res = await LoginAPI(mail, password);
          const status = res.status;
          const ret_data = res.data;

          if (status == 200) {
            localStorage.setItem("jwt_token", ret_data.token);
            localStorage.setItem("name", ret_data.user.name);
            localStorage.setItem("profilepic", ret_data.user.profilepic);
            localStorage.setItem("email", ret_data.user.email);
            //Successful Login
            console.log("Success!");
            navigate("/chat");
          } else if (status == 401) {
            setAlertStatus("Login Failed, Invalid Credentials");
          } else {
            setAlertStatus("Login Failed, Server Error");
          }
        } catch (e) {
          setAlertStatus("Login Failed, Server Error");
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
