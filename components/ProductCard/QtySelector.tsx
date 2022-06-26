import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
import { CartItemInterface } from "../../Interfaces/CartInterfaces";

interface qtySelectorInterface {
  qty: number;
  increaseItemQty: (product: CartItemInterface) => void;
  decreaseItemQty: (id: number) => void;
  product: CartItemInterface;
  checkout?: boolean;
}

const QtySelector = ({
  qty,
  increaseItemQty,
  decreaseItemQty,
  product,
  checkout,
}: qtySelectorInterface) => {
  return (
    <div className="flex items-center justify-center space-x-4 select-none">
      <HiOutlineMinus
        className={`border p-1 hover:shadow-lg transition duration-200 active:shadow-sm active:bg-red-100 rounded-md cursor-pointer ${
          checkout ? "w-6 h-6" : "w-8 h-8"
        }`}
        onClick={() => decreaseItemQty(product.id)}
      />
      <span
        className={`text-gray-900 ${
          checkout ? "text-base" : "text-lg font-semibold"
        }`}
      >
        {qty}
      </span>
      <HiOutlinePlus
        className={`border p-1 hover:shadow-lg transition duration-200 active:shadow-sm active:bg-green-100 rounded-md cursor-pointer ${
          checkout ? "w-6 h-6" : "w-8 h-8"
        }`}
        onClick={() => increaseItemQty(product)}
      />
    </div>
  );
};

export default QtySelector;
