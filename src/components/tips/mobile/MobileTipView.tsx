import { Box } from "@mui/material";
import { TipBody } from "../TipBody";
import MobileTipNavigation from "./MobileTipNavigation";
import useTipNavigation from "../../../hooks/useTipNavigation";

const MobileTipView = () => {
  const { selectedTip, handleNavigation, onNavigateToTip } = useTipNavigation();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", p: 3 }}>
      <MobileTipNavigation
        tipId={selectedTip.id}
        onNavigate={handleNavigation}
        onNavigateToTip={onNavigateToTip}
      />
      <TipBody selectedTip={selectedTip} />
    </Box>
  );
};

export default MobileTipView;