import React from "react";
import TextField from "@mui/material/TextField";

export const DrawingNumberText = (props: IDrawingNumberText) => {
  const {
    label = "Drawing Number",
    name = "drawingNumber",
    id = "drawingNumber",
  } = props;

  return (
    <TextField id={id} label={label} name={name} fullWidth variant="standard" />
  );
};
