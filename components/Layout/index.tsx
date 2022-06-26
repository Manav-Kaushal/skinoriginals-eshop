import dynamic from "next/dynamic";
import Head from "next/head";
import { ReactNode } from "react";
import { Footer } from "../Footer/index";
import { Header } from "../Header/index";

interface LayoutInterface {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutInterface) => {
  return (
    <div suppressHydrationWarning>
      <Head>
        <link href="/favicon.ico" type="image/x-icon" />
      </Head>
      <Header />
      {children}
      <Footer />
    </div>
  );
};
