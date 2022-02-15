import { Container, CssBaseline, Box, Typography } from "@mui/material";

const ErrorPage = () => {
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
        <Typography component="h1" variant="h1">
          Error 404
        </Typography>
      </Box>
    </Container>
  );
};

export default ErrorPage;
