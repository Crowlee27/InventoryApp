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

interface IInventoryGrid {
  rowData: IInventoryGridRow[];
  columnDefs: ColDef[];
}

export const InventoryGrid = (props: IInventoryGrid) => {
  const [rowData, setRowData] = useState<IInventoryGridRow[]>([
    { id: 1, bom: 1, purchased: 1, received: 1, issued: 1, remaining: 0 },
    { id: 2, bom: 2, purchased: 1, received: 1, issued: 1, remaining: 0 },
    {
      id: 3,
      bom: 3,
      purchased: 4,
      received: 2,
      outstanding: 2,
      issued: 1,
      remaining: 0,
    },
    {
      id: 4,
      bom: 4,
      purchased: 100,
      received: 73,
      outstanding: 27,
      issued: 0,
      remaining: 2,
    },
    {
      id: 5,
      bom: 5,
      purchased: 500,
      received: 291,
      outstanding: 208,
      issued: 16,
      remaining: 0,
    },
  ] as IInventoryGridRow[]);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      field: "id",
      checkboxSelection: true,
      headerCheckboxSelection: true,
      editable: false,
      pinned: "left",
      width: 100,
    },
    { field: "bom" },
    { field: "purchased" },
    { field: "received" },
    { field: "outstanding" },
    { field: "issued" },
    { field: "remaining" },
  ]);

  const [showConfirmation, setShowConfirmation] = useState(false);

  const [selectedRows, setSelectedRows] = useState<IInventoryGridRow[]>([]);

  const handleRowSelected = useCallback((event: GridReadyEvent) => {
    setSelectedRows(event.api.getSelectedNodes().map((node) => node.data));
  }, []);

  const handleDeleteRows = (selectedRows: IInventoryGridRow[]) => {
    if (selectedRows.length > 0) {
      setShowConfirmation(true);
    } else {
      setShowConfirmation(false);
    }
  };

  const handleConfirmDelete = (selectedRows: IInventoryGridRow[]) => {
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
