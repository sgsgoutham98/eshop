import React, { useEffect, useState,useContext } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ToggleButton from "@mui/lab/ToggleButton";
import ToggleButtonGroup from "@mui/lab/ToggleButtonGroup";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useDispatch } from "react-redux";
import { useAxios } from "../../API/axios";
import {
  filterProducts,
  deleteProduct,
  updateProduct,
  setProducts,
} from "../../redux/actionTypes/action";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { AlertContext } from "../CustomAlert/alertContext";


const ProductDisplay = () => {
  const categories = [
    { id: 1, name: "ALL" },
    { id: 2, name: "APPAREL" },
    { id: 3, name: "ELECTRONICS" },
    { id: 4, name: "FOOTWEAR" },
    { id: 5, name: "PERSONAL CARE" },
  ];

  const dispatch = useDispatch();
  const HTTP = useAxios();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const isAdmin = useSelector((state) => state.isAdmin);
  const showAlert = useContext(AlertContext);
  let filteredProducts = useSelector((state) => state.filteredProducts);
  const [sortOrder, setSortOrder] = useState("");

  const handleToggleTab = (event, newCategory) => {
    dispatch(filterProducts(newCategory));
  };

  const fetchAndAddProducts = async () => {
    await HTTP.get("/api/products")
      .then((response) => {
        console.log("Before dispatch" + JSON.stringify(response.data));
        dispatch(setProducts(response.data));
        console.log("After dispatch");
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const navigate = useNavigate();
  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
  };

  const handleDelete = (name,id) => {
    HTTP.delete(`/api/products/${id}`)
      .then((response) => {
        dispatch(deleteProduct(id));
        showAlert(`Product ${name} deleted successfully`, 'success');
        
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };
  useEffect(() => {
    console.log("RUnning useEffect");
    fetchAndAddProducts();
  }, [dispatch]);

  const handleSortChange = (event) => {
    const newSortOrder = event.target.value;
    let sortedProducts = [...filteredProducts]; // Make a copy of the filteredProducts

    if (newSortOrder === "Price: High to Low") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (newSortOrder === "Price: Low to High") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (newSortOrder === "Newest") {
      sortedProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    dispatch(setProducts(sortedProducts));
  };

  const handleBuy = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div>
      {/* Category Tabs */}
      <ToggleButtonGroup
        exclusive
        value={sortOrder}
        onChange={handleToggleTab}
        sx={{
          margin: "20px",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
        }} //
      >
        {categories.map((category) => (
          <ToggleButton key={category.id} value={category.name}>
            {category.name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <div style={{ marginBottom: "20px",textAlign: 'left',padding:'10px'  }}>
        <Typography variant="body1" style={{ marginBottom: "5px" }}>
          Sort By:
        </Typography>
        <FormControl
          fullWidth
          variant="outlined"
          size="small"
          sx={{ width: 200 }}
        >
          <Select
            displayEmpty
            value={sortOrder}
            onChange={handleSortChange}
            renderValue={(value) => {
              return sortOrder === "" ? "Select..." : sortOrder;
            }}
          >
            <MenuItem value="default">Default</MenuItem>
            <MenuItem value="Price: High to Low">Price: High to Low</MenuItem>
            <MenuItem value="Price: Low to High">Price: Low to High</MenuItem>
            <MenuItem value="Newest">Newest</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div>
        <Grid container spacing={2} marginLeft="10px">
          {filteredProducts &&
            filteredProducts.length > 0 &&
            filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card sx={{ maxWidth: 400 }}>
                  <CardMedia
                    sx={{ height: "240px", objectFit: "contain" }}
                    key={product.id}
                    image={product.imageUrl}
                    title={product.name}
                  />
                  <CardContent
                    style={{
                      display: "flex",
                      flexDirection: "column", // stack content vertically
                      height: "90px",
                      maxHeight: "100px",
                      overflow: "auto",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        gutterBottom
                        variant="h5"
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {product.name}
                      </Typography>
                      <Typography
                        variant="h6"
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        ₹{product.price || ""}
                      </Typography>
                    </div>
                    <Typography variant="body2" color="text.secondary">
                      {product.description}
                    </Typography>
                  </CardContent>

                  <CardActions style={{ position: "relative" }}>
                    <Button
                      size="small"
                      variant="contained"
                      style={{ background: "#3f51b5" }}
                      onClick={(e) => handleBuy(product.id)}
                    >
                      Buy
                    </Button>

                    {isLoggedIn && isAdmin && (
                      <>
                        <div
                          style={{
                            position: "absolute",
                            right: 0,
                            display: "flex",
                            padding: "10px",
                          }}
                        >
                          <EditIcon
                            style={{
                              color: "#757575",
                              justifyContent: "flex-end",
                              paddingRight: "10px",
                            }}
                            onClick={(e) => handleEdit(product.id)}
                          />

                          <DeleteIcon
                            style={{
                              color: "#757575",
                              justifyContent: "flex-end",
                            }}
                            onClick={(e) => handleDelete(product.name,product.id)}
                          />
                        </div>
                      </>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      </div>
    </div>
  );
};

export default ProductDisplay;
