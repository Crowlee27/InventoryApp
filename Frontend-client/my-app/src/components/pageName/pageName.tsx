import React from "react";
import { useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";

export const PageName = () => {
  const location = useLocation();
  let pageName = location.pathname.substring(1);
  if (pageName === "bom") {
    return (
      <div className="header">
        <Typography variant="h4" component="div">
          BOM
        </Typography>
      </div>
    );
  } else pageName = pageName.charAt(0).toUpperCase() + pageName.slice(1);

  return (
    <div className="header">
      <Typography variant="h4" component="div">
        {pageName}
      </Typography>
    </div>
  );
};
