import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import styles from "./Dashboard.module.css";
import useMediaQuery from "@mui/material/useMediaQuery";
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
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Home from "../Home/home";
import TaskView from "../task/taskView";
import { useNavigate, useLocation, Navigate, Link } from "react-router-dom";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import { blue } from "@mui/material/colors";
import Logout from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import AddTaskIcon from "@mui/icons-material/AddTask";
import TaskIcon from "@mui/icons-material/Task";
import Leave from "../leave/leave";
import TaskCreate from "../taskCreate/taskCreate";

const drawerWidth = 240;
const getData = () => {
  const data = JSON.parse(window.localStorage.getItem("item"));
  if (data) {
    return data;
  } else {
    return [];
  }
};

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

export default function Dashboard() {
  const { state } = useLocation();

  const [item, setItem] = useState(getData());
  const [detail, setDetail] = useState("");
  const [existingUserProfile, setExistingUserProfile] = useState(false);
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState("Home");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    const newDetail = item?.find((item) => item.name == state?.name);
    setDetail(newDetail);
    if (state?.email == "") {
      navigate(`/`);
    }
  }, [state]);

  useEffect(() => {
    window.localStorage.setItem("item", JSON.stringify(item));
    console.log("item", item);
  }, [item]);
  const deleteData = () => {
    // setItem(
    //   item?.filter((item) => {
    //     return item.name !== state?.name;
    //   })
    // );
    navigate(`/`);
  };
  const handlePageChange = (pageName) => {
    if (isMobile) {
      setOpen(false);
    }
    setCurrentPage(pageName);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const renderContent = () => {
    switch (currentPage) {
      case "Home":
        return (
          <Home item={detail} state={state} open={open} isMobile={isMobile} />
        );
      case "View Task":
        return (
          <TaskView
            item={detail}
            state={state}
            open={open}
            isMobile={isMobile}
          />
        );
      case "Add Task":
        return (
          <TaskCreate
            item={detail}
            state={state}
            open={open}
            isMobile={isMobile}
          />
        );
      case "Leave":
        return (
          <Leave item={detail} state={state} open={open} isMobile={isMobile} />
        );
      default:
        return <Home item={detail} state={state} open={open} />;
    }
  };
  console.log("item state===>", isMobile);
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
            sx={{
              mr: isMobile ? 1 : 2,
              ...(open && { display: "none" }),
              width: isMobile ? "20px" : "40px",
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            style={{
              marginRight: isMobile ? "2px" : "80px",
              width: isMobile ? "230px" : "",
              fontSize: isMobile ? "12px" : "20px",
            }}
            component="div"
          >
            Task Management
          </Typography>
          <div
            style={{
              width: "80%",
              display: "flex",
              justifyContent: isMobile ? "space-between" : "flex-end",
            }}
          >
            <span
              style={{
                marginTop: isMobile ? "8px" : "5px",
                fontSize: isMobile ? "12px" : "20px",
                width: isMobile ? "" : "150px",
              }}
            >
              {state?.name}
            </span>
            {openMenu ? (
              <ArrowDropDownIcon fontSize="large" onClick={handleClose} />
            ) : (
              <ArrowDropUpIcon fontSize="large" onClick={handleClick} />
            )}
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={openMenu}
              onClose={handleClose}
              onClick={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              style={{
                left: isMobile
                  ? "18px"
                  : `calc(82% - ${anchorEl?.getBoundingClientRect().width}px)`,
                top: "40px",
              }}
            >
              <MenuItem onClick={handleClose}>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
                {state?.email}
              </MenuItem>
              {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
              <MenuItem
                onClick={() => {
                  handleClose();
                  deleteData();
                }}
              >
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </div>
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
          <ListItem
            key="Home"
            disablePadding
            onClick={() => handlePageChange("Home")}
            sx={{
              backgroundColor:
                currentPage === "Home" ? "#e7e4e4" : "transparent",
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem
            key="Add Task"
            disablePadding
            onClick={() => handlePageChange("Add Task")}
            sx={{
              backgroundColor:
                currentPage === "Add Task" ? "#e7e4e4" : "transparent",
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <AddTaskIcon />
              </ListItemIcon>
              <ListItemText primary="Add Task" />
            </ListItemButton>
          </ListItem>
          <ListItem
            key="View Task"
            disablePadding
            onClick={() => handlePageChange("View Task")}
            sx={{
              backgroundColor:
                currentPage === "View Task" ? "#e7e4e4" : "transparent",
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <TaskIcon />
              </ListItemIcon>
              <ListItemText primary="View Task" />
            </ListItemButton>
          </ListItem>
          <ListItem
            key="Leave"
            disablePadding
            onClick={() => handlePageChange("Leave")}
            sx={{
              backgroundColor:
                currentPage === "Leave" ? "#e7e4e4" : "transparent",
            }}
          >
            <ListItemButton>
              <ListItemIcon>{/* <HomeIcon /> */}</ListItemIcon>
              <ListItemText primary="Leave" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <div
        style={{
          width: "100%",
          position: "absolute",
          top: isMobile ? "56px" : "65px",
          left: open ? (isMobile ? "0px" : "240px") : "0px",
        }}
      >
        {renderContent()}
      </div>
    </Box>
  );
}
