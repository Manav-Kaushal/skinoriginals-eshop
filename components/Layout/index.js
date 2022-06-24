import React from "react";
import { Header } from "../Header/index";
import { Footer } from "../Footer/index";

export const Layout = ({ cart, children }) => {
  return (
    <>
      <Header cart={cart} />
      {children}
      <Footer />
    </>
  );
};
