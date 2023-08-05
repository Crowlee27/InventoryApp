import React, { useMemo, useState } from "react";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { DeleteButton } from "../../specialButtons/deleteButton";
import { DeleteConfirmationDialog } from "../../dialogForms/deleteDialog/deleteDialog";

export const InventoryGrid = () => {
  const [rowData, setRowData] = useState([
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
  ]);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      field: "ID",
      checkboxSelection: true,
      headerCheckboxSelection: true,
      editable: false,
    },
    { field: "Bom" },
    { field: "Purchased" },
    { field: "Received" },
    { field: "Outstanding" },
    { field: "Issued" },
    { field: "Remaining" },
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
      editable: true,
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
