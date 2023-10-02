import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/actionTypes/action";
import { TextField, Button, Box, Select, MenuItem } from "@mui/material";
import { useSelector } from "react-redux";
import { useAxios } from "../../API/axios";


const AddProductForm = () => {
  const axios = useAxios();
  const dispatch = useDispatch();
  const HTTP = useAxios();
  const [error, setError] = useState("");
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

  const isFormValid = () => {
    return (
      formData.name.trim() !== "" &&
      formData.price.trim() !== "" &&
      formData.category.trim() !== "" &&
      formData.description.trim() !== "" &&
      formData.manufacturer.trim() !== "" &&
      formData.availableItems.trim() !== "" &&
      formData.imageUrl.trim() !== ""
    );
  };

  const staticCategories = [
    { id: 1, title: "ALL" },
    { id: 2, title: "APPAREL" },
    { id: 3, title: "ELECTRONICS" },
    { id: 4, title: "FOOTWEAR" },
    { id: 5, title: "PERSONAL CARE" },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      price: "",
      description: "",
      category: "",
      manufacturer: "",
      availableItems: "",
      imageUrl: "",
    });
  };

  const handleCategoryChange = (value) => {
    setFormData({ ...formData, category: value });
  };

  const addProductHandler = () => {
    if (isFormValid()) {
      const newFormData = {
        ...formData,
      };

      HTTP
        .post("http://localhost:8080/api/products", newFormData)
        .then((response) => {
          console.log(newFormData);
          if (response) {
            dispatch(addProduct(newFormData));
            resetForm();
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setError("All fields are required.");
    }
  };

  return (
    <>
      {error && <p style={{ color: "red" }}>{error}</p>}
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
