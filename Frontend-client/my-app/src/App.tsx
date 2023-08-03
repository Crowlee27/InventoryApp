import React from "react";
import { AddDrawingsForm } from "./components/dialogForms/drawingDialog";
import { GridSearchBar } from "./components/navBars/gridBar/gridSearchBar";
import { SearchBar } from "./components/navBars/searchBar/searchBar";

function App() {
  return (
    <div>
      {/* <AddDrawingsForm /> */}
      <SearchBar />
      <GridSearchBar/>
    </div>
  );
}

export default App;
