import React from "react";
import { TextField, Button } from "@mui/material";

export const SearchBar = () => {
  return (
    <div className="searchBar">
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        className="searchField"
      />
      <Button variant="contained" color="primary" className="searchButton">
        Search
      </Button>
    </div>
  );
};
