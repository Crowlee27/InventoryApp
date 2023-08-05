import React, { useMemo, useState } from "react";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { DeleteButton } from "../../specialButtons/deleteButton";
import { DeleteConfirmationDialog } from "../../dialogForms/deleteDialog/deleteDialog";

export const DrawingGrid = () => {
  const [rowData, setRowData] = useState([
    { ID: 1, Number: "ISO-100-AA", Description: "Piping ISO" },
    { ID: 2, Number: "ISO-101--AA", Description: "Piping ISO" },
    { ID: 3, Number: "ISO-102--AA", Description: "Piping ISO" },
  ]);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: "ID", checkboxSelection: true, headerCheckboxSelection: true },
    { field: "Number", editable: true, cellEditor: "agTextCellEditor" },
    { field: "Description", editable: true, cellEditor: "agTextCellEditor" },
  ]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const gridRef = React.createRef<AgGridReact>();

  const handleDeleteRows = () => {
    const selectedNodes = gridRef?.current?.api?.getSelectedNodes();
    if (selectedNodes && selectedNodes.length > 0) {
      setShowConfirmation(true);
    } else setShowConfirmation(false);
  };

  const handleConfirmDelete = () => {
    const selectedNodes = gridRef?.current?.api?.getSelectedNodes();
    if (selectedNodes) {
      const selectedRowData = selectedNodes.map((node) => node.data);
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
      flex: 1,
      filterParams: {
        buttons: ["apply", "reset"],
      },
    }),
    []
  );

  return (
    <div
      className="ag-theme-alpine"
      style={{ height: "100vh", width: "100vw" }}
    >
      <DeleteButton onClick={handleDeleteRows} />
      <DeleteConfirmationDialog
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmDelete}
      />
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowSelection="multiple"
        ref={gridRef}
      />
    </div>
  );
};
