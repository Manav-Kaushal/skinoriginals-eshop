import { convertToINR } from "@utils/helpers";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Tag } from "antd";

export const ProductCard = ({ product }) => {
  return (
    <Link href={`/product-view/${product.attributes.slug}`}>
      <div
        key={product.id}
        className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden transition-200 hover:shadow-md cursor-pointer"
      >
        <div className="relative aspect-1 bg-gray-200">
          <Image
            src={product.attributes.images.data[0].attributes.url}
            alt={product.attributes.title}
            layout="fill"
            objectFit="contain"
            placeholder="blur"
            blurDataURL={product.attributes.images.data[0].attributes.url}
            className="w-full h-full object-center sm:w-full sm:h-full transition-200 group-hover:scale-105"
          />
          {product.attributes.newArrival === true && (
            <Tag color="volcano" className="absolute top-2 right-0">
              New
            </Tag>
          )}
        </div>
        <div className="flex-1 p-4 flex flex-col">
          <p className="text-xs text-gray-400 font-semibold uppercase">
            {product.attributes.category}
          </p>
          <h3 className="text-lg font-medium text-gray-900 capitalize m-0">
            <a href={product.attributes.href}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.attributes.title}
            </a>
          </h3>
          <div className="flex-1 flex flex-col justify-end mt-2">
            <p className="text-lg text-gray-900 mt-2 font-bold">
              {convertToINR(product.attributes.price)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};
