import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import CircularProgressScreen from "../../app/shared/components/CircularProgressScreen";
import { useFetchBasketQuery } from "./basketApi";
import { Link } from "react-router-dom";
import { ProductionQuantityLimits } from "@mui/icons-material";
import BasketItem from "./BasketItem";
import OrderSummary from "../../app/shared/components/OrderSummary";

const BasketPage = () => {
  const { data, isLoading } = useFetchBasketQuery();

  if (isLoading) return <CircularProgressScreen />;

  if (!data || data.items.length === 0)
    return (
      <Paper
        sx={{
          height: 400,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 6,
          gap: 4,
        }}
      >
        <ProductionQuantityLimits sx={{ fontSize: 100 }} color="primary" />
        <Typography gutterBottom variant="h3">
          Your basket is empty.
        </Typography>

        <Button fullWidth component={Link} to="/catalog">
          Go back to shop
        </Button>
      </Paper>
    );

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 8 }}>
        {data.items.map((item) => (
          <BasketItem item={item} key={item.productId} />
        ))}
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <Box 
          sx={{
            position: 'sticky',
            top: { xs: 0, md: 70 },  // adjust to toolbar height
            alignSelf: 'flex-start',
          }}
        >
          <OrderSummary />
        </Box>
      </Grid>
    </Grid>
  );
};
export default BasketPage;
