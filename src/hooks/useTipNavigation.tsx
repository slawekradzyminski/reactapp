import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import tipsData from "../data/tipsData.json";
import { getRandomTipIndex } from "../utils/randomTip";

const useTipNavigation = () => {
  const { tipId } = useParams<{ tipId: string }>();
  const navigate = useNavigate();
  const [selectedTip, setSelectedTip] = useState(tipsData[getRandomTipIndex()]);

  useEffect(() => {
    const tip = tipsData.find((tip) => tip.id.toString() === tipId);
    setSelectedTip(tip || tipsData[getRandomTipIndex()]);
  }, [tipId]);

  const handleNavigation = useCallback((direction: "prev" | "next") => {
    const currentIndex = tipsData.findIndex(
      (tip) => tip.id.toString() === tipId
    );
    const newIndex = direction === "prev" ? currentIndex - 1 : currentIndex + 1;
    if (tipsData[newIndex]) {
      navigate(`/tips/${tipsData[newIndex].id}`);
    }
  }, [tipId, navigate]);

  const onNavigateToTip = useCallback((selectedTipId: string) => {
    navigate(`/tips/${selectedTipId}`);
  }, [navigate]);

  return { selectedTip, handleNavigation, onNavigateToTip };
};

export default useTipNavigation;