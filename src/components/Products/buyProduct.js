import React from "react";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";
import './Product.css'

const BuyProduct = () => {
 const { id } = useParams();
  const storeData = useSelector((state) => state.initialState) || {};

  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const products = useSelector(state => state.allProducts);
  const product = products.find(product => product.id === id);

  const {
    name = "",
    price = "",
    description = "",
    category = "",
    availableItems = "",
    imageUrl = "",
  } = product;

  const navigateToPlaceOrder = () => {
    console.log("In Buy Porducts "+JSON.stringify(product))
    const productDetails = { ...product };
    productDetails.quantity = quantity;

    navigate("/placeOrder", { state: productDetails });
  };

  return (
    <>
      <div>
        <div
          className="flex-row justify-content-center"
          style={{ height: "100vh", width: "100%" }}
        >
          {/* Product Image */}
          <div className="flex-column justify-content-center align-items-start">
            <Card sx={{ maxWidth: 345, boxShadow: "none" }}>
              <CardMedia
                component="img"
                height="345"
                image={
                  imageUrl
                }
              />
            </Card>
          </div>

          <div
            className="flex-column justify-content-center align-items-baseline"
            style={{ marginLeft: "50px", maxWidth: "50%", width: "25%" }}
          >
            <Box className="flex-row align-items-center justify-content-start">
              <Typography
                gutterBottom
                variant="h4"
                component="span"
                style={{
                  marginRight: "20px",
                  marginBottom: "0",
                  fontSize: "28px",
                  fontWeight: "500",
                }}
              >
                {name }
              </Typography>
              <div
                className="flex-row align-items-center"
                style={{
                  background: "#3f51b5",
                  width: "fit-content",
                  height: "auto",
                  color: "white",
                  fontSize: "10px",
                  padding: "5px 5px 7px 7px",
                  borderRadius: "16px",
                  textAlign: "center",
                  fontWeight: "500",
                }}
              >
                <span>Available Quantity : {availableItems}</span>
              </div>
            </Box>
            <Box style={{ marginTop: "12px" }}>
              <span style={{ marginRight: "10px", fontSize: "12px" }}>
                Category :
              </span>
              <strong style={{ fontSize: "12px", fontWeight: "700" }}>
                {category || "Electronics"}
              </strong>
            </Box>
            <Box style={{ marginTop: "20px" }}>
              <div>
                <i style={{ fontSize: "12px", fontWeight: "500" }}>
                  {description }
                </i>
              </div>
              <div style={{ marginTop: "20px", color: "red" }}>
                <span>₹ {price || "10000"}</span>
              </div>
            </Box>

            <Box
              className="flex-column"
              style={{ marginTop: "35px", width: "50%" }}
            >
              <TextField
                id="outlined-number"
                label="Number"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                value={quantity || 1}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <Button
                size="small"
                variant="contained"
                color="primary"
                style={{
                  marginTop: "20px",
                  width: "fit-content",
                  background: "#3f51b5",
                }}
                onClick={navigateToPlaceOrder}
              >
                PLACE ORDER
              </Button>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};
export default BuyProduct;