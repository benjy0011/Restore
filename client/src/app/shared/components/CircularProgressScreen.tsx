import { CircularProgress } from "@mui/material";

interface Props {
  size?: string | undefined;
}

const CircularProgressScreen = ({ size }: Props) => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        paddingTop: "10px",
      }}
    >
      <CircularProgress size={size} />
    </div>
  );
};
export default CircularProgressScreen;
