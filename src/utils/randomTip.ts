import tipsData from "../data/tipsData.json";

export const getRandomTipIndex = () => {
  return Math.floor(Math.random() * tipsData.length);
};