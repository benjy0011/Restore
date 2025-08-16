import { useNavigate } from "react-router-dom";
import { useFetchOrdersQuery } from "./orderApi"
import { Chip, Container, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { currencyFormat, formatDateString } from "../../lib/util";
import CircularProgressScreen from "../../app/shared/components/CircularProgressScreen";
import type { OrderStatus } from "../../app/models/order";

export const OrdersPage = () => {
  const { data: orders, isLoading } = useFetchOrdersQuery();
  const navigate = useNavigate();

  const parseOrderStatus = (status: OrderStatus): string => {
    switch (status) {
      case "Pending":
        return "Pending";
      case "PaymentReceived":
        return "Payment Received";
      case "PaymentFailed":
        return "Payment Failed";
      default:
        return status;
    }
  }

  if (isLoading) return <CircularProgressScreen />

  if (!orders) return <Typography variant="h5">No orders available</Typography>

  return (
    <Container maxWidth="md">
      <Typography variant="h5" align="center" gutterBottom>
        My Orders
      </Typography>

      <Paper sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Order</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.map(order => (
              <TableRow
                key={order.id}
                hover
                onClick={() => navigate(`/orders/${order.id}`)}
                sx={{
                  cursor: 'pointer'
                }}
              >
                <TableCell align="center">
                  # {order.id}
                </TableCell>

                <TableCell>
                  {formatDateString(order.orderDate)}
                </TableCell>

                <TableCell>
                  {currencyFormat(order.total)}
                </TableCell>

                <TableCell>
                  <Chip
                    color={
                      order.orderStatus === "Pending" 
                      ? "warning"
                      : order.orderStatus === "PaymentFailed"
                      ? "error"
                      : order.orderStatus === "PaymentReceived"
                      ? "success"
                      : "default"
                    }
                    label={parseOrderStatus(order.orderStatus)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

    </Container>
  )
}