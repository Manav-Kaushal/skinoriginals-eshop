import { Button } from "@components/Button";
import { company } from "@utils/config";
import { classNames, convertToINR } from "@utils/helpers";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineHeart, HiStar } from "react-icons/hi";
import ReactImageGallery from "react-image-gallery";

const Slug = ({ addToCart, product }) => {
  const [productImages, setProductImages] = useState([]);
  useEffect(() => {
    setProductImages(
      product.images.data.map((image) => {
        return {
          ...image,
          original: image.attributes.url,
          thumbnail: image.attributes.formats.thumbnail.url,
        };
      })
    );
  }, []);

  return (
    <>
      <NextSeo
        title={product.title}
        description={product.shortDescription}
        openGraph={{
          url: `${company.url}/${product.url}`,
          title: product.title,
          description: product.shortDescription,
          images: [{ url: product.images.data[0].attributes.url }],
          site_name: company.name,
        }}
      />
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
            {/* <div className="relative aspect-1 border rounded-lg">
              <Image
                src={product.images.data[0].attributes.url}
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
              />
            </div> */}
            <div>
              <ReactImageGallery
                items={productImages}
                showPlayButton={false}
                thumbnailPosition="left"
              />
            </div>

            {/* Product info */}
            <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
              <h3 className="capitalize mb-2 text-gray-400">{company.name}</h3>
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                {product.title}
              </h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl text-gray-900">
                  {convertToINR(product.price)}
                </p>
              </div>

              {/* Reviews */}
              {Object.keys(product.reviews).length !== 0 && (
                <div className="mt-3">
                  <h3 className="sr-only">Reviews</h3>
                  <div className="flex items-center">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <HiStar
                            key={rating}
                            className={classNames(
                              product.reviews.rating > rating
                                ? "text-primary"
                                : "text-gray-300",
                              "h-5 w-5 flex-shrink-0"
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="text-gray-400">
                        ({product.reviews.count} reviews)
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>

                <div
                  className="text-base text-gray-700 space-y-6"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>

              <form className="mt-6">
                <div className="mt-10 flex sm:flex-col1 space-x-4">
                  <Link href="/checkout" passHref>
                    <Button type="submit" variant="secondary" size="large">
                      Buy Now
                    </Button>
                  </Link>

                  <Button
                    type="button"
                    variant="secondary"
                    size="large"
                    onClick={() => addToCart(product, 1)}
                  >
                    Add to bag
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    className="py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                  >
                    <HiOutlineHeart
                      className="h-6 w-6 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Add to favorites</span>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { query, resolvedUrl } = context;
  const slug = query.slug;
  const endPoint = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products?filters[slug]=${slug}&populate=*`;
  const res = await fetch(endPoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
    },
  });
  const product = await res.json();
  return {
    props: {
      product: {
        ...product.data[0].attributes,
        id: product.data[0].id,
        url: resolvedUrl,
      },
    },
  };
}

export default Slug;
