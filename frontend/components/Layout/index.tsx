import React, { ReactNode } from "react";
import { Header } from "../Header/index";
import { Footer } from "../Footer/index";
import { CartItemInterface } from "@interfaces/CartInterfaces";

interface LayoutInterface {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutInterface) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
