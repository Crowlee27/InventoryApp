import React from "react";
import { ItemDescriptionTextField } from "./descriptionTextfield";
import { ItemPurchasedTextField } from "./purchasedTextfield";
import { StaTextfield } from "./staTextfields";
import { SlrTextfield } from "./slrTextfield";
import { ItemsTextFields } from "./itemsTextfields";

export const ItemsDialogForm = () => {
  return (
    <div>
      <ItemDescriptionTextField
        id="itemDescription"
        label="Item Description"
        name="itemDescription"
      />
      <SlrTextfield />
      <StaTextfield />
      <ItemPurchasedTextField
        id="itemPurchased"
        label="Purchased"
        name="itemPurchased"
      />
    </div>
  );
};
