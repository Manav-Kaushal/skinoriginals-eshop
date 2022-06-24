import { LoadingOutlined } from "@ant-design/icons";
import { ProductCard } from "@components/ProductCard";
import SidebarFilters from "@sections/shop/SidebarFilters";
import { company } from "@utils/config";
import { Empty, Spin } from "antd";
import dayjs from "dayjs";
import Head from "next/head";
import qs from "qs";
import { useEffect, useState } from "react";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Shop = ({ products }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(products);
  const [filters, setFilters] = useState({
    category: [],
    price: [],
  });

  useEffect(() => {}, []);

  const getProducts = async (filters) => {
    setLoading(true);
    const query = qs.stringify(
      {
        filters: {
          category: {
            $containsi: filters.category,
          },
        },
      },
      {
        encodeValuesOnly: true, // prettify url
      }
    );
    const endPoint = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products?${
      query ? `${query}&` : ""
    }populate=*`;
    try {
      const res = await fetch(endPoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
        },
      });
      let products = await res.json();

      // Check if new arrival
      if (products.data.length !== 0) {
        const today = dayjs(new Date());
        const priorDate = today.subtract(2, "days");
        products = products.data.map((product) => {
          product.attributes.newArrival =
            dayjs(product.attributes.createdAt) > priorDate ? true : false;
          return { ...product };
        });
      }
      setData(products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilters = (filter, section) => {
    filters[section] = filter;
    setFilters(filters);
    getProducts(filters);
  };

  console.log(Object.keys(data).length);
  return (
    <>
      <Head>
        <title>Shop Premium Skincare Products | {company.name}</title>
        <meta
          name="description"
          content="Shop from our premium range of highly curated products to gift your skin the ever lasting smoothness and glow."
        />
        <meta
          name="keywords"
          content="shop, premium products, skincare, premium skincare"
        />
      </Head>
      <div>
        <main className="max-w-2xl mx-auto px-4 lg:max-w-7xl lg:px-8">
          <div className="pt-12 pb-24 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
            <SidebarFilters
              handleFilters={(filters) => handleFilters(filters, "category")}
            />
            <section
              aria-labelledby="product-heading"
              className="mt-6 lg:mt-0 lg:col-span-2 xl:col-span-3"
            >
              {loading ? (
                <div className="flex items-center justify-center min-h-[20vh]">
                  <Spin indicator={antIcon} />
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {Object.keys(data).length !== 0 ? (
                    data.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))
                  ) : (
                    <Empty />
                  )}
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const endPoint = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products?populate=*`;
  const res = await fetch(endPoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
    },
  });
  let products = await res.json();

  // Check if new arrival
  if (products.data.length !== 0) {
    const today = dayjs(new Date());
    const priorDate = today.subtract(2, "days");
    products = products.data.map((product) => {
      product.attributes.newArrival =
        dayjs(product.attributes.createdAt) > priorDate ? true : false;
      return { ...product };
    });
  }

  return {
    props: { products },
  };
}

export default Shop;
