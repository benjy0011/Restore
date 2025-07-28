import { Grid } from "@mui/material"
import OrderSummary from "../../app/shared/components/OrderSummary"
import CheckoutStepper from "./CheckoutStepper"

const CheckoutPage = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={{xs: 12, md: 8 }}>
        <CheckoutStepper />
      </Grid>

      <Grid size={{xs: 12, md: 4 }}>
        <OrderSummary />
      </Grid>
    </Grid>
  )
}
export default CheckoutPage