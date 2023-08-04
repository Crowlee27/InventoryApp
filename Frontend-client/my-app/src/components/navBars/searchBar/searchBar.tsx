import React from "react";
import { TextField, Button } from "@mui/material";
import { SearchTextfield } from "./searchTextfield";

export const SearchBar = () => {
  return (
    <div className="searchBar">
      <SearchTextfield id="search" label="Search" name="search" />
      <Button variant="contained" color="primary" className="searchButton">
        Search
      </Button>
    </div>
  );
};
