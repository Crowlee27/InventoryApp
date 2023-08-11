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



export const BomGrid = (props: IBomGrid) => {
  const [rowData, setRowData] = useState<IBomGridRow[]>([
    { id: 1, drawing: 1, catalog: 1, tag: "10-AA-150-1", alias: "" },
    { id: 2, drawing: 1, catalog: 2, tag: "10-AA-150-2", alias: "" },
    { id: 3, drawing: 1, catalog: 3, tag: "9ACCW2", alias: "" },
    { id: 4, drawing: 1, catalog: 4, tag: "7SPWG1", alias: "7SPWG2" },
    { id: 5, drawing: 1, catalog: 5, tag: "9AJJDB2", alias: "9AJJDB3" },
  ] as IBomGridRow[]);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      field: "id",
      checkboxSelection: true,
      headerCheckboxSelection: true,
      editable: false,
      pinned: "left",
      width: 100,
    },
    { field: "drawing" },
    { field: "catalog" },
    { field: "tag" },
    { field: "alias" },
  ]);

  const [showConfirmation, setShowConfirmation] = useState(false);

  const [selectedRows, setSelectedRows] = useState<IBomGridRow[]>([]);

  const handleRowSelected = useCallback((event: GridReadyEvent) => {
    setSelectedRows(event.api.getSelectedNodes().map((node) => node.data));
  }, []);

  const handleDeleteRows = (selectedRows: IBomGridRow[]) => {
    if (selectedRows.length > 0) {
      setShowConfirmation(true);
    } else {
      setShowConfirmation(false);
    }
  };

  const handleConfirmDelete = (selectedRows: IBomGridRow[]) => {
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
