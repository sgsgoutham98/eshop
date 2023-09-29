// AddProductForm.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/actionTypes/action";
import { TextField, Button, Box, Select, MenuItem } from "@mui/material";
import { useSelector } from "react-redux";

const AddProductForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    description: "",
    category: "",
    manufacturer: "",
    availableItems: "",
    imageUrl: "",
  });

  const staticCategories = [{ id: 1, title: "Electronics" }]; // example categories
  const highestCurrentId = useSelector((state) =>
    state.allProducts.reduce((maxId, product) => Math.max(product.id, maxId), 0)
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      id: highestCurrentId + 1,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (value) => {
    setFormData({ ...formData, category: value });
  };

  const addProductHandler = () => {
    dispatch(addProduct(formData));
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ width: "fit-content", marginTop: "5px" }}>
          <Box>
            <div
              style={{
                marginBottom: "10px",
                fontSize: "20px",
                fontWeight: "400",
                marginTop: "15px",
              }}
            >
              <div>Add Product</div>
            </div>
          </Box>
          <Box component="form" noValidate autoComplete="off">
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <TextField
                required
                name="name"
                label="Name"
                value={formData.name}
                onChange={handleChange}
                error={formData.name.length > 0 && formData.name.length > 255}
                helperText={
                  formData.name.length > 0 && formData.name.length > 255
                    ? "Name must not exceed 255 characters"
                    : ""
                }
              />
              <Select
                value={formData.category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                style={{ width: "100%" }}
              >
                {staticCategories.map((i) => (
                  <MenuItem key={i.id} value={i.title}>
                    {i.title}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                required
                name="manufacturer"
                label="Manufacturer"
                value={formData.manufacturer}
                onChange={handleChange}
                error={
                  formData.manufacturer.length > 0 &&
                  formData.manufacturer.length > 255
                }
                helperText={
                  formData.manufacturer.length > 0 &&
                  formData.manufacturer.length > 255
                    ? "Manufacturer must not exceed 255 characters"
                    : ""
                }
              />
              <TextField
                required
                name="availableItems"
                label="Available Items"
                type="number"
                value={formData.availableItems}
                onChange={handleChange}
              />
              <TextField
                required
                name="price"
                label="Price"
                type="number"
                value={formData.price}
                onChange={handleChange}
              />
              <TextField
                name="imageUrl"
                label="Image URL"
                value={formData.imageUrl}
                onChange={handleChange}
                error={
                  formData.imageUrl.length > 0 && formData.imageUrl.length > 255
                }
                helperText={
                  formData.imageUrl.length > 0 && formData.imageUrl.length > 255
                    ? "Image URL must not exceed 255 characters"
                    : ""
                }
              />
              <TextField
                name="description"
                label="Product Description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </Box>
          <Box style={{ marginTop: "20px" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={addProductHandler}
            >
              SAVE PRODUCT
            </Button>
          </Box>
        </div>
      </div>
    </>
  );
};

export default AddProductForm;
