import React from "react";
import TextField from "@mui/material/TextField";

export const ItemDescriptionTextField = (props: ITextField) => {
  return (
    <TextField
      id="itemDescription"
      label="Item Description"
      name="itemDescription"
      fullWidth
      variant="standard"
    />
  );
};
