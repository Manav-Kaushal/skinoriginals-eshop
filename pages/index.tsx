import Hero from "@sections/home/Hero";
import { company } from "@utils/config";
import { collections, testimonials } from "@utils/Mocks/mockData";
import { NextSeo } from "next-seo";

const Home = () => {
  return (
    <div className="bg-white">
      <NextSeo title={`${company.name} | Buy Best SkinCare Products Online!`} />
      <main>
        {/* Hero */}
        <Hero />
        {/* Trending products */}
        {/* <section aria-labelledby="trending-heading" className="bg-white">
          <div className="py-16 sm:py-24 lg:max-w-7xl lg:mx-auto lg:py-32 lg:px-8">
            <div className="px-4 flex items-center justify-between sm:px-6 lg:px-0">
              <h2
                id="trending-heading"
                className="text-2xl font-extrabold tracking-tight text-gray-900"
              >
                Trending products
              </h2>
              <a
                href="#"
                className="hidden sm:block text-sm font-semibold text-indigo-600 hover:text-indigo-500"
              >
                See everything<span aria-hidden="true"> &rarr;</span>
              </a>
            </div>

            <div className="mt-8 relative">
              <div className="relative w-full overflow-x-auto">
                <div className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:space-x-0 lg:grid lg:grid-cols-4 lg:gap-x-8">
                  {trendingProducts.map((product) => (
                    <div
                      key={product.id}
                      className="w-64 inline-flex flex-col text-center lg:w-auto cursor-pointer"
                    >
                      <div className="group relative ">
                        <div className="w-full bg-gray-200 rounded-md overflow-hidden aspect-w-1 aspect-h-1">
                          <Image
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-center object-cover group-hover:opacity-75"
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                        <div className="mt-6">
                          <p className="text-sm text-gray-500">
                            {product.color}
                          </p>
                          <h3 className="mt-1 font-semibold text-gray-900 line-clamp-1">
                            <a href={product.href}>
                              <span className="absolute inset-0" />
                              {product.title}
                            </a>
                          </h3>
                          <p className="mt-1 text-gray-900">{product.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 px-4 sm:hidden">
              <a
                href="#"
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
              >
                See everything<span aria-hidden="true"> &rarr;</span>
              </a>
            </div>
          </div>
        </section> */}

        {/* Collections */}
        <section aria-labelledby="collections-heading" className="bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto py-16 lg:max-w-none">
              <h2
                id="collections-heading"
                className="text-2xl font-extrabold text-gray-900"
              >
                Collections
              </h2>

              <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6">
                {collections.map((collection) => (
                  <div key={collection.name} className="group relative">
                    <div className="relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                      <img
                        src={collection.imageSrc}
                        alt={collection.imageAlt}
                        className="w-full h-full object-center object-cover"
                      />
                    </div>
                    <h3 className="mt-6 text-sm text-gray-500">
                      <a href={collection.href}>
                        <span className="absolute inset-0" />
                        {collection.name}
                      </a>
                    </h3>
                    <p className="text-base font-semibold text-gray-900">
                      {collection.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sale and testimonials */}
        <div className="relative overflow-hidden">
          {/* Decorative background image and gradient */}
          <div aria-hidden="true" className="absolute inset-0">
            <div className="absolute inset-0 max-w-7xl mx-auto overflow-hidden xl:px-8">
              <img
                src="https://tailwindui.com/img/ecommerce-images/home-page-02-sale-full-width.jpg"
                alt=""
                className="w-full h-full object-center object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gray-400 bg-opacity-75" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-gray-200" />
          </div>

          {/* Sale */}
          <section
            aria-labelledby="sale-heading"
            className="relative max-w-7xl mx-auto pt-32 px-4 flex flex-col items-center text-center sm:px-6 lg:px-8"
          >
            <div className="max-w-2xl mx-auto lg:max-w-none">
              <h2
                id="sale-heading"
                className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
              >
                Get 25% off during our one-time sale
              </h2>
              <p className="mt-4 max-w-xl mx-auto text-xl text-gray-600">
                Most of our products are limited releases that won&apos;t come
                back. Get your favorite items while they&apos;re in stock.
              </p>
              <a
                href="#"
                className="mt-6 inline-block w-full bg-gray-900 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-gray-800 sm:w-auto"
              >
                Get access to our one-time sale
              </a>
            </div>
          </section>

          {/* Testimonials */}
          <section
            aria-labelledby="testimonial-heading"
            className="relative py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:py-32 lg:px-8"
          >
            <div className="max-w-2xl mx-auto lg:max-w-none">
              <h2
                id="testimonial-heading"
                className="text-2xl font-extrabold tracking-tight text-gray-900"
              >
                What are people saying?
              </h2>

              <div className="mt-16 space-y-16 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
                {testimonials.map((testimonial) => (
                  <blockquote key={testimonial.id} className="sm:flex lg:block">
                    <svg
                      width={24}
                      height={18}
                      viewBox="0 0 24 18"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      className="flex-shrink-0 text-gray-300"
                    >
                      <path
                        d="M0 18h8.7v-5.555c-.024-3.906 1.113-6.841 2.892-9.68L6.452 0C3.188 2.644-.026 7.86 0 12.469V18zm12.408 0h8.7v-5.555C21.083 8.539 22.22 5.604 24 2.765L18.859 0c-3.263 2.644-6.476 7.86-6.451 12.469V18z"
                        fill="currentColor"
                      />
                    </svg>
                    <div className="mt-8 sm:mt-0 sm:ml-6 lg:mt-10 lg:ml-0">
                      <p className="text-lg text-gray-600">
                        {testimonial.quote}
                      </p>
                      <cite className="mt-4 block font-semibold not-italic text-gray-900">
                        {testimonial.attribution}
                      </cite>
                    </div>
                  </blockquote>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;
