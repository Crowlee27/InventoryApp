import React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { ICustomTextField } from "./genericTextField";
import { CustomTextField } from "./genericTextField";

interface ITextFieldsPropsNew {
  textFields: ICustomTextField[];
}

export const ItemsTextFields = ({ textFields }: ITextFieldsPropsNew) => {
  return (
    <div>
      <Stack direction="row" spacing={2}>
        {textFields.map((textField) => (
          <CustomTextField
            key={textField.id}
            label={textField.label}
            name={textField.name}
            id={textField.id}
            setNewValue={textField.setNewValue}
          />
        ))}
      </Stack>
    </div>
  );
};
