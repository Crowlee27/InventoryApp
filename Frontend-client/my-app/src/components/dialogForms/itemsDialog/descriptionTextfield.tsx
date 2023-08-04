import React from "react";
import TextField from "@mui/material/TextField";

export const ItemDescriptionTextField = (props: ITextField) => {
  const {
    label = "Item Description",
    name = "itemDescription",
    id = "itemDescription",
  } = props;

  return (
    <TextField id={id} label={label} name={name} fullWidth variant="standard" />
  );
};
