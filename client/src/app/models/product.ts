export type Product = {  // type vs interface diff is small, type is more flexible
  id: number
  name: string
  description: string
  price: number
  pictureUrl: string
  brand: string
  type: string
  quantityInStock: number
}