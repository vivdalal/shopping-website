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
}

interface User {
  username: string;
  password: string;
}
