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
interface User {
  username: string;
  password: string;
}

interface AnalyticsElement {
  username: string;
  purchases: number;
  totalMoney: number;
  products: Product[];
}

interface Dictionary<T> {
  [index: string]: T;
}
