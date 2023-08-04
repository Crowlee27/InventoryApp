import React from "react";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import internal from "stream";

interface IBomGridRow {
  ID: number;
  Drawing: number;
  Catalog: number;
  Tag: string;
  Alias: string;
}

export const BomGrid = () => {
  const rowData: IBomGridRow[] = [
    { ID: 1, Drawing: 1, Catalog: 1, Tag: "10-AA-150-1", Alias: "" },
    { ID: 2, Drawing: 1, Catalog: 2, Tag: "10-AA-150-2", Alias: "" },
    { ID: 3, Drawing: 1, Catalog: 3, Tag: "9ACCW2", Alias: "" },
    { ID: 4, Drawing: 1, Catalog: 4, Tag: "7SPWG1", Alias: "7SPWG2" },
    { ID: 5, Drawing: 1, Catalog: 5, Tag: "9AJJDB2", Alias: "9AJJDB3" },
  ];

  const columnDefs: ColDef[] = [
    { field: "ID" },
    { field: "Drawing" },
    { field: "Catalog" },
    { field: "Tag" },
    { field: "Alias" },
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
