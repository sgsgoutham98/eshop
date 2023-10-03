import React, { useState } from 'react';
import { Button } from '@mui/material';

const StyledButton = ({ children, ...props }) => (
    <Button
      variant="contained"
      color="primary"
      style={{ background: "#3f51b5" }}
      {...props}
    >
      {children}
    </Button>
  );

  export default StyledButton;