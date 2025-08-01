import { Box, Divider, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useFetchBasketQuery } from "../basket/basketApi"
import { currencyFormat } from "../../lib/util";


export const Review = () => {
  const { data: basket } = useFetchBasketQuery(); // getting from cache if fetched from other component before

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
            address goes here
          </Typography>

          <Typography component='dt' fontWeight='medium'>
            Payment details
          </Typography>
          <Typography component='dd' mt={1} color='textSecondary'>
            payment details go here
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