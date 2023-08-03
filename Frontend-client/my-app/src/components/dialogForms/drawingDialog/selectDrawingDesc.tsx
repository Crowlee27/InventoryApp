import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function DrawingDescSelect() {
  const [description, setDescription] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setDescription(event.target.value as string);
  };

  return (
    <Box>
      <FormControl fullWidth variant="standard" >
        <InputLabel id="demo-simple-select-label">
          Drawing Description
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={description}
          label="Drawing Description"
          onChange={handleChange}
        >
          <MenuItem value={"Piping Iso"}>Piping ISO</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
