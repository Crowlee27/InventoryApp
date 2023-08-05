export {};

declare global {
  interface ITextField {
    name: string;
    label: string;
    id: string;
  }

  interface ITextFieldsProps {
    textFields: ITextField[];
  }

  interface ISelectField {
    label: string;
    name: string;
    id: string;
    value: string;
  }

  interface IDrawingGridRow {
    ID: number;
    Number: string;
    Description: string;
  }

  interface ICatalogGridRow {
    ID: number;
    Description: string;
    Size: string;
    Length: string;
    Rating: string;
    Serial: string;
  }

  interface IBomGridRow {
    ID: number;
    Drawing: number;
    Catalog: number;
    Tag: string;
    Alias: string;
  }

  interface IInventoryGridRow {
    ID: number;
    Bom: number;
    Purchased: number;
    Received: number;
    Outstanding?: number;
    Issued: number;
    Remaining: number;
  }

  interface IDeleteButton {
    onClick: () => void;
  }

  interface IDeleteConfirmationDialog {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
  }
}
