import React, { ChangeEvent, ReactElement } from "react";
import TextField from "@mui/material/TextField";
import { useLocation } from "react-router-dom";

export const SearchFilter = (props: ISearchFilter) => {
  const { filterValue, onFilterChange } = props;

  const location = useLocation();
  let pageName = location.pathname.substring(1);
  if (pageName === "bom") {
    pageName = "BOM";
  } else pageName = pageName.charAt(0).toUpperCase() + pageName.slice(1);

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onFilterChange(value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      props.onKeyPress(event);
      console.log(event.key);
    }
  };

  return (
    <div>
      <TextField
        label={`Search ${pageName}`}
        value={filterValue}
        onChange={handleFilterChange}
        id="search"
        name="search"
        variant="outlined"
        size="small"
        onKeyPress={handleKeyPress}
        className="searchFilter"
      />
    </div>
  );
};
