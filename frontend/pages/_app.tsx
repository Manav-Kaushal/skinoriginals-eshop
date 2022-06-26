import { Layout } from "@components/Layout";
import { ProductsProvider } from "@context/ProductsContext";
import { CartContextProvider } from "@context/ShoppingCartContext";
import useWindowSize from "@utils/hooks/useWindowSize";
import "antd/dist/antd.css";
import Head from "next/head";
import { createContext, useEffect, useState } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import "../styles/globals.css";

const DeviceContext = createContext({});

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  const [mobile, setMobile] = useState<boolean>(false);
  const { width } = useWindowSize();

  useEffect(() => {
    if (width) {
      if (width < 768) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    }
  }, [width]);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <DeviceContext.Provider value={{ mobile }}>
        <CartContextProvider>
          <ProductsProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ProductsProvider>
        </CartContextProvider>
      </DeviceContext.Provider>
    </>
  );
}

export default MyApp;
