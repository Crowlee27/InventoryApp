import React, { useMemo, useState } from "react";
import { ColDef,GridApi } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { DeleteButton } from "../../specialButtons/deleteButton";
import { DeleteConfirmationDialog } from "../../dialogForms/deleteDialog/deleteDialog";
import { SearchFilter } from "../../navBars/searchBar/searchFilterGrid";
import { AddDrawingsForm } from "../../dialogForms/addDrawingDialog/addDrawingDialog";
import { ResetButton } from "../../specialButtons/resetButton";
import { SearchButton } from "../../specialButtons/searchButton";

export const BomGrid = () => {
  const [rowData, setRowData] = useState([
    { ID: 1, Drawing: 1, Catalog: 1, Tag: "10-AA-150-1", Alias: "" },
    { ID: 2, Drawing: 1, Catalog: 2, Tag: "10-AA-150-2", Alias: "" },
    { ID: 3, Drawing: 1, Catalog: 3, Tag: "9ACCW2", Alias: "" },
    { ID: 4, Drawing: 1, Catalog: 4, Tag: "7SPWG1", Alias: "7SPWG2" },
    { ID: 5, Drawing: 1, Catalog: 5, Tag: "9AJJDB2", Alias: "9AJJDB3" },
  ]);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      field: "ID",
      checkboxSelection: true,
      headerCheckboxSelection: true,
      editable: false,
      pinned: "left",
      width: 100,
    },
    { field: "Drawing" },
    { field: "Catalog" },
    { field: "Tag" },
    { field: "Alias" },
  ]);

  const [showConfirmation, setShowConfirmation] = useState(false);

  const gridRef = React.createRef<AgGridReact>();

  const handleDeleteRows = () => {
    const selectedRowData = gridRef?.current?.api?.getSelectedRows();
    if (selectedRowData && selectedRowData.length > 0) {
      setShowConfirmation(true);
    } else setShowConfirmation(false);
  };

  const handleConfirmDelete = () => {
    const selectedRowData = gridRef?.current?.api?.getSelectedRows();
    if (selectedRowData) {
      const selectedRowDatas = selectedRowData.map((row) => row.data);
      const updatedRowData = rowData.filter(
        (row) => !selectedRowData.includes(row)
      );
      setRowData(updatedRowData);
    }
    setShowConfirmation(false);
  };

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      editable: true,
      flex: 1,
      suppressMovable: true,
      filterParams: {
        buttons: ["apply", "reset"],
      },
    }),
    []
  );

   const [filterValue, setFilterValue] = React.useState("");

   const gridApiRef = React.useRef<GridApi | null>(null);

   const onGridReady = (params: { api: any }) => {
     gridApiRef.current = params.api;
   };

   const filterData = () => {
     if (gridApiRef.current) {
       gridApiRef.current.setQuickFilter(filterValue);
     }
   };

   const handleReset = () => {
     gridApiRef.current?.setQuickFilter("");
     setFilterValue("");
   };

  return (
    <div
      className="ag-theme-alpine"
    >
      <div className="gridSearchBar">
        <div className="searchBar">
          <DeleteButton onClick={handleDeleteRows} />
          <DeleteConfirmationDialog
            open={showConfirmation}
            onClose={() => setShowConfirmation(false)}
            onConfirm={handleConfirmDelete}
          />
          <SearchFilter
            filterValue={filterValue}
            onFilterChange={setFilterValue}
          />
          <SearchButton onClick={filterData} />
          <ResetButton onClick={handleReset} />
        </div>
        <div>
          <AddDrawingsForm />
        </div>
      </div>

      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowSelection="multiple"
        ref={gridRef}
        onGridReady={onGridReady}
      />
    </div>
  );
};
