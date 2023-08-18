import React, { useMemo, useState, useCallback, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ColDef, GridApi, GridReadyEvent } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { DeleteButton } from "../../specialButtons/deleteButton";
import { DeleteConfirmationDialog } from "../../dialogForms/deleteDialog/deleteDialog";
import { SearchFilter } from "../../navBars/searchBar/searchFilterGrid";
import { AddDrawingsForm } from "../../dialogForms/addDrawingDialog/addDrawingDialog";
import { ResetButton } from "../../specialButtons/resetButton";
import { SearchButton } from "../../specialButtons/searchButton";
import {
  deleteInventory,
  getInventoryQuery,
  updateInventoryMutation,
} from "../../graphQl/queries";

export const InventoryGrid = (props: IInventoryGrid) => {
  const { loading, error, data } = useQuery(getInventoryQuery);
  const [rowData, setRowData] = useState<IInventoryGridRow[]>([]);
  const [updateCell] = useMutation(updateInventoryMutation);

  useEffect(() => {
    console.log("Loading state:", loading);
    console.log("Error state:", error);
    console.log("Data state:", data);

    if (data) {
      const nodesArray = data.inventories.nodes;
      setRowData(nodesArray);
    }
  }, [data, loading, error]);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      field: "id",
      checkboxSelection: true,
      headerCheckboxSelection: true,
      editable: false,
      pinned: "left",
      width: 140,
    },
    { field: "bom", editable: false },
    {
      field: "purchased",
    },
    {
      field: "received",
    },
    { field: "outstanding", editable: false  },
    { field: "issued" },
    { field: "remaining", editable: false },
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

  const handleConfirmDelete = async (selectedRows: IInventoryGridRow[]) => {
    if (selectedRows.length > 0) {
      try {
        for (const row of selectedRows) {
          await deleteInventory(row.id);
        }
        const updatedRowData = rowData.filter(
          (row) => !selectedRows.includes(row)
        );
        setRowData(updatedRowData);
        setSelectedRows([]);
      } catch (error) {
        console.error("Failed to delete inventory: ", error);
      }
    }
    setShowConfirmation(false);
  };

  const defaultColDef = useMemo<IDefaultColDef>(
    () => ({
      sortable: true,
      filter: true,
      editable: true,
      flex: 1,
      wrapText: true,
      autoHeight: true,
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

  const onCellValueChanged = async (params: any) => {
    const { data, colDef, newValue } = params;
    const { id } = data;

    if (id && colDef.field && newValue !== undefined) {
      try {
        const input = {
          id: id,
          patch: {
            [colDef.field]: newValue,
          },
        };

        await updateCell({
          variables: { input },
        });
      } catch (error) {
        console.log("Error updating cell:", error);
      }
    }
  };

  return (
    <div className="ag-theme-material">
      <div>
        <div className="searchBarContainer">
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
      </div>

      <AgGridReact
        onRowSelected={handleRowSelected}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowSelection="multiple"
        onGridReady={onGridReady}
        rowBuffer={10}
        pagination={true}
        paginationPageSize={50}
        readOnlyEdit={true}
        onCellEditRequest={onCellValueChanged}
      />
    </div>
  );
};
