import dynamic from "next/dynamic";
import { ReactNode } from "react";
import { Footer } from "../Footer/index";
import { Header } from "../Header/index";

interface LayoutInterface {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutInterface) => {
  return (
    <div suppressHydrationWarning>
      <Header />
      {children}
      <Footer />
    </div>
  );
};
