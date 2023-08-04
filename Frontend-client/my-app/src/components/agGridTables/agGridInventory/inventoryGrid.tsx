import React from "react";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

interface IInventoryGridRow {
  ID: number;
  Bom: number;
  Purchased: number;
  Received: number;
  Outstanding?: number;
  Issued: number;
  Remaining: number;
}

export const InventoryGrid = () => {
  const rowData: IInventoryGridRow[] = [
    { ID: 1, Bom: 1, Purchased: 1, Received: 1, Issued: 1, Remaining: 0 },
    { ID: 2, Bom: 2, Purchased: 1, Received: 1, Issued: 1, Remaining: 0 },
    {
      ID: 3,
      Bom: 3,
      Purchased: 4,
      Received: 2,
      Outstanding: 2,
      Issued: 1,
      Remaining: 0,
    },
    {
      ID: 4,
      Bom: 4,
      Purchased: 100,
      Received: 73,
      Outstanding: 27,
      Issued: 0,
      Remaining: 2,
    },
    {
      ID: 5,
      Bom: 5,
      Purchased: 500,
      Received: 291,
      Outstanding: 208,
      Issued: 16,
      Remaining: 0,
    },
  ];

  const columnDefs: ColDef[] = [
    { field: "ID" },
    { field: "Bom" },
    { field: "Purchased" },
    { field: "Received" },
    { field: "Outstanding" },
    { field: "Issued" },
    { field: "Remaining" },
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
