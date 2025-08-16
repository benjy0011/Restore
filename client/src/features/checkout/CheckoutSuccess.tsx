import { Link, useLocation } from "react-router-dom"
import type { Order } from "../../app/models/order";
import { Box, Button, Container, Divider, Paper, Typography } from "@mui/material";
import { currencyFormat, formatDateString } from "../../lib/util";

export const CheckoutSuccess = () => {
  const { state } = useLocation();
  const order = state.data as Order;

  if (!order) return <Typography>Problem accessing the order</Typography>

  const addressString = () => {
    const address = order.shippingAddress;

    return `${address?.name}, ${address?.line1}, ${address?.line2 ? `${address.line2}, ` : ''}${address?.city}, ${address?.state}, ${address?.postal_code}, ${address?.country}`
  }

  const paymentString = () => {
    const card = order.paymentSummary;

    return `${card?.brand.toUpperCase()}, **** **** **** ${card?.last4}, Exp: ${card?.exp_month}/${card?.exp_year}`;
  }

  return (
    <Container maxWidth='md'>
      <>
        <Typography 
          variant="h4"
          gutterBottom
          fontWeight="bold"
        >
          Thanks for your fake order!
        </Typography>

        <Typography
          variant="body1"
          color="textSecondary"
          gutterBottom
        >
          Your order <strong>#{order.id}</strong> will never be processed as this is a fake shop.
        </Typography>

        <Paper 
          elevation={1}
          sx={{
            p: 2,
            mb: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
          }}
        >
          <Box display='flex' justifyContent='space-between'>
            <Typography variant="body2" color="textSecondary">
              Order date
            </Typography>

            <Typography variant="body2" fontWeight="bold">
              {formatDateString(order.orderDate)}
            </Typography>
          </Box>

          <Divider />

          <Box display='flex' justifyContent='space-between'>
            <Typography variant="body2" color="textSecondary">
              Payment method
            </Typography>

            <Typography variant="body2" fontWeight="bold">
              {paymentString()}
            </Typography>
          </Box>

          <Box display='flex' justifyContent='space-between'>
            <Typography variant="body2" color="textSecondary">
              Shipping address
            </Typography>

            <Typography variant="body2" fontWeight="bold">
              {addressString()}
            </Typography>
          </Box>

          <Box display='flex' justifyContent='space-between'>
            <Typography variant="body2" color="textSecondary">
              Amount
            </Typography>

            <Typography variant="body2" fontWeight="bold">
              {currencyFormat(order.total)}
            </Typography>
          </Box>

        </Paper>

        <Box display="flex" justifyContent="start" gap={2}>
          <Button 
            variant="contained"
            color="primary"
            component={Link}
            to={`/orders/${order.id}`}
          >
            View your order
          </Button>

          <Button 
            variant="outlined"
            color="primary"
            component={Link}
            to='/catalog'
          >
            Continue shopping
          </Button>
        </Box>
      </>
    </Container>
  )
}