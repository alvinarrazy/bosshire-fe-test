import { Cart, Product } from '@/types/product';
import api from './api';

export function getProducts() {
  return api().get<Product[]>('/products');
}

export function getProductById(id: number) {
  return api({ cacheKey: `/products/${id}` }).get<Product[]>(`/products/${id}`);
}

export async function getCartItems(userId: number): Promise<Cart> {
  const res = await api().get<Cart>(`/carts/${userId}`);

  const productsData = await Promise.all(
    res.data.products.map(async (product) => {
      const { data } = await getProductById(product.id);
      return {
        ...product,
        ...data,
      };
    }),
  );

  return {
    ...res.data,
    products: productsData,
  };
}

export async function setCartItems(
  userId: number,
  products: { id: number; quantity: number }[],
) {
  await api().post<Cart>('/carts', { userId, products });

  return getCartItems(userId);
}
