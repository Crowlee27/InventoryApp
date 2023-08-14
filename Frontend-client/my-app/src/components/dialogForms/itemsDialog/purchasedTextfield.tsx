import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";

export const ItemPurchasedTextField = (props: ITextField) => {
  const {
    label = "Purchased",
    name = "itemPurchased",
    id = "itemPurchased",
    value = "",
    setNewItemPurchased,
  } = props;

  const [itemPurchased, setItemPurchased] = useState(value);

  useEffect(() => {
    if (setNewItemPurchased) {
      setNewItemPurchased(itemPurchased);
    }
  }, [itemPurchased, setNewItemPurchased]);

  return (
    <TextField
      id={id}
      label={label}
      name={name}
      value={itemPurchased}
      fullWidth
      variant="standard"
      onChange={(event) => setItemPurchased(event.target.value)}
    />
  );
};
