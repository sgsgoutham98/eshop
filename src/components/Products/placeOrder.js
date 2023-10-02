import React, { useState, useEffect,useContext } from "react";
import {
  Stepper,
  Step,
  StepButton,
  Box,
  Button,
  Typography,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import StyledButton from "./StyledButton";
import StepperComponent from "./StepperComponent";
import OrderRow from "./OrderRow";
import AddressForm from "./AddressForm";
import { useAxios } from "../../API/axios";
import { AlertContext } from "../CustomAlert/alertContext";

export default function PlaceOrder() {
  const HTTP = useAxios();
  const navigate = useNavigate();
  const showAlert = useContext(AlertContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [completed, setCompleted] = useState({
    Items: true,
    "Select Address": false,
    "Confirm Order": false,
  });
  const location = useLocation();
  const productDetails = location.state;
  console.log(
    "product details from buy product" + JSON.stringify(productDetails)
  );
  const [selectedAddress, setSelectedAddress] = useState("");
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [addressForm, setAddressForm] = useState({
    id: "",
    name: "",
    contactNumber: "",
    street: "",
    city: "",
    state: "",
    landmark: "",
    zipcode: "",
    user: "",
  });

  // useEffect(() => {
  //   HTTP.get("/api/addresses")
  //     .then((response) => {
  //       console.log(response.data);

  //       setSavedAddresses(response.data);

  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const steps = ["Items", "Select Address", "Confirm Order"];

  const handleStep = (index) => () => {
    setCurrentStep(index);
  };

  const handleNext = () => {
    if (
      addressForm.landmark == "" ||
      addressForm.city == "" ||
      addressForm.state == "" ||
      addressForm.street == "" ||
      addressForm.contactNumber == ""
    ) {
     
        showAlert("Please select address.", 'error');
        return;
      
      return;
    }
    setCompleted({ ...completed, [steps[currentStep]]: true });
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    if (currentStep === 1) {
      navigate(-1);
      return;
    }

    setCompleted({ ...completed, [steps[currentStep - 1]]: false });
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const placeOrder = () => {
    //    handleNext()
    //alert(1)
    console.log(addressForm, productDetails);
    HTTP.post("/api/orders", {
      quantity: productDetails.quantity,
      product: productDetails.id,
      address: addressForm.id,
    })
      .then((response) => {
        showAlert('Order placed successfully', 'success');
        navigate("/products");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleAddressChange = (address) => {
    setSelectedAddress(address);
  };

  const createAddress = (event) => {
    event.preventDefault();
  };

  return (
    <div className="flex-row justify-content-center">
      <Box sx={{ width: "75%", padding: "100px" }}>
        <StepperComponent
          currentStep={currentStep}
          steps={steps}
          completed={completed}
          handleStep={handleStep}
        />
        <div>
          <div>
            {currentStep == 2 ? (
              <>
                <OrderRow
                  productDetails={productDetails}
                  addressDetails={addressForm}
                />
                <div className="flex-column justify-content-center align-items-center">
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={currentStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Box />
                    <StyledButton onClick={placeOrder}>
                      Place Order
                    </StyledButton>
                  </Box>
                </div>
              </>
            ) : (
              <AddressForm
                selectedAddress={selectedAddress}
                handleAddressChange={handleAddressChange}
                addressForm={addressForm}
                setAddressForm={setAddressForm}
                createAddress={createAddress}
                handleBack={handleBack}
                handleNext={handleNext}
                currentStep={currentStep}
                savedAddresses={savedAddresses}
              />
            )}
          </div>
        </div>
      </Box>
    </div>
  );
}
