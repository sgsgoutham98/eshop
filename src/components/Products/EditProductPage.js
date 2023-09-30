// EditProductForm.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../../redux/actionTypes/action";
import { TextField, Button, Box, Select, MenuItem } from "@mui/material";
import { useParams } from "react-router-dom";
import { useAxios } from "../../API/axios";


const EditProductForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const HTTP = useAxios();
  const product = useSelector((state) => state.allProducts.find((p) => p.id === id));
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    id: product.id,
    name: product.name,
    manufacturer:product.manufacturer,
    availableItems:product.availableItems,
    imageUrl:product.imageUrl,
    category:product.category,
    price:product.price,
    description:product.description
  });

  useEffect(() => {

    console.log(product)
    if (product) {
      setFormData({
        id: product.id,
        name: product.name,
        manufacturer:product.manufacturer,
        availableItems:product.availableItems,
        imageUrl:product.imageUrl,
        category:product.category,
        price:product.price,
        description:product.description

        
      });
    }
  }, [product]);


  const modifyProducts = (id) => {
    HTTP.put(`/api/products/${id}`,formData)
      .then((response) => {
        console.log("fetching products" + JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const handleCategoryChange = (value) => {
    setFormData({ ...formData, category: value });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = () => {
    modifyProducts(formData.id)
   // dispatch(updateProduct(formData));
  };

  const isFormValid = () => {
    return (
      formData.name.trim() !== "" &&
      formData.price.trim() !== "" &&
      formData.category.trim() !== "" &&
      formData.description.trim()!=="" &&
      formData.manufacturer.trim()!=="" &&
      formData.availableItems.trim()!=="" &&
      formData.imageUrl.trim()!==""
    );
  };

  const staticCategories = [{ id: 1, title: "Electronics" }]; // example categories

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
              onClick={handleUpdate}
            >
              SAVE PRODUCT
            </Button>
          </Box>
          
        </div>
        
      </div>
    </>
  );
};

export default EditProductForm;
