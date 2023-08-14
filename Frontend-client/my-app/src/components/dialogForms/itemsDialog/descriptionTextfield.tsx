import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";

export const ItemDescriptionTextField = (props: ITextField) => {
  const {
    label = "Item Description",
    name = "itemDescription",
    id = "itemDescription",
    value = "",
    setNewItemDescription,
  } = props;

  const [itemDescription, setItemDescription] = useState(value);

  useEffect(() => {
    setNewItemDescription(itemDescription);
  }, [itemDescription, setNewItemDescription]);

  return (
    <TextField
      id={id}
      label={label}
      name={name}
      value={itemDescription}
      fullWidth
      variant="standard"
      onChange={(event) => setItemDescription(event.target.value)}
    />
  );
};
