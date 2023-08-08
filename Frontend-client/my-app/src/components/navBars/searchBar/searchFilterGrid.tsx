import React, { ChangeEvent } from "react";
import TextField from "@mui/material/TextField";

interface ISearchFilter {
  filterValue: string;
  onFilterChange: (value: string) => void;
}

export const SearchFilter = (props: ISearchFilter) => {
  const { filterValue, onFilterChange } = props;

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onFilterChange(value);
  };

  return (
    <div>
      <TextField
        label="Search"
        value={filterValue}
        onChange={handleFilterChange}
        id="search"
        name="search"
        variant="outlined"
        size="small"
      />
      
    </div>
  );
};
