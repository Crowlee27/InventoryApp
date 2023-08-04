import React from "react";
import TextField from "@mui/material/TextField";

export const ItemPurchasedTextField = (props: ITextField) => {
  const {
    label = "Purchased",
    name = "itemPurchased",
    id = "itemPurchased",
  } = props;
  return (
    <TextField id={id} label={label} name={name} fullWidth variant="standard" />
  );
};
