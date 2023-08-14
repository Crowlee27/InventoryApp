import React from "react";
import { DrawingNumberText } from "./drawingTextfield";
import { DrawingDescSelect } from "./selectDrawingDesc";

export const DrawingsFormFields = ({
  setNewNumber,
  setNewDescription,
}: IDrawingFormFields) => {
  return (
    <div>
      <DrawingNumberText
        id="drawingNumber"
        name="drawingNumber"
        label="Drawing Number"
        setNewNumber={setNewNumber}
      />
      <DrawingDescSelect
        id="drawingDescription"
        name="drawingDescription"
        label="Drawing Description"
        value=""
        setNewDescription={setNewDescription}
      />
    </div>
  );
};
