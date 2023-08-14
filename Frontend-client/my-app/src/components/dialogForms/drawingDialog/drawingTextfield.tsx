import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";

export const DrawingNumberText = (props: ITextField) => {
  const {
    label = "Drawing Number",
    name = "drawingNumber",
    id = "drawingNumber",
    value = "",
    setNewNumber,
  } = props;

  const [number, setNumber] = useState(value);

  // useEffect(() => {
  //   setNewNumber(number);
  // }, [number, setNewNumber]);

  useEffect(() => {
    if (setNewNumber) {
      setNewNumber(number);
    }
  }, [number, setNewNumber]);

  return (
    <TextField
      id={id}
      label={label}
      name={name}
      value={number}
      fullWidth
      variant="standard"
      onChange={(event) => setNumber(event.target.value)}
    />
  );
};
