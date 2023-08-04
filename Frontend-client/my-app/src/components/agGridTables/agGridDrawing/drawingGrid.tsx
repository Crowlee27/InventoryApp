import React from "react";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export const DrawingGrid = () => {
  const rowData: IDrawingGridRow[] = [
    { ID: 1, Number: "ISO-100-AA", Description: "Piping ISO" },
    { ID: 2, Number: "ISO-101--AA", Description: "Piping ISO" },
    { ID: 3, Number: "ISO-102--AA", Description: "Piping ISO" },
  ];

  const columnDefs: ColDef[] = [
    { field: "ID" },
    { field: "Number" },
    { field: "Description" },
  ];

  return (
    <div
      className="ag-theme-alpine"
      style={{ height: "100vh", width: "100vw" }}
    >
      <AgGridReact rowData={rowData} columnDefs={columnDefs} />
    </div>
  );
};
