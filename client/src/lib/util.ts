import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import type { OrderStatus, PaymentSummary, ShippingAddress } from "../app/models/order";

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

export const parseOrderStatus = (status: OrderStatus): string => {
  switch (status) {
    case "Pending":
      return "Pending";
    case "PaymentReceived":
      return "Payment Received";
    case "PaymentFailed":
      return "Payment Failed";
    case "PaymentMismatch":
      return "Payment Mismatch";
    default:
      return status;
  }
}

export function handleApiError<T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>,
  fieldNames: Path<T>[],
) {
  const apiError = (error as {message: string}) || {};

  if (apiError.message && typeof apiError.message === "string") {
    const errorArray = apiError.message.split(',');

    errorArray.forEach(e => {
      const matchedField = fieldNames.find(fieldName => 
        e.toLowerCase().includes(fieldName.toString().toLowerCase()));

      if (matchedField) setError(matchedField, { message: e.trim() });
    })
  }
}