import React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
function PinkCircleWithLockIcon() {
  const circleStyle = {
    background: "#f50157",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={circleStyle}>
      <LockOutlinedIcon style={{ color: "white" }} />
    </div>
  );
}

export default PinkCircleWithLockIcon;
