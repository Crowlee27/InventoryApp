import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { DrawingsFormFields } from "../drawingDialog/drawingDialogForm";
import { ItemsDialogForm } from "../itemsDialog/itemsDialogForm";
import { createDrawing } from "../../graphQl/queries";

export const AddDrawingsForm = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    drawingNumber: "",
    drawingDescription: "",
  });

  const handleOpen = () => {
    setOpen(true);
    setStep(1);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const setNewNumber = (number: string) => {
    setFormData((prevData) => ({
      ...prevData,
      drawingNumber: number,
    }));
  };

  const setNewDescription = (description: string) => {
    setFormData((prevData) => ({
      ...prevData,
      drawingDescription: description,
    }));
  };

  const handleSubmit = async () => {
    const input = {
      drawing: {
        number: formData.drawingNumber,
        description: formData.drawingDescription,
      },
    };
    if (!input.drawing.description || !input.drawing.number) {
      console.error("Number and Description is required");
      return;
    }
    const drawing = createDrawing(input);
    console.log("Drawing created:", drawing);
    console.log("Form data:", formData);
    handleClose();
    window.location.reload();
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <DialogContent>
            <DrawingsFormFields
              setNewNumber={setNewNumber}
              setNewDescription={setNewDescription}
            />
          </DialogContent>
        );
      case 2:
        return (
          <DialogContent>
            <ItemsDialogForm />
          </DialogContent>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Add Drawing Number
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Add Drawing Number</DialogTitle>
        {renderStepContent()}
        <DialogActions>
          {step === 1 ? (
            <>
              <Button onClick={handleNext} variant="contained" color="primary">
                Next
              </Button>
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
              >
                Finish
              </Button>
            </>
          ) : step === 2 ? (
            <>
              <Button onClick={handleBack}>Back</Button>
              <Button onClick={handleClose} variant="contained" color="primary">
                Add
              </Button>
              <Button onClick={handleClose} variant="contained" color="primary">
                Finish
              </Button>
            </>
          ) : null}
        </DialogActions>
      </Dialog>
    </div>
  );
};
