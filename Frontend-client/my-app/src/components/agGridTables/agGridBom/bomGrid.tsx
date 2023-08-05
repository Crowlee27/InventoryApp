import React, { useMemo, useState } from "react";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { DeleteButton } from "../../specialButtons/deleteButton";
import { DeleteConfirmationDialog } from "../../dialogForms/deleteDialog/deleteDialog";

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
    },
    { field: "Drawing" },
    { field: "Catalog" },
    { field: "Tag" },
    { field: "Alias" },
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
