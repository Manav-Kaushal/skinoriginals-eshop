import { convertToINR } from "@utils/helpers";
import { Tag } from "antd";
import Image from "next/image";
import { CartItemInterface } from "../../Interfaces/CartInterfaces";
import { Button } from "../Button/index";
import Link from "next/link";
import QtySelector from "./QtySelector";

interface ProductCardInterface {
  product: CartItemInterface;
  getItemQty: (id: number) => number;
  increaseItemQty: (product: CartItemInterface) => void;
  decreaseItemQty: (id: number) => void;
}

export const ProductCard = ({
  product,
  getItemQty,
  increaseItemQty,
  decreaseItemQty,
}: ProductCardInterface) => {
  const qty = getItemQty(product.id);

  return (
    <div className="group relative bg-white border border-gray-200 rounded-lg flex flex-col transition-200 shadow-md select-none">
      <Link href={`/product-view/${product.slug}`} passHref>
        <div className="relative aspect-1 bg-gray-200 cursor-pointer">
          <Image
            src={product.images.data[0].attributes.url}
            alt={product.title}
            layout="fill"
            objectFit="contain"
            placeholder="blur"
            blurDataURL={product.images.data[0].attributes.url}
            className="w-full h-full object-center sm:w-full sm:h-full transition-200 group-hover:scale-105"
          />
          {product.newArrival === true && (
            <Tag color="volcano" className="absolute top-2 right-0">
              New
            </Tag>
          )}
        </div>
      </Link>
      <div className="flex-1 p-4 flex flex-col">
        <p className="text-xs text-gray-400 font-semibold uppercase">
          {product.category}
        </p>
        <Link href={`/product-view/${product.slug}`} passHref>
          <h3 className="text-lg font-medium text-gray-900 capitalize m-0 cursor-pointer group-hover:text-blue-500 transition-200">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center justify-between mt-4 h-[40px]">
          <p className="flex-1 text-lg text-gray-900 font-bold">
            {convertToINR(product.price)}
          </p>
          <div>
            {qty === 0 ? (
              <Button
                className="w-full"
                onClick={() => {
                  increaseItemQty(product);
                }}
              >
                Add To Cart
              </Button>
            ) : (
              <QtySelector
                qty={qty}
                increaseItemQty={increaseItemQty}
                decreaseItemQty={decreaseItemQty}
                product={product}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
