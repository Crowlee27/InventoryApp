import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BomGrid } from "./components/agGridTables/agGridBom/bomGrid";
import { CatalogGrid } from "./components/agGridTables/agGridCatalog/catalogGrid";
import { DrawingGrid } from "./components/agGridTables/agGridDrawing/drawingGrid";
import { InventoryGrid } from "./components/agGridTables/agGridInventory/inventoryGrid";
import { SearchAppBar } from "./components/navBars/appBar/appBar";
import { AddDrawingsForm } from "./components/dialogForms/addDrawingDialog/addDrawingDialog";
import { GridSearchBar } from "./components/navBars/gridBar/gridSearchBar";
import { SearchBar } from "./components/navBars/searchBar/searchBar";

function App() {
  return (
    <Router>
      <div>
        <SearchAppBar />
        <h1>Page Name</h1>
        <GridSearchBar />
        <main className="gridContainer">
          <Routes>
            <Route path="/" element={<DrawingGrid />} />
            <Route path="/catalog" element={<CatalogGrid />} />
            <Route path="/bom" element={<BomGrid />} />
            <Route path="/inventory" element={<InventoryGrid />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
