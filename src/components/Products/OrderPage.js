import React from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";


const OrderDetail = ({ productDetails, addressDetails }) => {
  return (
    <div className="order-detail-container">
      <div className="detail-box">
        <div className="product-details">
          <Box>
            <Typography variant="h4" sx={{ color: "inherit", textDecoration: "none" }}>
              {productDetails.name}
            </Typography>
            <Typography variant="body1" sx={{ marginTop: "4px", fontSize: "14px", color: "inherit", textDecoration: "none" }}>
              <div style={{ marginTop: "16px" }}>
                Quantity: <strong style={{ marginLeft: "4px" }}>{productDetails.quantity}</strong>
              </div>
              <div style={{ marginTop: "16px" }}>
                Category: <strong style={{ marginLeft: "4px" }}>{productDetails.category}</strong>
              </div>
              <div style={{ marginTop: "16px" }}>
                <i>{productDetails.description}</i>
              </div>
              <div className="total-price">
                <span>Total Price : </span>
                <span>₹ {productDetails.quantity * productDetails.price}</span>
              </div>
            </Typography>
          </Box>
        </div>

        {/* Address */}
        <div className="address-details">
          <Box>
            <Typography variant="h4" sx={{ color: "inherit", textDecoration: "none" }}>
              Address Details :
            </Typography>
            <Typography variant="body1" sx={{ marginTop: "4px", fontSize: "14px", color: "inherit", textDecoration: "none" }}>
              <div style={{ marginTop: "6px" }}>{addressDetails.name}</div>
              <div style={{ marginTop: "6px" }}>Contact Number: {addressDetails.contactNumber}</div>
              <div style={{ marginTop: "6px" }}>
                {addressDetails.street},{addressDetails.city}
              </div>
              <div style={{ marginTop: "6px" }}>{addressDetails.state}</div>
              <div style={{ marginTop: "6px" }}>{addressDetails.zipcode}</div>
            </Typography>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
