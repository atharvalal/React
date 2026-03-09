export interface ProductRating {
  stars: number;
  count: number;
}

export interface Product {
  id: string;
  image: string;
  name: string;
  priceCents: number;
  rating: ProductRating;
  estimatedDeliveryTimeMs?: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
  deliveryOptionId: string;
  product?: Product;
}

export interface DeliveryOption {
  id: string;
  estimatedDeliveryTimeMs: number;
  priceCents: number;
}

export interface PaymentSummaryData {
  totalItems: number;
  productCostCents: number;
  shippingCostCents: number;
  totalCostBeforeTaxCents: number;
  taxCents: number;
  totalCostCents: number;
}

export interface OrderProduct {
  quantity: number;
  product: Product;
}

export interface Order {
  id: string;
  orderTimeMs: number;
  totalCostCents: number;
  products: OrderProduct[];
}
