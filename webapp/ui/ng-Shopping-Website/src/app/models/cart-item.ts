import { Product } from './product';

export interface CartItem {
  id: number;
  quantity: number;
  price: number;
  createdAt: string;
  product: Product;
}
