import React from "react";
import { DrawingNumberText } from "./drawingTextfield";
import { DrawingDescSelect } from "./selectDrawingDesc";

export const DrawingsFormFields = () => {
  return (
    <div>
      <DrawingNumberText
        id="drawingNumber"
        name="drawingNumber"
        label="Drawing Number"
      />
      <DrawingDescSelect
        id="drawingDescription"
        name="drawingDescription"
        label="Drawing Description"
        value=""
      />
    </div>
  );
};
