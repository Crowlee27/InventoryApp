import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export const DrawingDescSelect = (props: IDrawingDescSelect) => {
  const {
    label = "Drawing Description",
    name = "drawingDescription",
    id = "drawingDescription",
    value = "",
  } = props;

  const [description, setDescription] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setDescription(event.target.value as string);
  };

  return (
    <Box>
      <FormControl fullWidth variant="standard">
        <InputLabel id="drawingDescription">Drawing Description</InputLabel>
        <Select
          labelId={`${name}-id`}
          id={`${id}-id-select`}
          value={value}
          label={label}
          onChange={handleChange}
        >
          <MenuItem value={"Piping Iso"}>Piping ISO</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
