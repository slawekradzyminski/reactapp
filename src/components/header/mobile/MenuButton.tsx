import { MouseEvent } from "react";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

type MenuButtonProps = {
  onClick: (event: MouseEvent<HTMLElement>) => void;
};

const MenuButton = ({ onClick }: MenuButtonProps) => (
  <IconButton
    size="large"
    aria-label="navigation menu"
    aria-controls="menu-appbar"
    aria-haspopup="true"
    onClick={onClick}
    color="inherit"
  >
    <MenuIcon />
  </IconButton>
);

export default MenuButton;