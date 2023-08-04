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
}
