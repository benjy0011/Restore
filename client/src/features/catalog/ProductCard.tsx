import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import type { Product } from "../../app/models/product"

interface Props {
  product: Product
}

const ProductCard = ({
  product,
}: Props) => {
  return (
    <Card
      elevation={3}
      sx={{
        width: 280,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <CardMedia
        sx={{
          height: 240,  // 240 px
          backgroundSize: 'cover'
        }}
        image={product.pictureUrl}
        title={product.name}
      />

      <CardContent>
        <Typography 
          gutterBottom
          variant="subtitle2"
          color="secondary"
          textTransform={"uppercase"}
        >
          {product.name}
        </Typography>

        <Typography
          variant="h6"
          color="secondary"
        >
          ${(product.price / 100).toFixed(2)}
        </Typography>
      </CardContent>

      <CardActions
        sx={{
          justifyContent: "space-between"
        }}
      >
        <Button>Add to cart</Button>
        <Button>View</Button>
      </CardActions>
    </Card>
  )
}

export default ProductCard