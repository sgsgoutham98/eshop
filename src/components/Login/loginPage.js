import { useDispatch } from "react-redux";
import React, { useState,useContext } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { styled } from "@mui/system";
import PinkCircleWithLockIcon from "../LockIcon/PinkCircleWithLockIcon";
import { addToken } from "../../redux/actionTypes/action";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../../API/axios";
import { AlertContext } from "../CustomAlert/alertContext";


const PageContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "70vh",
});

const CustomTextField = styled(TextField)({
  width: "100%",
});

const CustomButton = styled(Button)({
  width: "100%",
  backgroundColor: "#3f51B5",
});

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const HTTP = useAxios();
  const showAlert = useContext(AlertContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestData = {
      username: email,
      password: password,
    };
    if (email == '' || password == '') {
      showAlert("Please enter all mandatory fields to proceed.", 'error');
      return;
    }

    
    axios
      .post("http://localhost:8080/api/auth/signin", requestData)
      .then((response) => {
        console.log(response);
        showAlert('This is an alert message!', 'success');
        if (response.headers["x-auth-token"]) {
          localStorage.setItem('x-auth-token', response.headers['x-auth-token'])
          dispatch(addToken(response));
          navigate("/products");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <React.Fragment>
      <PageContainer>
        <PinkCircleWithLockIcon />
        <Typography variant="h5" gutterBottom>
          Sign In
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "30%" }}>
          <CustomTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <CustomTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <CustomButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign In
          </CustomButton>
        </form>
        <Typography variant="body2" align="center">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </Typography>
      </PageContainer>
    </React.Fragment>
  );
}

export default LoginPage;
