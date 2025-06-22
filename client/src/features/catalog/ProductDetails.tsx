import { 
  useState 
} from "react";
import { useParams } from "react-router-dom"
import { Button, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import CircularProgressScreen from "../../components/CircularProgressScreen";
import { useFetchProductDetailQuery } from "./catalogApi";

const ProductDetails = () => {
  const {id} = useParams();
  // const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<string>("0");

  const handleAddQuantity = (): void => {
    setQuantity(prev => String(Number(prev) + 1));
  }

  // useEffect(() => {
  //   fetch(`https://localhost:5001/api/products/${id}`)
  //     .then(response => response.json())
  //     .then(data => setProduct(data))
  //     .catch(error => console.error(error))
  // }, [id])

  const { data: product, isLoading } = useFetchProductDetailQuery(id ? +id : 0);

  if (!product || isLoading) return (
    <CircularProgressScreen />
  )

  const productDetails = [
    {label: 'Name', value: product.name},
    {label: 'Description', value: product.description},
    {label: 'Type', value: product.type},
    {label: 'Brand', value: product.brand},
    {label: 'Quantity in stock', value: product.quantityInStock},
  ]

  return (
    <Grid 
      container 
      spacing={6} 
      maxWidth={'lg'} 
      sx={{ 
        mx: 'auto',
        mb: 2,
      }}
    >
      <Grid size={{ xs: 12 , md: 6}}>
        <img 
          src={product?.pictureUrl} 
          alt={product?.name} 
          style={{ 
            width: '100%',
            borderRadius: "2%" 
          }} 
        />
      </Grid>

      <Grid size={{ xs: 12 , md: 6}}>
        <Typography variant="h3">{product?.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">${(product?.price ?? 0 / 100).toFixed(2)}</Typography>

        <TableContainer>
          <Table
            sx={{
              '& td': {fontSize: '1rem'}
            }}
          >
            <TableBody>
              {productDetails.map(({label, value}, index) => (
                <TableRow key={index}>
                  <TableCell 
                    sx={{fontWeight: 'bold'}}
                  >
                    {label}
                  </TableCell>

                  <TableCell>
                    {value}
                  </TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Grid 
          container 
          spacing={2} 
          marginTop={3}
          sx={{
            alignItems: "stretch"
          }}
        >
          <Grid size={{ xs: 12 , md: 6}}>
            <TextField 
              variant="outlined"
              type="number"
              label="Quantity in cart"
              fullWidth
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              sx={{
                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                  "-webkit-appearance": "none",
                  margin: 0,
                },
                "& input[type=number]": {
                  "-moz-appearance": "textfield",
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12 , md: 6}}>
            <Button
              color="primary"
              size="large"
              variant="contained"
              // fullWidth
              sx={{
                height: "100%",
              }}
              onClick={handleAddQuantity}
            >
              Add to Basket
            </Button>
          </Grid>
        </Grid>
      </Grid>
      
    </Grid>
  )
}
export default ProductDetails