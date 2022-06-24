import { Layout } from "@components/Layout";
import useWindowSize from "@utils/hooks/useWindowSize";
import "antd/dist/antd.css";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import "../styles/globals.css";

export const DeviceContext = React.createContext();

function MyApp({ Component, pageProps }) {
  const [mobile, setMobile] = useState();
  const [cart, setCart] = useState([]);
  const { width } = useWindowSize();

  useEffect(() => {
    if (width < 768) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, [width]);

  function addToCart(item, qty) {
    let tempCart = [...cart];
    for (let index = 0; index < qty; index++) {
      tempCart.push({ ...item, qty: qty });
    }
    setCart(tempCart);
  }
  function removeFromCart(item) {
    let tempCart = [...cart];
    let index = tempCart.indexOf(item);
    tempCart.splice(index, 1);
    setCart(tempCart);
  }
  function clearCart() {
    setCart([]);
  }

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <DeviceContext.Provider value={mobile}>
        <Layout cart={cart}>
          <Component
            cart={cart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
            {...pageProps}
          />
        </Layout>
      </DeviceContext.Provider>
    </>
  );
}

export default MyApp;
