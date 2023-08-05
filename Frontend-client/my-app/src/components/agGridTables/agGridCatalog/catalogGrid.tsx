import React, { useMemo, useState } from "react";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { DeleteButton } from "../../specialButtons/deleteButton";
import { DeleteConfirmationDialog } from "../../dialogForms/deleteDialog/deleteDialog";

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
