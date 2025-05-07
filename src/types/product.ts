export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface Cart {
  id: number;
  userId: number;
  products: CartItem[];
}

export interface CartItem extends Product {
  quantity: number;
}
