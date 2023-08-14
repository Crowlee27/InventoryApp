import React from "react";
import { ItemsTextFields } from "./itemsTextfields";

interface IStaTextfield {
  setSerial: (serial: string) => void;
  setTag: (tag: string) => void;
  setAlias: (alias: string) => void;
}

export const StaTextfield = ({
  setSerial,
  setTag,
  setAlias,
}: IStaTextfield) => {
  const textFieldsStack2 = [
    { label: "Serial", name: "serial", id: "serial", setNewValue: setSerial },
    { label: "Tag", name: "tag", id: "tag", setNewValue: setTag },
    { label: "Alias", name: "alias", id: "alias", setNewValue: setAlias },
  ];
  return <ItemsTextFields textFields={textFieldsStack2} />;
};
