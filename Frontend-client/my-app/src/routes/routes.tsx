import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { BomGrid } from "../components/agGridTables/agGridBom/bomGrid";
import { CatalogGrid } from "../components/agGridTables/agGridCatalog/catalogGrid";
import { DrawingGrid } from "../components/agGridTables/agGridDrawing/drawingGrid";
import { InventoryGrid } from "../components/agGridTables/agGridInventory/inventoryGrid";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/drawing" />} />
      <Route path="/drawing" element={<DrawingGrid />} />
      <Route path="/catalog" element={<CatalogGrid />} />
      <Route path="/Bom" element={<BomGrid />} />
      <Route path="/inventory" element={<InventoryGrid />} />
    </Routes>
  );
};
