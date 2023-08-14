import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";

export interface ICustomTextField extends ITextField {
  setNewValue: (value: string) => void;
}

export const CustomTextField = (props: ICustomTextField) => {
  const { label, name, id, value = "", setNewValue } = props;

  const [fieldValue, setFieldValue] = useState(value);

  useEffect(() => {
    setNewValue(fieldValue);
  }, [fieldValue, setNewValue]);

  return (
    <TextField
      id={id}
      label={label}
      name={name}
      value={fieldValue}
      fullWidth
      variant="standard"
      onChange={(event) => setFieldValue(event.target.value)}
    />
  );
};
