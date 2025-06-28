export type Basket = {
  basketId: string
  items: BasketItem[]
}

export type BasketItem = {
  productId: number
  name: string
  price: number
  pictureUrl: string
  brand: string
  type: string
  quantity: number
}
