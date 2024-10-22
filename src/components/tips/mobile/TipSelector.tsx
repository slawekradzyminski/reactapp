import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import tipsData from "../../../data/tipsData.json";

interface TipSelectorProps {
  tipId: string;
  onNavigateToTip: (tipId: string) => void;
}

const TipSelector = ({ tipId, onNavigateToTip }: TipSelectorProps) => {
  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    onNavigateToTip(event.target.value);
  };

  return (
    <Select
      value={tipId || ""}
      onChange={handleSelectChange}
      displayEmpty
      inputProps={{ "aria-label": "Without label" }}
      style={{ minWidth: 120 }}
    >
      {tipsData.map((tip) => (
        <MenuItem key={tip.id} value={tip.id}>
          {tip.title}
        </MenuItem>
      ))}
    </Select>
  );
};

export default TipSelector;