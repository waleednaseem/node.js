import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import logo from "../Assets/logo.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const theme = createTheme();

export default function SignUp() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:4000/users/Register", {
        Username: name,
        password: password,
      })
      .then((res) =>
        res.data === "User is already registered"
          ? toast.error(res.data)
          : toast.success(res.data)
          // console.log(res.data)
      )
      .catch((err) => console.log(err));
  };
  const UpdateQuery = (e) => {
    e.preventDefault();
    axios.post("http://localhost:4000/users/update", {
      Username: name,
      password: password,
    })
    .then(res=> res.data === 'User not Found'? toast.error(res.data): toast.success(res.data))
    .catch(err => console.log(err))
  };

  return (
    <ThemeProvider theme={theme}>
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  // id="Name"
                  label="Name"
                  // name="Name"
                  // autoComplete="Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  // name="password"
                  label="Password"
                  type="password"
                  // id="password"
                  // autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
          <Typography component="h1" variant="h5">
            Update password
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={UpdateQuery}
            sx={{ mt: 3 }}
            // border='1px solid black'
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  // id="updateName"
                  label="updateName"
                  // name="updateName"
                  // autoComplete="updateName"
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  // name="UpdatePassword"
                  label="Password"
                  type="password"
                  // id="UpdatePassword"
                  // autoComplete="UpdatePassword"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              update user
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
