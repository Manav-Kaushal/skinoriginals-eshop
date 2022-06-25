import { Button } from "@components/Button";
import { EmptyCart } from "@components/EmptyCart";
import { useShoppingCart } from "@context/ShoppingCartContext";
import { company } from "@utils/config";
import { convertToINR, reducer } from "@utils/helpers";
import { Tooltip } from "antd";
import { NextSeo } from "next-seo";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";

const Checkout = () => {
  const { cartItems, removeFromCart } = useShoppingCart();

  const [subTotal, setSubTotal] = useState<number>(0);
  const [shippingCharge, setShippingCharge] = useState<number>(50);
  const [total, setTotal] = useState<number>(0);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [form, setForm] = useState({
    address: "",
    city: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    postalCode: "",
    region: "",
  });

  useEffect(() => {
    let subTotalCal = 0;
    for (let index = 0; index < cartItems.length; index++) {
      subTotalCal = subTotalCal + cartItems[index].price;
    }
    if (subTotalCal > 799) {
      setShippingCharge(0);
    } else {
      setShippingCharge(50);
    }
    setSubTotal(subTotalCal);
    setTotal(subTotalCal + shippingCharge);
  }, [cartItems]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    setIsFormValid(
      !form.firstName ||
        !form.lastName ||
        !form.email ||
        !form.phone ||
        !form.address ||
        !form.city ||
        !form.region ||
        !form.postalCode
    );
  }, [form]);

  async function initiatePayment() {
    let orderId = "OID-" + Math.floor(1000000 * Math.random());
    const endPoint = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/orders/pretransaction`;
    const res = await fetch(endPoint, {
      method: "POST",
      body: JSON.stringify({
        ...form,
        orderId: orderId,
        amount: total,
        cart: reducer(cartItems, ["id", "sku", "slug", "title", "price"]),
      }),
    });
    const data = await res.json();

    let config = {
      root: "",
      flow: "DEFAULT",
      data: {
        orderId: orderId /* update order id */,
        token: data.body.txnToken /* update token value */,
        tokenType: "TXN_TOKEN",
        amount: total /* update amount */,
      },
      handler: {
        notifyMerchant: function (eventName: any, data: any) {
          console.log("notifyMerchant handler function called");
          console.log("eventName => ", eventName);
          console.log("data => ", data);
        },
      },
    };

    if (window.Paytm && window.Paytm.CheckoutJS) {
      // initialze configuration using init method
      window.Paytm.CheckoutJS.init(config)
        .then(function onSuccess() {
          // after successfully updating configuration, invoke JS Checkout
          window.Paytm.CheckoutJS.invoke();
        })
        .catch(function onError(error: any) {
          console.log("error => ", error);
        });
    }
  }

  return (
    <>
      <NextSeo title={`Checkout | ${company.name}`} />
      <Script
        id="paytm"
        type="application/javascript"
        crossOrigin="anonymous"
        src={`https://securegw.paytm.in/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_MID}.js`}
      />

      {cartItems.length ? (
        <div className="bg-white">
          <div className="relative grid grid-cols-1 gap-x-16 max-w-7xl mx-auto lg:px-8 lg:grid-cols-2 lg:pt-16">
            <h1 className="sr-only">Checkout</h1>

            <section
              aria-labelledby="summary-heading"
              className="text-gray-800 py-12 md:px-10 lg:max-w-lg lg:w-full lg:mx-auto lg:px-0 lg:pt-0 lg:pb-24 lg:row-start-1 lg:col-start-2 order-2"
            >
              <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0 sticky top-40 ">
                <h2 id="summary-heading" className="sr-only">
                  Order summary
                </h2>

                <dl>
                  <h3
                    id="contact-info-heading"
                    className="text-lg font-bold text-gray-900"
                  >
                    Order summary
                  </h3>
                </dl>

                <ul
                  role="list"
                  className="text-sm font-medium divide-y divide-gray-800 divide-opacity-10"
                >
                  {cartItems.map((product) => (
                    <li
                      key={product.id}
                      className="flex items-start py-6 space-x-4 group"
                    >
                      <Link href={`/product-view/${product.slug}`} passHref>
                        <div className="relative aspect-1 w-20 h-20 rounded-md border border-gray-300 cursor-pointer">
                          <Image
                            src={product.images.data[0].attributes.url}
                            alt={product.title}
                            layout="fill"
                            objectFit="contain"
                            className="flex-none rounded-md object-center"
                          />
                        </div>
                      </Link>
                      <div className="flex-auto space-y-1">
                        <h2 className="text-gray-800 line-clamp-2 max-w-[175px]">
                          {product.title}
                        </h2>
                        <div>
                          <RiDeleteBinLine
                            className="w-5 h-5 text-gray-500 hover:text-red-400 transition-200 cursor-pointer"
                            onClick={() => {
                              removeFromCart(product.id);
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex-auto">
                        <p>{product.netQuantity || ""}</p>
                      </div>
                      <div className="flex-auto">
                        <h2 className="text-gray-800">{product.qty}</h2>
                      </div>
                      <p className="flex-none text-base font-medium text-gray-800">
                        {convertToINR(product.price)}
                      </p>
                    </li>
                  ))}
                </ul>

                <dl className="text-sm font-medium space-y-6 border-t border-gray-800 border-opacity-10 pt-6">
                  <div className="flex items-center justify-between text-gray-500">
                    <dt className="font-semibold">Subtotal</dt>
                    <dd>{convertToINR(subTotal)}</dd>
                  </div>

                  <div className="flex items-center justify-between text-gray-500">
                    <dt className="font-semibold">
                      Shipping <small>(All Over India)</small>{" "}
                      <Tooltip
                        title="Free shipping on orders above ₹799.00!"
                        placement="right"
                      >
                        <HiInformationCircle className="w-4 h-4 inline-block" />
                      </Tooltip>{" "}
                    </dt>
                    <dd>{convertToINR(shippingCharge)}</dd>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-800 border-opacity-10 text-gray-800 pt-6 font-bold">
                    <dt className="text-base font-semibold">Total</dt>
                    <dd className="text-base">{convertToINR(total)}</dd>
                  </div>

                  <div className="mt-10 flex justify-end pt-4">
                    <a onClick={() => initiatePayment()}>
                      <Button
                        type="submit"
                        variant="primary"
                        size="normal"
                        className="w-full"
                        disabled={isFormValid}
                      >
                        Pay now
                      </Button>
                    </a>
                  </div>
                </dl>
              </div>
            </section>

            <section
              aria-labelledby="payment-and-shipping-heading"
              className="py-16 lg:max-w-lg lg:w-full lg:mx-auto lg:pt-0 lg:pb-24 lg:row-start-1 lg:col-start-1 order-1"
            >
              <h2 id="payment-and-shipping-heading" className="sr-only">
                Payment and shipping details
              </h2>

              <form>
                <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
                  <div>
                    <h3
                      id="contact-info-heading"
                      className="text-lg font-bold text-gray-900"
                    >
                      Contact information
                    </h3>

                    <div className="mt-6 flex space-x-4">
                      <div className="flex-1">
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            onChange={handleChange}
                            value={form.firstName}
                            autoComplete="off"
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <label
                          htmlFor="lastName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            onChange={handleChange}
                            value={form.lastName}
                            autoComplete="off"
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex space-x-4">
                      <div className="flex-1">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email address <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={handleChange}
                            value={form.email}
                            autoComplete="email"
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex-1">
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Phone <span className="text-red-500">*</span>
                          </label>
                          <div className="mt-1">
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              onChange={handleChange}
                              value={form.phone}
                              autoComplete="tel"
                              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10">
                    <h3 className="text-lg font-bold text-gray-900">
                      Shipping address
                    </h3>

                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Address <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="address"
                            name="address"
                            onChange={handleChange}
                            value={form.address}
                            autoComplete="street-address"
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium text-gray-700"
                        >
                          City <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="city"
                            name="city"
                            onChange={handleChange}
                            value={form.city}
                            autoComplete="address-level2"
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="region"
                          className="block text-sm font-medium text-gray-700"
                        >
                          State / Province{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="region"
                            name="region"
                            onChange={handleChange}
                            value={form.region}
                            autoComplete="address-level1"
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="postalCode"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Postal code <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="postalCode"
                            name="postalCode"
                            onChange={handleChange}
                            value={form.postalCode}
                            autoComplete="postal-code"
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </section>
          </div>
        </div>
      ) : (
        <EmptyCart />
      )}
    </>
  );
};

export default Checkout;
