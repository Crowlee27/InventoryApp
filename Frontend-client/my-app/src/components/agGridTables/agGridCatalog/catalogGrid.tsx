import React, { useMemo, useState, useCallback, useEffect } from "react";
import {useQuery} from "@apollo/client";
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
import { allCatalogsQuery, deleteCatalog, updateCatalog } from "../../graphQl/queries";

export const CatalogGrid = (props: ICatalogGrid) => {
  const [rowData, setRowData] = useState<ICatalogGridRow[]>([]);
  const {  error, data } = useQuery(allCatalogsQuery);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (data){
          const nodesArray = data.catalogs.nodes;
          setRowData(nodesArray);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, [data]);


  console.log("[CatalogGrid] catalogs:", {data,error});

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

  const handleUpdateRows = async (selectedRows: ICatalogGridRow[]) => {
    try {
      for (const row of selectedRows) {
        await updateCatalog(row);
      }
      console.log(" Catalog updated successfully");
    } catch (error) {
      console.error("Failed to update catalog:", error);
    }
    window.location.reload();
  }

  const handleDeleteRows = (selectedRows: ICatalogGridRow[]) => {
    if (selectedRows.length > 0) {
      setShowConfirmation(true);
    } else {
      setShowConfirmation(false);
    }
  };

  


  const handleConfirmDelete = async (selectedRows: ICatalogGridRow[]) => {
    if (selectedRows.length > 0) {
      try {
        for (const row of selectedRows) {
         await deleteCatalog(row.id);
        }
        const updatedRowData = rowData.filter(
          (row) => !selectedRows.includes(row)
        );
        setRowData(updatedRowData);
        setSelectedRows([]);
      } catch (error) {
        console.error("Failed to delete catalog", error);
      }
    }
    setShowConfirmation(false);
    window.location.reload();
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
        onCellValueChanged={(event) => {
          if (event.oldValue !== event.newValue) {
            handleUpdateRows([event.data]);
          }
        }}
      />
    </div>
  );
};
