import React from "react";
import { DrawingGrid } from "./components/agGridTables/agGridDrawing/drawingGrid";
import { AddDrawingsForm } from "./components/dialogForms/drawingDialog";
import { GridSearchBar } from "./components/navBars/gridBar/gridSearchBar";
import { SearchBar } from "./components/navBars/searchBar/searchBar";

function App() {
  return (
    <div>
      {/* <AddDrawingsForm />
      <SearchBar />
      <GridSearchBar /> */}
      <DrawingGrid/>
    </div>
  );
}

export default App;
