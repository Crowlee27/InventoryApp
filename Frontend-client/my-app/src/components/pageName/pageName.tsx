import React from "react";
import { useLocation } from "react-router-dom";

export const PageName = () => {
  const location = useLocation();
  let pageName = location.pathname.substring(1);
  if (pageName === "bom") {
    return <h1>BOM</h1>;
  } else pageName = pageName.charAt(0).toUpperCase() + pageName.slice(1);

  return <h1>{pageName}</h1>;
};
