import React from "react";
import { BomGrid } from "./components/agGridTables/agGridBom/bomGrid";
import { CatalogGrid } from "./components/agGridTables/agGridCatalog/catalogGrid";
import { DrawingGrid } from "./components/agGridTables/agGridDrawing/drawingGrid";
import { InventoryGrid } from "./components/agGridTables/agGridInventory/inventoryGrid";
import { AddDrawingsForm } from "./components/dialogForms/drawingDialog";
import { GridSearchBar } from "./components/navBars/gridBar/gridSearchBar";
import { SearchBar } from "./components/navBars/searchBar/searchBar";

function App() {
  return (
    <div>
      {/* <AddDrawingsForm />
      <SearchBar />
      <GridSearchBar /> */}
      {/* <DrawingGrid/> */}
      {/* <CatalogGrid/> */}
      {/* <BomGrid/> */}
      <InventoryGrid/>
    </div>
  );
}

export default App;
