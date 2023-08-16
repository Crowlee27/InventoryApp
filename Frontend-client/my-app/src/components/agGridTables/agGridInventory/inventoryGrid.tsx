import React, {
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";
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
import {
  getInventories,
  deleteInventory,
  updateInventory,
} from "../../graphQl/queries";

export const InventoryGrid = (props: IInventoryGrid) => {
  const [rowData, setRowData] = useState<IInventoryGridRow[]>([]);
  useEffect(() => {
    getInventories().then((inventory) => {
      const nodesArray = inventory.nodes;
      setRowData(nodesArray);
    });
  }, []);
  console.log("[InventoryGrid] inventories:", rowData);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      field: "id",
      checkboxSelection: true,
      headerCheckboxSelection: true,
      editable: false,
      pinned: "left",
      width: 100,
    },
    { field: "bom", editable: false },
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

  const handleUpdateRows = async (selectedRows: IInventoryGridRow[]) => {
    try {
      for (const row of selectedRows) {
        await updateInventory(row);
      }

      console.log("Inventory updated successfully");
    } catch (error) {
      console.error("Failed to update inventory:", error);
    }
  };

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

  return (
    <div className="ag-theme-alpine">
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
          <div className="addButton">
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
        onCellValueChanged={(event) => {
          if (event.oldValue !== event.newValue) {
            handleUpdateRows([event.data]);
          }
        }}
      />
    </div>
  );
};
