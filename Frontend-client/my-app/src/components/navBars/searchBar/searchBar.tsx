import React from "react";
import { TextField, Button } from "@mui/material";

export const SearchBar = (props: ITextField) => {
  return (
    <div className="searchBar">
      <TextField
        id="search"
        label={props.label}
        name="search"
        variant="outlined"
        size="small"
        
      />
      <Button variant="contained" color="primary" className="searchButton">
        Search
      </Button>
    </div>
  );
};
