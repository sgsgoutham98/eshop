import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Button, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { useSelector } from 'react-redux';
import { removeToken } from '../../redux/actionTypes/action';
import { useDispatch } from 'react-redux';
const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),  // add margin to left for centering
    width: "50%", 
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Navbar = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const dispatch = useDispatch();
    return (
        <AppBar position="static" sx={{ backgroundColor: '#3f51B5' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" component={Link} to="/">
            <ShoppingCartIcon />
          </IconButton>
  
          <Box sx={{ flexGrow: 1 }} />  
  
    
          {isLoggedIn && (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search…" />
            </Search>
          )}
  
          <Box sx={{ flexGrow: 1 }} /> 
  
          {/* Login and Signup Links */}
          {!isLoggedIn && (
        <> <Button 
            color="inherit" 
            component={Link} 
            to="/login" 
          //  onClick={() => setIsLoggedIn(!isLoggedIn)}  
          >
            Login
          </Button>
          <Button color="inherit" component={Link} to="/signup">
            Signup
          </Button>
          </>)
}

          {isLoggedIn && (
        <Button 
          color="inherit"
          to="/login"
          component={Link} 
          onClick={() =>  dispatch(removeToken())} 
        >
          Logout
        </Button>
      )}
        </Toolbar>
      </AppBar>
    );
  };
  
  export default Navbar;
  
