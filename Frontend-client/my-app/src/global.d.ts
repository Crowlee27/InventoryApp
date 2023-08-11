import React from "react";

export {};

declare global {
  interface ITextField {
    name: string;
    label: string;
    id: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
  }

  interface ITextFieldsProps {
    textFields: ITextField[];
  }

  interface ISelectField {
    label: string;
    name: string;
    id: string;
    value: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }

  interface IDrawingGridRow {
    id: number;
    number: string;
    description: string;
  }

  interface ICatalogGridRow {
    id: number;
    description: string;
    size: string;
    length: string;
    rating: string;
    serial: string;
  }

  interface IBomGridRow {
    id: number;
    drawing: number;
    catalog: number;
    tag: string;
    alias: string;
  }

  interface IInventoryGridRow {
    id: number;
    bom: number;
    purchased: number;
    received: number;
    outstanding?: number;
    issued: number;
    remaining: number;
  }

  interface IDeleteButton {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  }

  interface IDeleteConfirmationDialog {
    open: boolean;
    onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onConfirm: (event: React.MouseEvent<HTMLButtonElement>) => void;
  }

  interface IResetButton {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  }

  interface ISearchButton {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  }

  interface ISearchFilter {
    filterValue: string;
    onFilterChange: (value: string) => void;
    onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  }

  interface IDefaultColDef {
    sortable: boolean;
    filter: boolean;
    editable: boolean;
    flex: number;
    suppressMovable: boolean;
    filterParams: {
      buttons: string[];
    };
  }

interface IDrawingGrid {
  rowData: IDrawingGridRow[];
  columnDefs: ColDef[];
}

  interface ICatalogGrid {
    rowData: ICatalogGridRow[];
    columnDefs: ColDef[];
  }

  interface IBomGrid {
    rowData: IBomGridRow[];
    columnDefs: ColDef[];
  }

  interface IInventoryGrid {
    rowData: IInventoryGridRow[];
    columnDefs: ColDef[];
  }
}
