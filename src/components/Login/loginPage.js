
import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        const requestData = {
            username: email,
            password: password,
          };
      
          axios.post('http://localhost:8080/api/auth/signin', requestData)
          .then((response) => {
            setToken(response.token)
          })
          .catch((error) => {
            console.error('Error:', error);
          });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: 'auto', padding: '20px' }}>
            <Typography variant="h5" gutterBottom>
                Sign In
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
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
                <TextField
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
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={{ margin: '20px 0' }}
                >
                    Sign In
                </Button>
            </form>
            <Typography variant="body2" align="center">
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </Typography>
        </div>
    );
}

export default LoginPage;
