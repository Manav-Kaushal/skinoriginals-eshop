import { company } from "@utils/config";
import Head from "next/head";
import Link from "next/link";
import React from "react";

const Index = () => {
  return (
    <>
      <Head>
        <title>404 | {company.name}</title>
        <meta
          name="description"
          content="Oops! The page you were looking for is not found! We're still working on the website. Thank you for your time and patience."
        />
        <meta name="keywords" content="404, skin originals, skincare" />
      </Head>
      <div className="h-[75vh] w-full flex flex-col justify-center items-center bg-white">
        <h1 className="text-9xl font-extrabold tracking-widest text-[#1A2238]">
          404
        </h1>
        <div className="bg-primary px-2 text-sm rounded rotate-12 absolute text-white">
          Page Not Found
        </div>
        <button className="mt-5">
          <a className="relative inline-block text-sm font-medium text-primary group hover:text-hover focus:outline-none focus:ring">
            <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-primary group-hover:translate-y-0 group-hover:translate-x-0"></span>
            <Link href="/" passHref>
              <span className="relative block px-8 py-3 bg-white border border-current cursor-pointer">
                Go Home
              </span>
            </Link>
          </a>
        </button>
      </div>
    </>
  );
};

export default Index;
