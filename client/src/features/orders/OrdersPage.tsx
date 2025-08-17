import { useNavigate } from "react-router-dom";
import { useFetchOrdersQuery } from "./orderApi"
import { Chip, Container, Paper, Typography } from "@mui/material";
import { currencyFormat, formatDateString, parseOrderStatus } from "../../lib/util";
import CircularProgressScreen from "../../app/shared/components/CircularProgressScreen";
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from "@mui/x-data-grid";


export const OrdersPage = () => {
  const { data: orders, isLoading } = useFetchOrdersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const navigate = useNavigate();

  if (isLoading) return <CircularProgressScreen />

  if (!orders) return <Typography variant="h5">No orders available</Typography>

  const columns: GridColDef<(typeof orders)[number]>[] = [
    { 
      field: 'id', 
      headerName: 'Order', 
      flex: 0.5,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => `# ${params.value}`,
    },
    {
      field: 'orderDate',
      headerName: 'Order Date',
      flex: 1,
      valueGetter: (value) => formatDateString(value),
    },
    {
      field: 'total',
      headerName: 'Total',
      flex: 1,
      valueGetter: (value) => currencyFormat(value),
    },

    {
      field: 'orderStatus',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => (
        <Chip
          color={
            params.value === "Pending" 
            ? "warning"
            : params.value === "PaymentFailed" || params.value === "PaymentMismatch"
            ? "error"
            : params.value === "PaymentReceived"
            ? "success"
            : "default"
          }
          label={parseOrderStatus(params.value)}
        />),
    }
  ];


  return (
    <Container maxWidth="md" sx={{ mb: 2 }}>
      <Typography variant="h5" align="center" gutterBottom>
        My Orders
      </Typography>

      <Paper sx={{ borderRadius: 3, p: 2, mt: 2 }}>
        <DataGrid 
          rows={orders}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5,10,15]}
          onRowClick={(r) => navigate(`/orders/${r.row.id}`)}
        />
      </Paper>

    </Container>
  )
}