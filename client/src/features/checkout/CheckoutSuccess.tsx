import { useLocation } from "react-router-dom"
import type { Order } from "../../app/models/order";
import { Typography } from "@mui/material";

export const CheckoutSuccess = () => {
  const { state } = useLocation();
  const order = state as Order;

  return (
    <Typography variant="h5">
      {JSON.stringify(order, null, 2)}
    </Typography>
  )
}