import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import type { Product } from "../../app/models/product"
import { Link } from "react-router-dom"
import { useAddBasketItemMutation } from "../basket/basketApi"

interface Props {
  product: Product
}

const ProductCard = ({
  product,
}: Props) => {

  const [addBasketItem, {isLoading}] = useAddBasketItemMutation();

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
        <Button
          loading={isLoading}
          onClick={() => addBasketItem({productId: product.id, quantity: 1})}
        >
          Add to cart
        </Button>
        <Button component={Link} to={`/catalog/${product.id}`}>View</Button>
      </CardActions>
    </Card>
  )
}

export default ProductCard