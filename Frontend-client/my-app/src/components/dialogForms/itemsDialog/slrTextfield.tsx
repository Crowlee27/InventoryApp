import React from "react";
import { ItemsTextFields } from "./itemsTextfields";

export const SlrTextfield = () => {
  const textFieldsStack1 = [
    { label: "Size", name: "size", id: "size" },
    { label: "Length", name: "length", id: "length" },
    { label: "Rating", name: "rating", id: "rating" },
  ];
  return <ItemsTextFields textFields={textFieldsStack1} />;
};
