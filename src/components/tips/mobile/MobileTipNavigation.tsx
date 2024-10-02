import { Box } from "@mui/material";
import TipNavigationButton from "./TipNavigationButton";
import TipSelector from "./TipSelector";
import tipsData from "../../../data/tipsData.json";

interface MobileTipNavigationProps {
  tipId: string;
  onNavigate: (direction: "prev" | "next") => void;
  onNavigateToTip: (tipId: string) => void;
}

const MobileTipNavigation = ({
  tipId,
  onNavigate,
  onNavigateToTip,
}: MobileTipNavigationProps) => {
  const currentTipIndex = tipsData.findIndex((tip) => tip.id === tipId);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      marginBottom="20px"
    >
      <TipNavigationButton
        direction="prev"
        disabled={currentTipIndex <= 0}
        onNavigate={onNavigate}
      />
      <TipSelector
        tipId={tipId}
        onNavigateToTip={onNavigateToTip}
      />
      <TipNavigationButton
        direction="next"
        disabled={currentTipIndex >= tipsData.length - 1}
        onNavigate={onNavigate}
      />
    </Box>
  );
};

export default MobileTipNavigation;
