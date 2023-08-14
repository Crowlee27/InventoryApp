import React from "react";
import { ItemDescriptionTextField } from "./descriptionTextfield";
import { ItemPurchasedTextField } from "./purchasedTextfield";
import { StaTextfield } from "./staTextfields";
import { SlrTextfield } from "./slrTextfield";

interface IItemsFormFields {
  setNewItemDescription: (description: string) => void;
  setNewItemPurchased: (purchased: string) => void;
  setSize: (size: string) => void;
  setLength: (length: string) => void;
  setRating: (rating: string) => void;
  setSerial: (serial: string) => void;
  setTag: (tag: string) => void;
  setAlias: (alias: string) => void;
}

export const ItemsDialogForm = ({
  setNewItemDescription,
  setNewItemPurchased,
  setSize,
  setLength,
  setRating,
  setSerial,
  setTag,
  setAlias,
}: IItemsFormFields) => {
  return (
    <div>
      <ItemDescriptionTextField
        id="itemDescription"
        label="Item Description"
        name="itemDescription"
        setNewItemDescription={setNewItemDescription}
      />
      <SlrTextfield
        setSize={setSize}
        setLength={setLength}
        setRating={setRating}
      />
      <StaTextfield setSerial={setSerial} setTag={setTag} setAlias={setAlias} />
      <ItemPurchasedTextField
        id="itemPurchased"
        label="Purchased"
        name="itemPurchased"
        setNewItemPurchased={setNewItemPurchased}
      />
    </div>
  );
};
