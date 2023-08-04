import React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

export const ItemsTextFields = ({ textFields }: ITextFieldsProps) => {
  return (
    <div>
      <Stack direction="row" spacing={2}>
        {textFields.map((textField) => (
          <TextField
            key={textField.id}
            label={textField.label}
            variant="standard"
            fullWidth
            name={textField.name}
            id={textField.id}
          />
        ))}
      </Stack>
    </div>
  );
};
