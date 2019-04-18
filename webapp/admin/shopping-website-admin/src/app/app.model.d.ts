interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  isInStock?: boolean;
  quantity?: number;
  category: string;
  imageUrl: string;
}

interface CartItem {
  id?: number;
  quantity: number;
  price: number;
  createdAt: string;
  product: Product;
  user?: string;
}

interface AnalyticsElement {
  username: string;
  quantity: number;
  totalMoney: number;
  products: Product[];
}

interface Dictionary<T> {
  [index: string]: T;
}
