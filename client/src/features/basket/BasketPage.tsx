import { Button, Paper, Typography } from "@mui/material";
import CircularProgressScreen from "../../components/CircularProgressScreen";
import { useFetchBasketQuery } from "./basketApi"
import { Link } from "react-router-dom";
import { ProductionQuantityLimits } from "@mui/icons-material";

const BasketPage = () => {
  const { data, isLoading } = useFetchBasketQuery();

  if (isLoading) return <CircularProgressScreen />

  if (!data) return (
    <Paper
      sx={{
        height: 400,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: 6,
        gap: 4
      }}
    >
      <ProductionQuantityLimits sx={{fontSize: 100}} color="primary"/>
      <Typography gutterBottom variant="h3">
        Your basket is empty.
      </Typography>

      <Button fullWidth component={Link} to="/catalog">
        Go back to shop
      </Button>
    </Paper>
  )

  return (
    <div>BasketPage</div>
  )
}
export default BasketPage

