import React, { useEffect, useState } from "react";
import {
  TextField,
  Typography,
  Select,
  Box,
  Button,
  MenuItem,
} from "@mui/material";
import { useAxios } from "../../API/axios";

const renderTextField = (id, label, value, handleChange, placeholder) => (
  <TextField
    required
    id={id}
    label={label}
    value={value}
    onChange={handleChange}
    sx={{ mt: 1, mb: 0.5 }}
    placeholder={placeholder}
    error={value.length > 0 && value.length > 255}
    helperText={
      value.length > 0 && value.length > 255
        ? `${label} must not exceed 255 characters`
        : ""
    }
  />
);

const AddressForm = ({
  selectedAddress,
  handleAddressChange,
  addressForm,
  setAddressForm,
  createAddress,
  handleBack,
  handleNext,
  currentStep,
  savedAddresses,
}) => {
  const [addressStrings, setAddressStrings] = useState([]);
  const [localAddressForm, setLocalAddressForm] = useState({
    name: addressForm.name || "",
    contactNumber: addressForm.contactNumber || "",
    street: addressForm.street || "",
    city: addressForm.city || "",
    state: addressForm.state || "",
    landmark: addressForm.landmark || "",
    zipcode: addressForm.zipcode || "",
    id: addressForm.id || "",
    user: addressForm.user || "",
  });
  const HTTP = useAxios();

  // Handling each input field change
  useEffect(() => {
    HTTP.get("/api/addresses")
      .then((response) => {
        const addressData = response.data.map((address) =>
          Object.entries(address)
            .reduce((acc, [key, value]) => {
              // if (key !== "id" && key !== "user") {
              acc.push(value);
              //  }
              return acc;
            }, [])
            .join(" ")
        );
        setAddressStrings(addressData); // Use setAddressStrings here
      })
      .catch((err) => {
        console.log(err);
      });
  }, [HTTP]);

  console.log("IN ADDRESS FORM" + JSON.stringify(savedAddresses));
  const handleSaveAddress = () => {
    HTTP.post(`/api/addresses/`, addressForm)
      .then((response) => {
        console.log("added to db" + JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error("Error adding to db", error);
      });
  };
  const handleInputChange = (field) => (e) => {
    setLocalAddressForm({
      ...localAddressForm,
      [field]: e.target.value,
    });

    setAddressForm({
      ...localAddressForm,
      [field]: e.target.value,
    });
  };

  const handleSelectChange = (e) => {
    //handleAddressChange(e.target.value);
    console.log(e.target.value)
    console.log(addressStrings)
    let foundRow = addressStrings.find(row => row.includes(e.target.value));
    console.log(foundRow)
    const [
      id,
      name,
      contactNumber,
      street,
      city,
      state,
      landmark,
      zipcode,
      user
    ] = foundRow.split(" ");
    setAddressForm({
      id,
      name,
      contactNumber,
      street,
      city,
      state,
      landmark,
      zipcode,
      user
    });

    console.log(
      "handle change " +
        { name, contactNumber, street, city, state, landmark, zipcode }
    );
    setLocalAddressForm({
      id,
      name,
      contactNumber,
      street,
      city,
      state,
      landmark,
      zipcode,
      user
    });
  };

  return (
    <div
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <div
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "50%",
        }}
      >
        <Typography sx={{ mt: 2, py: 1 }}>Select Address</Typography>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={
            '' || ""}
          onChange={(e) => handleSelectChange(e)}
          sx={{ width: "100%" }}
        >
  

          {addressStrings.map((i, index) => {
            let firstSpaceIndex = i.indexOf(" ") + 1;
            let lastSpaceIndex = i.lastIndexOf(" ");
            let upDatedStrings=i.substring(firstSpaceIndex, lastSpaceIndex)
            return (
              <MenuItem key={index + 1} value={upDatedStrings}>
                {upDatedStrings}
              </MenuItem>
            );
          })}
        </Select>
        <Typography sx={{ mt: 2, mb: 1, py: 1 }}>-OR-</Typography>
        <Typography sx={{ mt: 2, mb: 1, py: 1 }} variant="h5" gutterBottom>
          Add Address
        </Typography>

        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { m: 1, width: "60ch" } }}
          noValidate
          autoComplete="off"
        >
          {/* Use the renderTextField function here */}
          {renderTextField(
            "name",
            "Name",
            addressForm.name || "",
            handleInputChange("name"),
            "Name"
          )}
          {renderTextField(
            "contactNumber",
            "Contact Number",
            addressForm.contactNumber || "",
            handleInputChange("contactNumber"),
            "Contact Number"
          )}
          {renderTextField(
            "street",
            "Street",
            addressForm.street || "",
            handleInputChange("street"),
            "Street"
          )}
          {renderTextField(
            "city",
            "City",
            addressForm.city || "",
            handleInputChange("city"),
            "City"
          )}
          {renderTextField(
            "state",
            "State",
            addressForm.state || "",
            handleInputChange("state"),
            "State"
          )}
          {renderTextField(
            "landmark",
            "Landmark",
            addressForm.landmark || "",
            handleInputChange("landmark"),
            "Landmark"
          )}
          {renderTextField(
            "zipcode",
            "Zip Code",
            addressForm.zipcode || "",
            handleInputChange("zipcode"),
            "Zip Code"
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Button
              sx={{ mt: 2, mb: 1, py: 1, width: "50%" }}
              variant="contained"
              color="primary"
              onClick={handleSaveAddress}
              disabled={selectedAddress !== ""}
            >
              SAVE ADDRESS
            </Button>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "50%",
                mt: 1,
              }}
            >
              <Button
                color="inherit"
                disabled={currentStep === 0}
                onClick={handleBack}
              >
                Back
              </Button>
              <Button onClick={handleNext} variant="contained">
                Next
              </Button>
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default AddressForm;
