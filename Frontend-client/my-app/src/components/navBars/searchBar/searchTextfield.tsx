import React from "react";
import { TextField, Button } from "@mui/material";

export const SearchTextfield = (props: ITextField) => {
  return (
    <div className="searchBar">
      <TextField
        id="search"
        label={props.label}
        name="search"
        variant="outlined"
        size="small"
      />
    </div>
  );
};
