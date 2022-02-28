// import * as React from 'react';
import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import HistoryIcon from "@mui/icons-material/History";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Navigate, Link } from "react-router-dom";
import jwt from "jwt-decode";
import logo from "../Assets/logo.png";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function MainPage(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const data = useSelector((state) => {
    return state;
  });
  const history = useNavigate();

  const dispatch = useDispatch();

  const [Country, setCountry] = useState("");

  // const loginAdmin = localStorage.getItem('Login')

  const impData = async () => {
    const logindata = localStorage.getItem("Login");
    // const check =  jwt(logindata)
    // console.log(check.user.Username)
    const DATA = jwt(logindata);
    await dispatch({
      type: "user_id",
      payload: DATA?.user.id,
    });

    await dispatch({
      type: "userdata",
      payload: DATA?.user,
    });
  };
  useEffect(() => {
    impData();
  }, [Country]);

  // console.log(data.country);

  const IPADDRESS = async () => {
    const res = await axios.get("https://api64.ipify.org");
    // console.log(res.data);
    await axios
      .post("http://localhost:4000/users/location", {
        ipAddr: res.data,
      })
      .then(
        (res) => setCountry(res),
        await dispatch({
          type: "country",
          payload: Country.data?.Country,
        })
      )
      .catch((err) => console.log(err));
  };
  // console.log(Country);

  useEffect(() => {
    IPADDRESS();
  }, [Country]);

  function logout() {
    localStorage.clear();
    history("/");
  }
  const logindata = localStorage.getItem("Login");
  const DATA = jwt(logindata);
  // console.log(DATA.users._id)
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" noWrap component="div">
            <img src={logo} alt="TML LOGO" height={60} />
          </Typography>
          <Typography variant="h6" noWrap component="div">
            Welcome! {DATA.user.Username}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {
            DATA.user.Username ==="admin"?
            null:
            <ListItem button onClick={() => history("/")}>
            <ListItemIcon>
              <LineStyleIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          }
          <ListItem button onClick={() => history("/history")}>
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary="History" />
          </ListItem>
          {
            DATA.user.Username ==="admin" &&
            <ListItem button onClick={() => history("/register")}>
            <ListItemIcon>
              <GroupAddIcon />
            </ListItemIcon>
            <ListItemText primary="Register User" />
          </ListItem>
          }
        </List>
        <Divider />

        <Typography
          component="h5"
          variant="h6"
          style={{ marginTop: "20px", marginBottom: "20px" }}
        >
          Location:{" "}
          {`${Country.data?.Country ? Country.data?.Country : "Loading..."}`}
          <img src={logo} alt="TML LOGO" width={220} />
        </Typography>
        <Button variant="outlined" onClick={() => logout()}>
          Log out
        </Button>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <ToastContainer
          position="top-right"
          autoClose={11000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {props.children}
      </Main>
    </Box>
  );
}
