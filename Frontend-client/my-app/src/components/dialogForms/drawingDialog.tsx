import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  Stack,
} from "@mui/material";

import DrawingNumberText from "./drawingDialog/drawingTextfield";
import DrawingDescSelect from "./drawingDialog/selectDrawingDesc";
import ItemsTextFields from "./itemsDialog/itemsTextfields";
import DrawingsFormFields from "./drawingDialog/drawingDialogForm";

export const AddDrawingsForm = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);

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

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <DialogContent>
            <DrawingsFormFields />
          </DialogContent>
        );
      case 2:
        return (
          <DialogContent>
            <ItemsTextFields />
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
              <Button onClick={handleClose} variant="contained" color="primary">
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
