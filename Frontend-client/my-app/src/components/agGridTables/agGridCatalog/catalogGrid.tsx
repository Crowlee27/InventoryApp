import React from "react";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

interface ICatalogGridRow {
  ID: number;
  Description: string;
  Size: string;
  Length: string;
  Rating: string;
  Serial: string;
}

export const CatalogGrid = () => {
  const rowData: ICatalogGridRow[] = [
    {
      ID: 1,
      Description: "Pipe Spool",
      Size: `10"`,
      Length: `20'`,
      Rating: "",
      Serial: "OVVXX2RQ",
    },
    {
      ID: 2,
      Description: "Pipe Spool",
      Size: `10"`,
      Length: `20'`,
      Rating: "",
      Serial: "PZDWVXMQ",
    },
    {
      ID: 3,
      Description: "Gate Valve",
      Size: "10#",
      Length: "",
      Rating: "150#",
      Serial: "4G7DA4JP",
    },
    {
      ID: 4,
      Description: "Gasket - Spiral wound",
      Size: `10"`,
      Length: "",
      Rating: "150#",
      Serial: "EVRH3Z9R",
    },
    {
      ID: 5,
      Description: "A193 CR B7 Stud Bolt",
      Size: `3/4 x 5"`,
      Length: "",
      Rating: "150#",
      Serial: "128SKFSN",
    },
  ];

  const columnDefs: ColDef[] = [
    { field: "ID" },
    { field: "Description" },
    { field: "Size" },
    { field: "Length" },
    { field: "Rating" },
    { field: "Serial" },
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
