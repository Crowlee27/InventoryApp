import React from "react";
import { ItemsTextFields } from "./itemsTextfields";

interface ISlrTextfield {
  setSize: (size: string) => void;
  setLength: (length: string) => void;
  setRating: (rating: string) => void;
}

export const SlrTextfield = ({
  setSize,
  setLength,
  setRating,
}: ISlrTextfield) => {
  const textFieldsStack1 = [
    { label: "Size", name: "size", id: "size", setNewValue: setSize },
    { label: "Length", name: "length", id: "length", setNewValue: setLength },
    { label: "Rating", name: "rating", id: "rating", setNewValue: setRating },
  ];
  return <ItemsTextFields textFields={textFieldsStack1} />;
};
