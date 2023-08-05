import React from "react";
import Button from "@mui/material/Button";

export const DeleteButton = (props: IDeleteButton) => {
  const { onClick } = props;

  const handleButtonClick = () => {
    onClick();
  };

  return (
    <Button
      variant="contained"
      color="primary"
      size="small"
      onClick={handleButtonClick}
    >
      Delete
    </Button>
  );
};
