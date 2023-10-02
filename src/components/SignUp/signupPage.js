import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Container } from "@mui/material";
import { Link } from "react-router-dom";
import PinkCircleWithLockIcon from "../LockIcon/PinkCircleWithLockIcon";

function SignupComponent() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNumber: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/auth/signup", formData)
      .then((response) => {
        console.log("SignUp successful!", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
   
   <Container component="main" style={{ maxWidth:"400px" ,display: 'flex', flexDirection: 'column', alignItems: 'center',paddingTop:'20px'}}>

    <PinkCircleWithLockIcon/>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          style={{marginBottom: '2px' }}
          fullWidth
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          style={{marginBottom: '2px' }}
          fullWidth
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          style={{marginBottom: '2px' }}
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          style={{marginBottom: '2px' }}
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          style={{marginBottom: '2px' }}
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          style={{marginBottom: '2px' }}
          label="Contact Number"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleInputChange}
        />
        <Button type="submit" fullWidth   style={{ paddingTop: '10px !important' }}  variant="contained" color="primary">
          Sign Up
        </Button>
      </form>
      <Typography align="center">
        Already have an account? <Link to="/login">Sign In</Link>
      </Typography>
    </Container>
    </>
  );
}

export default SignupComponent;
