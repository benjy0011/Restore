import { Link, useParams } from "react-router-dom"
import { useFetchOrderDetailedQuery } from "./orderApi";
import { Box, Button, Card, Divider, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import CircularProgressScreen from "../../app/shared/components/CircularProgressScreen";
import { currencyFormat, formatAddressString, formatDateString, formatPaymentString } from "../../lib/util";

export const OrderDetailedPage = () => {
  const { id } = useParams();

  const { data: order, isLoading } = useFetchOrderDetailedQuery(+id!);

  if (isLoading) return <CircularProgressScreen />
  if (!order) return <Typography variant="h5">Order not found</Typography>

  return (
    <Card
      sx={{
        p: 2,
        maxWidth: "md",
        mx: "auto",
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" align="center">
          Order summary for #{order.id}
        </Typography>

        <Button component={Link} to="/orders" variant="outlined">
          Back to orders
        </Button>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box>
        <Typography variant="h6" fontWeight="bold">
          Billing & Delivery Information
        </Typography>

        <Box component="dl">
          <Typography component="dt" variant="subtitle1" fontWeight="500">
            Shipping address
          </Typography>
          <Typography component="dd" variant="body2" fontWeight="300">
            {formatAddressString(order.shippingAddress)}
          </Typography>
        </Box>

        <Box component="dl">
          <Typography component="dt" variant="subtitle1" fontWeight="500">
            Payment info
          </Typography>
          <Typography component="dd" variant="body2" fontWeight="300">
            {formatPaymentString(order.paymentSummary)}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box>
        <Typography variant="h6" fontWeight="bold">
          Order Details
        </Typography>

        <Box component="dl">
          <Typography component="dt" variant="subtitle1" fontWeight="500">
            Email address
          </Typography>
          <Typography component="dd" variant="body2" fontWeight="300">
            {order.buyerEmail}
          </Typography>
        </Box>

        <Box component="dl">
          <Typography component="dt" variant="subtitle1" fontWeight="500">
            Order status
          </Typography>
          <Typography component="dd" variant="body2" fontWeight="300">
            {order.orderStatus}
          </Typography>
        </Box>

        <Box component="dl">
          <Typography component="dt" variant="subtitle1" fontWeight="500">
            Order date
          </Typography>
          <Typography component="dd" variant="body2" fontWeight="300">
            {formatDateString(order.orderDate)}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      <TableContainer>
        <Table>
          <TableBody>
            {order?.orderItems.map((item) => (
              <TableRow
                key={item.productId}
                sx={{
                  borderBottom: "1px solid rgba(224, 224, 224, 1",
                }}
              >
                <TableCell sx={{ py: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 3,
                    }}
                  >
                    <img
                      src={item.pictureUrl}
                      alt={item.name}
                      style={{
                        width: 40,
                        height: 40,
                      }}
                    />
                    <Typography>{item.name}</Typography>
                  </Box>
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    p: 4,
                  }}
                >
                  &times;{item.quantity}
                </TableCell>

                <TableCell
                  align="right"
                  sx={{
                    p: 4,
                  }}
                >
                  {currencyFormat(item.price)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box mr={4} ml={2}>
        <Box component="dl" sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography component="dt" variant="subtitle1" fontWeight="500">
            Subtotal
          </Typography>
          <Typography component="dd" variant="body2" fontWeight="300">
            {currencyFormat(order.subtotal)}
          </Typography>
        </Box>

        <Box component="dl" sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography component="dt" variant="subtitle1" fontWeight="500">
            Discount
          </Typography>
          <Typography component="dd" variant="body2" fontWeight="300" color="success">
            {currencyFormat(order.discount)}
          </Typography>
        </Box>

        <Box component="dl" sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography component="dt" variant="subtitle1" fontWeight="500">
            Delivery Fee
          </Typography>
          <Typography component="dd" variant="body2" fontWeight="300">
            {currencyFormat(order.deliveryFee)}
          </Typography>
        </Box>

        <Box component="dl" sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography component="dt" variant="subtitle1" fontWeight="700">
            Total
          </Typography>
          <Typography component="dd" variant="body2" fontWeight="500">
            {currencyFormat(order.total)}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}