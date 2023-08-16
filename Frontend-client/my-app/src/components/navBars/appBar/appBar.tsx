import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { MenuItem, Menu } from "@mui/material";
import { Link } from "react-router-dom";

export const SearchAppBar = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className="appBarContainer">
      <AppBar position="static">
        <Toolbar className="appBar">
          <IconButton
            className="menuButton"
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            className="title"
            variant="h6"
            noWrap
            component="div"
          >
            Inventory App
          </Typography>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem component={Link} to="/drawing" onClick={handleMenuClose}>
          Drawing
        </MenuItem>
        <MenuItem component={Link} to="/catalog" onClick={handleMenuClose}>
          Catalog
        </MenuItem>
        <MenuItem component={Link} to="/bom" onClick={handleMenuClose}>
          BOM
        </MenuItem>
        <MenuItem component={Link} to="/inventory" onClick={handleMenuClose}>
          Inventory
        </MenuItem>
      </Menu>
    </Box>
  );
};
