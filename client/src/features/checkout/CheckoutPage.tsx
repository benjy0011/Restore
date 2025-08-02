import { Grid } from "@mui/material"
import OrderSummary from "../../app/shared/components/OrderSummary"
import CheckoutStepper from "./CheckoutStepper"
import { loadStripe, type StripeElementsOptions } from "@stripe/stripe-js"
import {Elements} from '@stripe/react-stripe-js';
import { useFetchBasketQuery } from "../basket/basketApi";
import { useEffect, useMemo, useRef } from "react";
import CircularProgressScreen from "../../app/shared/components/CircularProgressScreen";
import { useCreatePaymentIntentMutation } from "./checkoutApi";
import { useAppSelector } from "../../app/store/store";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const CheckoutPage = () => {
  const { darkMode } = useAppSelector(state => state.ui);
  const { data: basket } = useFetchBasketQuery();
  const [ createPaymentIntent, {isLoading} ] = useCreatePaymentIntentMutation();
  const created = useRef(false); // development trick as useEffect will be exected twice in dev mode

  useEffect(() => {
    if(!created.current) createPaymentIntent();
    created.current = true;
  }, [createPaymentIntent]);

  const options: StripeElementsOptions | undefined = useMemo(() => {
    if (!basket?.clientSecret) return undefined;
    return {
      clientSecret: basket.clientSecret,
      appearance: {
        labels: 'floating',
        theme: darkMode ? 'night' : 'stripe',
        rules: {
          '.Input': {
            lineHeight: "1rem",
          }
        }
      },
    }
  }, [basket?.clientSecret, darkMode]);

  return (
    <Grid container spacing={2}>
      <Grid size={{xs: 12, md: 8 }}>
        {!stripePromise || !options || isLoading ? (
          <CircularProgressScreen />
        ) : (
          <Elements stripe={stripePromise} options={options}>
            <CheckoutStepper />
          </Elements>
        )}
      </Grid>

      <Grid size={{xs: 12, md: 4 }}>
        <OrderSummary />
      </Grid>
    </Grid>
  )
}
export default CheckoutPage