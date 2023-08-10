import React, { useState } from "react";
import { ColDef } from "ag-grid-community";
import { Route, Routes, Navigate } from "react-router-dom";
import { BomGrid } from "../components/agGridTables/agGridBom/bomGrid";
import { CatalogGrid } from "../components/agGridTables/agGridCatalog/catalogGrid";
import { DrawingGrid } from "../components/agGridTables/agGridDrawing/drawingGrid";
import { InventoryGrid } from "../components/agGridTables/agGridInventory/inventoryGrid";

export const AppRoutes = () => {
  const [rowData, setRowData] = useState<
    IDrawingGridRow[] | IInventoryGridRow[] | ICatalogGridRow[] | IBomGridRow[]
    
  >([]);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/drawing" />} />
      <Route
        path="/drawing"
        element={
          <DrawingGrid
            rowData={rowData as IDrawingGridRow[]}
            columnDefs={columnDefs}
          />
        }
      />
      <Route
        path="/catalog"
        element={
          <CatalogGrid
            rowData={rowData as ICatalogGridRow[]}
            columnDefs={columnDefs}
          />
        }
      />
      <Route path="/Bom" element={<BomGrid rowData={rowData as IBomGridRow[]} columnDefs={columnDefs} />} />
      <Route
        path="/inventory"
        element={
          <InventoryGrid
            rowData={rowData as IInventoryGridRow[]}
            columnDefs={columnDefs}
          />
        }
      />
    </Routes>
  );
};
