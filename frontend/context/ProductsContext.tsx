import { ProductInterface } from "../components/ProductCard/index";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface ProductsContextInterface {
  loading: boolean;
  setLoading: (bool: boolean) => void;
  products: {
    data: ProductInterface[];
    meta?: any;
  };
}

const ProductsContext = createContext({} as ProductsContextInterface);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<any>([]);

  async function fetchProducts() {
    try {
      const endPoint = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products?populate=*`;
      fetch(endPoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
        },
      })
        .then((res) => res.json())
        .then((resolvedData) => setProducts(resolvedData));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ loading, setLoading, products }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProductsContext() {
  return useContext(ProductsContext);
}
