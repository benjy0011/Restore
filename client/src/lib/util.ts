import type { PaymentSummary, ShippingAddress } from "../app/models/order";

export function currencyFormat(amount: number): string {
  return `$ ${(amount / 100).toFixed(2)}`
}

export function filterEmptyValues(values: object) {
  return Object.fromEntries(
    Object.entries(values).filter(
      ([, value]) =>
        value !== "" &&
        value !== null &&
        value !== undefined &&
        value.length !== 0
    )
  );
}


export function formatDateString(dateString: string) {
  const parsed = new Date(dateString);

  if (parsed instanceof Date && !isNaN(parsed.getTime())) {
    return parsed.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  return dateString;
}


export const formatAddressString = (address: ShippingAddress) => {
  return `${address?.name}, ${address?.line1}, ${address?.line2 ? `${address.line2}, ` : ''}${address?.city}, ${address?.state}, ${address?.postal_code}, ${address?.country}`
  }

export const formatPaymentString = (card: PaymentSummary) => {
  return `${card?.brand.toUpperCase()}, **** **** **** ${card?.last4}, Exp: ${card?.exp_month}/${card?.exp_year}`;
}