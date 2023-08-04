import React from "react";
import { ItemsTextFields } from "./itemsTextfields";

export const StaTextfield = () => {
  const textFieldsStack2 = [
    { label: "Serial", name: "serial", id: "serial" },
    { label: "Tag", name: "tag", id: "tag" },
    { label: "Alias", name: "alias", id: "alias" },
  ];
  return <ItemsTextFields textFields={textFieldsStack2} />;
};
