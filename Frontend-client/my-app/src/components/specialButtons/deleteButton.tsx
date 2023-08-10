import React from "react";
import Button from "@mui/material/Button";

export const DeleteButton = (props: IDeleteButton) => {
  const { onClick } = props;

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick(event);
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleButtonClick}
      className="deleteButton"
    >
      Delete
    </Button>
  );
};
