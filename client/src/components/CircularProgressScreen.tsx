import { CircularProgress } from "@mui/material"

const CircularProgressScreen = () => {

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
      <CircularProgress />
    </div>
  )
}
export default CircularProgressScreen