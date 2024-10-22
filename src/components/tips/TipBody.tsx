import { Typography } from "@mui/material";

interface TipBodyProps {
  selectedTip: { title: string; content: string };
  header: boolean;
}

export const TipBody = ({ selectedTip, header }: TipBodyProps) => {
  return (
    <div>
      <>
        {header && <Typography variant="h5">{selectedTip.title}</Typography>}
        <Typography
          variant="body1"
          sx={{ textAlign: "justify" }}
          dangerouslySetInnerHTML={{ __html: selectedTip.content }}
        />
      </>
    </div>
  );
};
