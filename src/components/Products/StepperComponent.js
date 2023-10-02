import React from "react";
import { Stepper,StepButton ,Step} from "@mui/material";

const StepperComponent = ({ currentStep, steps, completed, handleStep }) => (
    <Stepper nonLinear activeStep={currentStep}>
      {steps.map((label, index) => (
        <Step key={label} completed={completed[label]}>
          <StepButton color="inherit" onClick={handleStep(index)}>
            {label}
          </StepButton>
        </Step>
      ))}
    </Stepper>
  );


  export default StepperComponent;