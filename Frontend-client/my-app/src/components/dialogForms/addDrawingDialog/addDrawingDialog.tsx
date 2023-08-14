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
import {
  createDrawing,
  checkDrawingExists,
  createCatalog,
  createBom,
} from "../../graphQl/queries";

export const AddDrawingsForm = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);

  interface DrawingFormData {
    drawingNumber: string;
    drawingDescription: string;
  }

  const [drawingFormData, setDrawingFormData] = useState<DrawingFormData>({
    drawingNumber: "",
    drawingDescription: "",
  });

  interface ItemFormData {
    itemDescription: string;
    itemPurchased: string;
    itemSize: string;
    itemLength: string;
    itemRating: string;
    itemSerial: string;
    itemTag: string;
    itemAlias: string;
  }

  const initialItemFormData: ItemFormData = {
    itemDescription: "",
    itemPurchased: "",
    itemSize: "",
    itemLength: "",
    itemRating: "",
    itemSerial: "",
    itemTag: "",
    itemAlias: "",
  };

  const [itemFormData, setItemFormData] =
    useState<ItemFormData>(initialItemFormData);

  const [formDataHistory, setFormDataHistory] = useState<DrawingFormData[]>([]);

  const handleOpen = () => {
    setOpen(true);
    setStep(1);
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  const handleNext = () => {
    const formData = {
      drawingNumber: drawingFormData.drawingNumber,
      drawingDescription: drawingFormData.drawingDescription,
    };
    setFormDataHistory((prevHistory) => [...prevHistory, formData]);

    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    if (formDataHistory.length > 0) {
      const previousFormData = formDataHistory[formDataHistory.length - 1];
      setDrawingFormData((prevData) => ({
        ...prevData,
        drawingNumber: previousFormData.drawingNumber,
        drawingDescription: previousFormData.drawingDescription,
      }));

      setFormDataHistory((prevHistory) => prevHistory.slice(0, -1));
    }
    setStep((prevStep) => prevStep - 1);
  };

  const setNewNumber = (number: string) => {
    setDrawingFormData((prevData) => ({
      ...prevData,
      drawingNumber: number,
    }));
  };

  const setNewDescription = (description: string) => {
    setDrawingFormData((prevData) => ({
      ...prevData,
      drawingDescription: description,
    }));
  };

  const setNewItemDescription = (description: string) => {
    setItemFormData((prevData) => ({
      ...prevData,
      itemDescription: description,
    }));
  };

  const setNewItemPurchased = (purchased: string) => {
    setItemFormData((prevData) => ({
      ...prevData,
      itemPurchased: purchased,
    }));
  };

  const setSize = (size: string) => {
    setItemFormData((prevData) => ({
      ...prevData,
      itemSize: size,
    }));
  };

  const setLength = (length: string) => {
    setItemFormData((prevData) => ({
      ...prevData,
      itemLength: length,
    }));
  };

  const setRating = (rating: string) => {
    setItemFormData((prevData) => ({
      ...prevData,
      itemRating: rating,
    }));
  };

  const setSerial = (serial: string) => {
    setItemFormData((prevData) => ({
      ...prevData,
      itemSerial: serial,
    }));
  };

  const setTag = (tag: string) => {
    setItemFormData((prevData) => ({
      ...prevData,
      itemTag: tag,
    }));
  };

  const setAlias = (alias: string) => {
    setItemFormData((prevData) => ({
      ...prevData,
      itemAlias: alias,
    }));
  };

  // const handleSubmit = async () => {
  //   const inputDrawing = {
  //     drawing: {
  //       number: drawingFormData.drawingNumber,
  //       description: drawingFormData.drawingDescription,
  //     },
  //   };
  //   if (!inputDrawing.drawing.description || !inputDrawing.drawing.number) {
  //     console.error("Number and Description is required");
  //     return;
  //   }

  //   const drawingExists = await checkDrawingExists(inputDrawing.drawing.number);
  //   if (drawingExists) {
  //     console.error("Drawing with the same number already exists");
  //     return;
  //   }

  //   const drawing = await createDrawing(inputDrawing);
  //   if (drawing) {
  //     console.log("Drawing created:", drawing);
  //     console.log("Form data:", drawingFormData);
  //     handleClose();
  //     window.location.reload();
  //   } else {
  //     console.error("Failed to create drawing");
  //   }
  // };

  const handleAddItem = async () => {
    const inputDrawing = {
      drawing: {
        number: drawingFormData.drawingNumber,
        description: drawingFormData.drawingDescription,
      },
    };

    if (!inputDrawing.drawing.description || !inputDrawing.drawing.number) {
      console.error("Number and Description are required for drawing");
      return;
    }

    const drawingExists = await checkDrawingExists(inputDrawing.drawing.number);

    if (drawingExists) {
      console.log("Drawing already exists");

      const inputCatalog = {
        catalog: {
          description: itemFormData.itemDescription,
          size: itemFormData.itemSize,
          length: itemFormData.itemLength,
          rating: itemFormData.itemRating,
          serial: itemFormData.itemSerial,
        },
      };

      const catalog = await createCatalog(inputCatalog);

      if (catalog) {
        console.log("Catalog created:", catalog);
        console.log("Form data:", itemFormData);

        console.log("Add item", itemFormData);

        const inputBom = {
          bom: {
            drawing: drawingExists.id,
            catalog: catalog.id,
            tag: itemFormData.itemTag,
            alias: itemFormData.itemAlias,
          },
        };

        const bom = await createBom(inputBom);

        if (!bom) {
          console.error("Failed to create the bom");
          return;
        }
      }
    } else {
      const drawing = await createDrawing(inputDrawing);

      if (!drawing) {
        console.error("Failed to create the drawing");
        return;
      }

      console.log("Drawing created:", drawing);
    }

    handleClose();
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <DialogContent>
            <DrawingsFormFields
              drawingNumber={drawingFormData.drawingNumber}
              drawingDescription={drawingFormData.drawingDescription}
              setNewNumber={setNewNumber}
              setNewDescription={setNewDescription}
            />
          </DialogContent>
        );
      case 2:
        return (
          <DialogContent>
            <ItemsDialogForm
              setNewItemDescription={setNewItemDescription}
              setNewItemPurchased={setNewItemPurchased}
              setSize={setSize}
              setLength={setLength}
              setRating={setRating}
              setSerial={setSerial}
              setTag={setTag}
              setAlias={setAlias}
            />
          </DialogContent>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Add Item
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Add Drawing Number & Item</DialogTitle>
        {renderStepContent()}
        <DialogActions>
          {step === 1 ? (
            <>
              <Button onClick={handleNext} variant="contained" color="primary">
                Next
              </Button>
              {/* <Button
                // onClick={handleSubmit}
                variant="contained"
                color="primary"
              >
                Finish
              </Button> */}
            </>
          ) : step === 2 ? (
            <>
              <Button onClick={handleBack}>Back</Button>
              <Button
                onClick={handleAddItem}
                variant="contained"
                color="primary"
              >
                Add
              </Button>
              {/* <Button onClick={handleClose} variant="contained" color="primary">
                Finish
              </Button> */}
            </>
          ) : null}
        </DialogActions>
      </Dialog>
    </div>
  );
};
