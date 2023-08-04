import React from "react";
import TextField from "@mui/material/TextField";

export const ItemPurchasedTextField = (props: ITextField) => {
  return (
    <TextField
      id="itemPurchased"
      label="Purchased"
      name="itemPurchased"
      fullWidth
      variant="standard"
    />
  );
};
