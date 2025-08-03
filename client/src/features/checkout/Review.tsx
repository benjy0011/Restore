import { Box, Divider, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { currencyFormat } from "../../lib/util";
import type { ConfirmationToken } from "@stripe/stripe-js";
import { useBasket } from "../../lib/hooks/useBasket";

type Props = {
  confirmationToken: ConfirmationToken | null;
}

export const Review = ({
  confirmationToken
}: Props) => {
  const { basket } = useBasket();

  const addressString = (): string => {
    if(!confirmationToken?.shipping) return "";

    const {name, address} = confirmationToken.shipping;

    return `${name}, ${address?.line1}, ${address?.line2 ? `${address.line2}, ` : ''}${address?.city}, ${address?.state}, ${address?.postal_code}, ${address?.country}`
  }

  const paymentString = (): string => {
    if (!confirmationToken?.payment_method_preview.card) return '';

    const { card } = confirmationToken.payment_method_preview;

    return `${card.brand.toUpperCase()}, **** **** **** ${card.last4}, Exp: ${card.exp_month}/${card.exp_year}`;
  }

  return (
    <Box width='100%'>
      <Box>
        <Typography
          variant="h6"
          fontWeight="bold"
        >
          Billing and delivery information
        </Typography>

        <dl>
          <Typography component='dt' fontWeight='medium'>
            Shipping address
          </Typography>
          <Typography component='dd' mt={1} color='textSecondary'>
            {addressString()}
          </Typography>

          <Typography component='dt' fontWeight='medium' mt={2}>
            Payment details
          </Typography>
          <Typography component='dd' mt={1} color='textSecondary'>
            {paymentString()}
          </Typography>
        </dl>
      </Box>
      
      <Box mt={6} mx='auto'>
        <Divider />

        <TableContainer>
          <Table>
            <TableBody>
              {basket?.items.map((item) => (
                <TableRow 
                  key={item.productId} 
                  sx={{
                    borderBottom: '1px solid rgba(224, 224, 224, 1'
                  }}
                >
                  <TableCell sx={{ py: 4 }}>
                    <Box 
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 3
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
                      <Typography>
                        {item.name}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell
                    align='center'
                    sx={{
                      p: 4
                    }}
                  >
                    &times;{item.quantity}
                  </TableCell>

                  <TableCell
                    align='right'
                    sx={{
                      p: 4
                    }}
                  >
                    {currencyFormat(item.price)}
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>

  )
}