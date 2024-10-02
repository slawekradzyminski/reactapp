import { Box, Divider } from "@mui/material";
import { TipBody } from "../TipBody";
import { TipsList } from "./TipsList";
import useTipNavigation from "../../../hooks/useTipNavigation";

const DesktopTipView = () => {
  const { selectedTip } = useTipNavigation();

  return (
    <Box sx={{ display: "flex", p: 3 }}>
      <Box sx={{ width: "25%", mr: 2 }}>
        <TipsList title={"Tips List"} id={selectedTip.id} />
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box sx={{ width: "75%", ml: 2 }}>
        <TipBody selectedTip={selectedTip} />
      </Box>
    </Box>
  );
};

export default DesktopTipView;