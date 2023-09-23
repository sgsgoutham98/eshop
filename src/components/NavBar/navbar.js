
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Button, TextField } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [filterText, setFilterText] = useState('');

    const handleFilterChange = (e) => {
        setFilterText(e.target.value);
      
    };

    return (
        <AppBar position="static">
            <Toolbar>
      
                <IconButton edge="start" color="inherit" component={Link} to="/">
                    <ShoppingCartIcon />
                </IconButton>

                <div style={{ flexGrow: 1, marginLeft: '20px' }}>
                    <TextField 
                        variant="outlined" 
                        size="small" 
                        label="Filter" 
                        value={filterText} 
                        onChange={handleFilterChange} 
                    />
                </div>

                {/* Login and Signup Links */}
                <Button color="inherit" component={Link} to="/login">
                    Login
                </Button>
                <Button color="inherit" component={Link} to="/signup">
                    Signup
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
