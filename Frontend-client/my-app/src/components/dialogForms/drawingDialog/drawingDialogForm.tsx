import React from "react";
import { DrawingNumberText } from "./drawingTextfield";
import { DrawingDescSelect } from "./selectDrawingDesc";

export const DrawingsFormFields = ({
  setNewNumber,
  setNewDescription,
  drawingNumber,
  drawingDescription,
}: IDrawingFormFields) => {
  return (
    <div>
      <DrawingNumberText
        id="drawingNumber"
        name="drawingNumber"
        label="Drawing Number"
        setNewNumber={setNewNumber}
        value={drawingNumber}
      />
      <DrawingDescSelect
        id="drawingDescription"
        name="drawingDescription"
        label="Drawing Description"
        value={drawingDescription}
        setNewDescription={setNewDescription}
      />
    </div>
  );
};
