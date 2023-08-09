import React, { useMemo, useState } from "react";
import { ColDef, GridApi } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { DeleteButton } from "../../specialButtons/deleteButton";
import { DeleteConfirmationDialog } from "../../dialogForms/deleteDialog/deleteDialog";
import { SearchFilter } from "../../navBars/searchBar/searchFilterGrid";
import { AddDrawingsForm } from "../../dialogForms/addDrawingDialog/addDrawingDialog";
import { ResetButton } from "../../specialButtons/resetButton";
import { SearchButton } from "../../specialButtons/searchButton";

export const CatalogGrid = () => {
  const [rowData, setRowData] = useState([
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
    { field: "Description" },
    { field: "Size" },
    { field: "Length" },
    { field: "Rating" },
    { field: "Serial" },
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
