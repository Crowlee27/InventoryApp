import React, { useMemo, useState, useCallback } from "react";
import { ColDef, GridApi, GridReadyEvent } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { DeleteButton } from "../../specialButtons/deleteButton";
import { DeleteConfirmationDialog } from "../../dialogForms/deleteDialog/deleteDialog";
import { SearchFilter } from "../../navBars/searchBar/searchFilterGrid";
import { AddDrawingsForm } from "../../dialogForms/addDrawingDialog/addDrawingDialog";
import { ResetButton } from "../../specialButtons/resetButton";
import { SearchButton } from "../../specialButtons/searchButton";

interface ICatalogGrid { 
  rowData: ICatalogGridRow[];
  columnDefs: ColDef[];
}

export const CatalogGrid = (props: ICatalogGrid) => {
  const [rowData, setRowData] = useState<ICatalogGridRow[]>([
    {
      id: 1,
      description: "Pipe Spool",
      size: `10"`,
      length: `20'`,
      rating: "",
      serial: "OVVXX2RQ",
    },
    {
      id: 2,
      description: "Pipe Spool",
      size: `10"`,
      length: `20'`,
      rating: "",
      serial: "PZDWVXMQ",
    },
    {
      id: 3,
      description: "Gate Valve",
      size: "10#",
      length: "",
      rating: "150#",
      serial: "4G7DA4JP",
    },
    {
      id: 4,
      description: "Gasket - Spiral wound",
      size: `10"`,
      length: "",
      rating: "150#",
      serial: "EVRH3Z9R",
    },
    {
      id: 5,
      description: "A193 CR B7 Stud Bolt",
      size: `3/4 x 5"`,
      length: "",
      rating: "150#",
      serial: "128SKFSN",
    },
  ] as ICatalogGridRow[]);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      field: "id",
      checkboxSelection: true,
      headerCheckboxSelection: true,
      editable: false,
      pinned: "left",
      width: 100,
    },
    { field: "description" },
    { field: "size" },
    { field: "length" },
    { field: "rating" },
    { field: "serial" },
  ]);

  const [showConfirmation, setShowConfirmation] = useState(false);

  const [selectedRows, setSelectedRows] = useState<ICatalogGridRow[]>([]);

const handleRowSelected = useCallback((event: GridReadyEvent) => {
  setSelectedRows(event.api.getSelectedNodes().map((node) => node.data));
}, []);

  const handleDeleteRows = (selectedRows: ICatalogGridRow[]) => {
    if (selectedRows.length > 0) {
      setShowConfirmation(true);
    } else {
      setShowConfirmation(false);
    }
  };

  const handleConfirmDelete = (selectedRows: ICatalogGridRow[]) => {
    if (selectedRows.length > 0) {
      const updatedRowData = rowData.filter(
        (row) => !selectedRows.includes(row)
      );
      setRowData(updatedRowData);
      setSelectedRows([]);
    }
    setShowConfirmation(false);
  };

  const defaultColDef = useMemo<IDefaultColDef>(
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

  const [filterValue, setFilterValue] = useState("");

  const gridApiRef = React.useRef<GridApi | null>(null);

  const onGridReady = useCallback((event: GridReadyEvent) => {
    gridApiRef.current = event.api;
  }, []);

  const filterData = (value: string) => {
    if (gridApiRef.current) {
      gridApiRef.current.setQuickFilter(value);
    }
  };

  const handleReset = (value: string) => {
    gridApiRef.current?.setQuickFilter("");
    setFilterValue("");
  };

  return (
    <div className="ag-theme-alpine">
      <div className="gridSearchBar">
        <div className="searchBar">
          <DeleteButton onClick={() => handleDeleteRows(selectedRows)} />

          <DeleteConfirmationDialog
            open={showConfirmation}
            onClose={() => setShowConfirmation(false)}
            onConfirm={() => handleConfirmDelete(selectedRows)}
          />
          <SearchFilter
            filterValue={filterValue}
            onFilterChange={setFilterValue}
            onKeyPress={() => filterData(filterValue)}
          />
          <SearchButton onClick={() => filterData(filterValue)} />
          <ResetButton onClick={() => handleReset("")} />
        </div>
        <div>
          <AddDrawingsForm />
        </div>
      </div>

      <AgGridReact
        onRowSelected={handleRowSelected}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowSelection="multiple"
        onGridReady={onGridReady}
      />
    </div>
  );
};
