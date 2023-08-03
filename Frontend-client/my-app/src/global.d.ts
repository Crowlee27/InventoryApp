export {};

declare global {
  interface ISearchBar {
    name: string;
    label: string;
    id: string;
  }

  interface IDrawingNumberText {
    label: string;
    id: string;
    name: string;
  }

  interface IDrawingDescSelect {
    label: string;
    name: string;
    id: string;
    value: string;
  }
}
