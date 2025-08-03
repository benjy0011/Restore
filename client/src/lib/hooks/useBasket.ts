import { useMemo } from "react";
import { useClearBasketMutation, useFetchBasketQuery } from "../../features/basket/basketApi";
import type { BasketItem } from "../../app/models/basket";

export const useBasket = () => {
  const { data: basket } = useFetchBasketQuery();
  const [ clearBasket ] = useClearBasketMutation();

  const subtotal = useMemo(
    (): number =>
      basket?.items.reduce(
        (sum: number, item: BasketItem) => (sum += item.price * item.quantity),
        0
      ) ?? 0,
    [basket]
  );
  const deliveryFee = useMemo(
    (): number => (subtotal > 10000 ? 0 : 5000),
    [subtotal]
  );
  const total = useMemo(
    (): number => subtotal + deliveryFee,
    [subtotal, deliveryFee]
  );

  return {
    basket,
    subtotal,
    deliveryFee,
    total,
    clearBasket,
  }
}