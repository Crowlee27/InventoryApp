import React from "react";
import Button from "@mui/material/Button";

export const ResetButton = (props: IResetButton) => {
  const { onClick } = props;

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick(event);
  };

  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={handleButtonClick}
      className="resetButton"
    >
      Reset
    </Button>
  );
};
