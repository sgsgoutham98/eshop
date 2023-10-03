import React, { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";

const CustomAlert = ({
  open,
  handleClose,
  message,
  severity,
  autoHideDuration = 6000,
}) => {
  const [progress, setProgress] = useState(0);
  const [transition, setTransition] = useState("linear");

  useEffect(() => {
    let timer;
    if (open) {
      setTransition("none");
      setProgress(0);
      timer = setInterval(() => {
        setProgress((oldProgress) => {
          const diff = 100 / (autoHideDuration / 100);
          setTransition("linear");
          return Math.min(oldProgress + diff, 100);
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [open, autoHideDuration]);

  useEffect(() => {
    let timer;
    if (progress === 100) {
      timer = setTimeout(handleClose, autoHideDuration);
    }
    return () => clearTimeout(timer);
  }, [progress, handleClose, autoHideDuration]);

  const alertStyles = {
    bgcolor: severity === "error" ? "#ED4337" : "#06bc0b", // Update colors here
    color: "white",
  };

  return (
    <Snackbar
    open={open}
    onClose={handleClose}
    autoHideDuration={autoHideDuration}
    anchorOrigin={{ vertical: "top", horizontal: "right" }}
  >
    <Alert severity={severity} sx={alertStyles} icon={false}>
      {message}
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          marginTop: "10px",
          bgcolor: severity === "error" ? "#ED4337" : "#06bc0b", 
          transition: transition,
          "& .MuiLinearProgress-bar": {
            bgcolor: "white", 
          }
        }}
      />
    </Alert>
  </Snackbar>
  
  );
};

export default CustomAlert;
