import { useMediaQuery } from "@mui/material";
import MobileTipView from "./mobile/MobileTipView";
import DesktopTipView from "./desktop/DesktopTipView";

const TipsPage = () => {
  const isMobile = useMediaQuery("(max-width:900px)");
  return isMobile ? <MobileTipView /> : <DesktopTipView />;
};

export default TipsPage;
