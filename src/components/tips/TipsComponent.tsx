import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, Divider, useMediaQuery } from "@mui/material";
import tipsData from "../../data/tipsData.json";
import { TipBody } from "./TipBody";
import MobileTipNavigation from "./MobileTipNavigation";
import { TipsList } from "./TipsList";

const getRandomTipIndex = () => {
  return Math.floor(Math.random() * tipsData.length);
};

function TipsComponent() {
  const { tipId } = useParams<{ tipId: string }>();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:900px)");
  const [selectedTip, setSelectedTip] = useState(tipsData[getRandomTipIndex()]);

  useEffect(() => {
    const randomTipIndex = getRandomTipIndex();
    const tip = tipsData.find((tip) => tip.id.toString() === tipId);
    if (tip) {
      setSelectedTip(tip);
    } else {
      setSelectedTip(tipsData[randomTipIndex]);
    }
  }, [tipId]);

  const handleNavigation = (direction: "prev" | "next") => {
    const currentIndex = tipsData.findIndex(
      (tip) => tip.id.toString() === tipId
    );
    const newIndex = direction === "prev" ? currentIndex - 1 : currentIndex + 1;
    if (tipsData[newIndex]) {
      navigate(`/tips/${tipsData[newIndex].id}`);
    }
  };

  const onNavigateToTip = (selectedTipId: string) => {
    navigate(`/tips/${selectedTipId}`);
  };

  return (
    <>
      {isMobile ? (
        <Box sx={{ display: "flex", flexDirection: "column", p: 3 }}>
          <MobileTipNavigation
            tipId={selectedTip.id}
            onNavigate={handleNavigation}
            onNavigateToTip={onNavigateToTip}
          />
          <TipBody selectedTip={selectedTip} />
        </Box>
      ) : (
        <Box sx={{ display: "flex", p: 3 }}>
          <Box sx={{ width: "25%", mr: 2 }}>
            <TipsList title={"Tips List"} selectedTip={selectedTip.id} />
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box sx={{ width: "75%", ml: 2 }}>
            <TipBody selectedTip={selectedTip} />
          </Box>
        </Box>
      )}
    </>
  );
}

export default TipsComponent;
