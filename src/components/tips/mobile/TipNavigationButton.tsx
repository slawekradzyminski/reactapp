import { IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface TipNavigationButtonProps {
  direction: "prev" | "next";
  disabled: boolean;
  onNavigate: (direction: "prev" | "next") => void;
}

const TipNavigationButton = ({
  direction,
  disabled,
  onNavigate,
}: TipNavigationButtonProps) => (
  <IconButton
    onClick={() => onNavigate(direction)}
    disabled={disabled}
  >
    {direction === "prev" ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}
  </IconButton>
);

export default TipNavigationButton;