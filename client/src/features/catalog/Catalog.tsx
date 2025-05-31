import type { Product } from "../../app/models/product"

interface Props {
  productListing: Product[],
  addProduct: () => void,
}


const Catalog = ({
  productListing,
  addProduct,
}: Props) => {

  return (
    <>
      <ul>
        {productListing.map((item, index) => 
          (
            <li key={`${item.name}-${index}`}>{item.name} - {item.price}</li>
          ))}
      </ul>

      <button
        onClick={addProduct}
      >
        Add Product
      </button>
    </>
  )
}

export default Catalog