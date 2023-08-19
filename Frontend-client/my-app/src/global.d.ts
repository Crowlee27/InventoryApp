import React from "react";

export {};

declare global {
  //-----for form inputs

  interface ITextField {
    name: string;
    label: string;
    id: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    setNewNumber?: (number: string) => void;
    setNewItemDescription?;
    setNewItemPurchased?;
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
    setNewDescription?;
  }

  //-----for gridSearchBar and gridButtons

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

  interface IDrawingFormFields {
    setNewNumber: (number: string) => void;
    setNewDescription: (description: string) => void;
    drawingNumber: string;
    drawingDescription: string;
  }

  //-----for grid column shape

  interface IDefaultColDef {
    sortable: boolean;
    filter: boolean;
    editable: boolean;
    flex: number;
    suppressMovable: boolean;
    wrapText: boolean;
    autoHeight: boolean;
    filterParams: {
      buttons: string[];
    };
  }

  //-----for grid data shape

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
    outstanding: number;
    issued: number;
    remaining: number;
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

  interface IDrawingData {
    nodes: IDrawingGridRow[];
  }

  interface ICatalogData {
    nodes: ICatalogGridRow[];
  }

  interface IBomData {
    nodes: IBomGridRow[];
  }

  interface IInventoryData {
    nodes: IInventoryGridRow[];
  }

  //-----for queries.ts
  interface ICreateDrawingInput {
    drawing: {
      number: string;
      description: string;
    };
  }

  interface ICreateCatalogInput {
    catalog: {
      description: string;
      size: string;
      length: string;
      rating: string;
      serial: string;
    };
  }

  interface ICreateBomInput {
    bom: {
      drawing: number;
      catalog: number;
      tag: string;
      alias: string;
    };
  }

  interface ICreateInventoryInput {
    inventory: {
      bom: number;
      purchased: number;
    };
  }
}
