import React from "react";
import { Button } from "@mui/material";
import { SearchBar } from "../searchBar/searchBar";

export const GridSearchBar = () => {
  return (
    <div className="gridSearchBar">
      <div className="searchBar">
        <SearchBar name="search" label="Search" id="search" />
        <Button variant="contained" color="primary" className="resetButton">
          Reset
        </Button>
      </div>

      <div>
        <Button variant="contained" color="primary" className="CreateDrawing">
          Create Drawing
        </Button>
      </div>
    </div>
  );
};
