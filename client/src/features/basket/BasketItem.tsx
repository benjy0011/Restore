import { Box, Grid, IconButton, Paper, styled, Typography } from "@mui/material"
import type { BasketItem as IBasketItem } from "../../app/models/basket"
import { Add, Close, Remove } from "@mui/icons-material"

interface Props {
  item: IBasketItem
}

const StyledBasketItemButton = styled(IconButton)(() => ({
  border: '1px solid',
  borderRadius: 4,
  minWidth: 0,
}))

const BasketItem = ({
  item
}: Props) => {


  return (
    <Paper
      sx={{
        height: 140,
        borderRadius: 3,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2
      }}
    >
      <Box
        display='flex'
        alignItems='center'
      >
        <Box
          component={'img'}
          src={item.pictureUrl}
          alt={item.name}
          sx={{
            width: 100,
            height: 100,
            objectFit: "cover",
            borderRadius: '4px',
            mr: 8,
            ml: 4,
          }}
        />

        <Box 
          display='flex'
          flexDirection='column'
          gap={1}
        >
          <Typography variant="h6">{item.name}</Typography>

          <Box
            display='flex'
            alignItems='center'
            gap={3}
          >
            <Typography 
              sx={{
                fontSize: '1.1rem'
              }}
            >
              ${(item.price / 100).toFixed(2)} &#xd7; {item.quantity}
            </Typography>

            <Typography
              color='primary'
              sx={{
                fontSize: '1.1rem'
              }}
            >
              ${(item.price / 100 * item.quantity).toFixed(2)}
            </Typography>
          </Box>

          <Grid container 
            spacing={2}
            alignItems='center'
          >
            <StyledBasketItemButton
              color='error'
              size='small'
            >
              <Remove />
            </StyledBasketItemButton>

            <Typography variant="h6">{item.quantity}</Typography>

            <StyledBasketItemButton
              color='success'
              size='small'
            >
              <Add />
            </StyledBasketItemButton>
          </Grid>

        </Box>

      </Box>

      <StyledBasketItemButton
        size="small"
        color="error"
        sx={{
          alignSelf: 'start',
          mr: 1,
          mt: 1,
        }}
      >
        <Close />
      </StyledBasketItemButton>
    </Paper>
  )
}
export default BasketItem