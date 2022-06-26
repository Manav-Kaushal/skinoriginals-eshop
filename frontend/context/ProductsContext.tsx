import { CartItemInterface } from "@interfaces/CartInterfaces";
import dayjs from "dayjs";
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
  products: CartItemInterface[];
}

const ProductsContext = createContext({} as ProductsContextInterface);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<CartItemInterface[]>([]);

  async function fetchProducts() {
    setLoading(true);
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
        .then((resolvedData) => {
          if (resolvedData.data.length !== 0) {
            const today = dayjs(new Date());
            const priorDate = today.subtract(2, "days");
            resolvedData = resolvedData.data.map(
              (product: {
                id: number;
                attributes: {
                  newArrival: boolean;
                  createdAt:
                    | string
                    | number
                    | Date
                    | dayjs.Dayjs
                    | null
                    | undefined;
                };
              }) => {
                product.attributes.newArrival =
                  dayjs(product.attributes.createdAt) > priorDate
                    ? true
                    : false;
                return { ...product.attributes, id: product.id };
              }
            );
          }

          setProducts(resolvedData);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!products.length) {
      fetchProducts();
    }
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
