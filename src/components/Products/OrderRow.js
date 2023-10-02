import React from "react";
import { Box,Typography } from "@mui/material";

const OrderRow = ({ productDetails, addressDetails }) => {
    return (
      <div
        style={{ width: "100%" }}
        className="flex-column justify-content-center align-items-center"
      >
        <div
          style={{
            marginTop: "100px",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
            height: "40vh",
            width: "80%",
          }}
          className="flex-row w-100"
        >
          {/* Product Details */}
          <div
            className="flex-row"
            style={{
              borderRight: "1px solid #eceded",
              padding: "30px 6px 6px 24px",
              width: "60%",
              flexWrap: "wrap",
            }}
          >
            <Box>
              <Typography
                variant="h4"
                noWrap
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                {productDetails.name}
              </Typography>
              <Typography
                variant="span"
                //Wrap
                sx={{
                  marginTop: "4px",
                  fontSize: "14px",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                <div style={{ marginTop: "16px" }}>
                  Quantity:{" "}
                  <strong style={{ marginLeft: "4px" }}>
                    {productDetails.quantity}
                  </strong>
                </div>
  
                <div style={{ marginTop: "16px" }}>
                  Category:{" "}
                  <strong style={{ marginLeft: "4px" }}>
                    {productDetails.category}
                  </strong>
                </div>
  
                <div style={{ marginTop: "16px" }}>
                  <i>{productDetails.description}</i>
                </div>
  
                <div
                  style={{
                    marginTop: "16px",
                    color: "red",
                    fontSize: "18px",
                    fontWeight: "500",
                  }}
                >
                  <span>Total Price : </span>
                  <span>₹ {productDetails.quantity * productDetails.price}</span>
                </div>
              </Typography>
            </Box>
          </div>
  
          {/* Address */}
          <div
            className="flex-row"
            style={{ padding: "30px 6px 6px 24px", width: "40%" }}
          >
            <Box>
              <Typography
                variant="h4"
                noWrap
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Address Details :
              </Typography>
              <Typography
                variant="span"
                //Wrap
                sx={{
                  marginTop: "4px",
                  fontSize: "14px",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                <div style={{ marginTop: "6px" }}>{addressDetails.name}</div>
  
                <div style={{ marginTop: "6px" }}>
                  Contact Number: {addressDetails.contactNumber}
                </div>
  
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

  
  export default OrderRow;