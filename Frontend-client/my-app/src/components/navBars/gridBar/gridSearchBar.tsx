import React from "react";
import { Button } from "@mui/material";
import { SearchBar } from "../searchBar/searchBar";
import { AddDrawingsForm } from "../../dialogForms/drawingDialog";

export const GridSearchBar = () => {
  return (
    <div className="gridSearchBar">
      <div className="searchBar">
        <SearchBar />
        <Button variant="contained" color="primary" className="resetButton">
          Reset
        </Button>
      </div>

      <div>
        <AddDrawingsForm />
      </div>
    </div>
  );
};
