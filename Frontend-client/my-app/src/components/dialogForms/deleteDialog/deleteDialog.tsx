import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

export const DeleteConfirmationDialog = (props: IDeleteConfirmationDialog) => {
  const { open, onClose, onConfirm } = props;

  const handleConfirm = (event: React.MouseEvent<HTMLButtonElement>) => {
    onConfirm(event);
    onClose(event);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the selected items?
        </DialogContentText>
      </DialogContent>
      <DialogActions className="deleteDialogContainer">
        <Button className="deleteCancelButton" onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button className="deleteDeleteButton" onClick={handleConfirm} variant="contained" color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
