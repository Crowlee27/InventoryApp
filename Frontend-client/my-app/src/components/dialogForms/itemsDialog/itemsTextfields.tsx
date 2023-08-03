import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export default function ItemsTextFields() {
  return (
    <div>
      <TextField label="Item Description" variant="standard" fullWidth />

      <Stack direction={"row"} spacing={2}>
        <TextField label="Size" variant="standard" />
        <TextField label="Length" variant="standard" />
        <TextField label="Rating" variant="standard" />
      </Stack>

      <Stack direction={"row"} spacing={2}>
        <TextField label="Serial" variant="standard" />
        <TextField label="Tag #" variant="standard" />
        <TextField label="Alias" variant="standard" />
      </Stack>

      <TextField label="Purchased" variant="standard" />
    </div>
  );
}
