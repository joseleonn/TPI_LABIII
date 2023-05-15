import { Link, useParams } from "react-router-dom";
import { db } from "../../../firebase/Credentials";
import { getDoc, collection, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProductInfo] = useState(null);

  //funcion para obetener informacion del producto especifio en la base de datos
  const getProductById = async () => {
    const collectionRef = collection(db, "Products");
    const docuRef = doc(collectionRef, productId);
    const snapDoc = await getDoc(docuRef);
    const producto = snapDoc.data();
    console.log(producto);
    return producto;
  };

  useEffect(() => {
    const getProduct = async () => {
      const product = await getProductById(productId);
      setProductInfo(product);
    };
    getProduct();
  }, [productId]);

  return (
    <div className="">
      <section>
        <div className="relative mx-auto max-w-screen-xl px-4 py-8">
          <div className="mt-16">
            <h1 className="text-2xl text-white font-bold lg:text-3xl">
              {product?.nombre}
            </h1>

            <p className="mt-1 text-sm text-gray-500">SKU: #012345</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-4 lg:items-start">
            <div className="lg:col-span-3">
              <div className="relative mt-4 bg-white flex justify-center rounded-md">
                <img
                  alt="Tee"
                  src={product?.url}
                  className="h-200 w-6/12 rounded-xl object-cover lg:h-[540px]"
                />

                {/* <div className="absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center rounded-full bg-black/75 px-3 py-1.5 text-white">
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>

                  <span className="ms-1.5 text-xs"> Hover to zoom </span>
                </div> */}
              </div>

              {/* <ul className="mt-1 flex gap-1">
                <li>
                  <img
                    alt="Tee"
                    src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                    className="h-16 w-16 rounded-md object-cover"
                  />
                </li>

                <li>
                  <img
                    alt="Tee"
                    src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                    className="h-16 w-16 rounded-md object-cover"
                  />
                </li>

                <li>
                  <img
                    alt="Tee"
                    src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                    className="h-16 w-16 rounded-md object-cover"
                  />
                </li>

                <li>
                  <img
                    alt="Tee"
                    src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                    className="h-16 w-16 rounded-md object-cover"
                  />
                </li>
              </ul> */}
            </div>

            <div className="lg:sticky lg:top-0">
              <form className="space-y-4 lg:pt-8">
                {/* <fieldset>
                  <legend className="text-lg font-bold">Color</legend>

                  <div className="mt-2 flex flex-wrap gap-1">
                    <label htmlFor="color_green" className="cursor-pointer">
                      <input
                        type="radio"
                        id="color_green"
                        name="color"
                        className="peer sr-only"
                        required
                      />

                      <span className="block h-6 w-6 rounded-full border border-gray-200 bg-green-700 ring-1 ring-transparent ring-offset-1 peer-required:ring-gray-300"></span>
                    </label>

                    <label htmlFor="color_blue" className="cursor-pointer">
                      <input
                        type="radio"
                        id="color_blue"
                        name="color"
                        className="peer sr-only"
                      />

                      <span className="block h-6 w-6 rounded-full border border-gray-200 bg-blue-700 ring-1 ring-transparent ring-offset-1 peer-required:ring-gray-300"></span>
                    </label>

                    <label htmlFor="color_pink" className="cursor-pointer">
                      <input
                        type="radio"
                        id="color_pink"
                        name="color"
                        className="peer sr-only"
                      />

                      <span className="block h-6 w-6 rounded-full border border-gray-200 bg-pink-700 ring-1 ring-transparent ring-offset-1 peer-required:ring-gray-300"></span>
                    </label>

                    <label htmlFor="color_red" className="cursor-pointer">
                      <input
                        type="radio"
                        id="color_red"
                        name="color"
                        className="peer sr-only"
                      />

                      <span className="block h-6 w-6 rounded-full border border-gray-200 bg-red-700 ring-1 ring-transparent ring-offset-1 peer-required:ring-gray-300"></span>
                    </label>

                    <label htmlFor="color_indigo" className="cursor-pointer">
                      <input
                        type="radio"
                        id="color_indigo"
                        name="color"
                        className="peer sr-only"
                      />

                      <span className="block h-6 w-6 rounded-full border border-gray-200 bg-indigo-700 ring-1 ring-transparent ring-offset-1 peer-required:ring-gray-300"></span>
                    </label>
                  </div>
                </fieldset> */}

                {/* <fieldset>
                  <legend className="text-lg font-bold">Material</legend>

                  <div className="mt-2 flex flex-wrap gap-1">
                    <label htmlFor="material_cotton" className="cursor-pointer">
                      <input
                        type="radio"
                        id="material_cotton"
                        name="material"
                        className="peer sr-only"
                        required
                      />

                      <span className="block rounded-full border border-gray-200 px-3 py-1 text-xs peer-required:bg-gray-100">
                        Cotton
                      </span>
                    </label>

                    <label htmlFor="material_wool" className="cursor-pointer">
                      <input
                        type="radio"
                        id="material_wool"
                        name="material"
                        className="peer sr-only"
                        required
                      />

                      <span className="block rounded-full border border-gray-200 px-3 py-1 text-xs peer-required:bg-gray-100">
                        Wool
                      </span>
                    </label>
                  </div>
                </fieldset> */}

                {/* <div className="rounded border bg-gray-100 p-4">
                  <p className="text-sm">
                    <span className="block">
                      {" "}
                      Pay as low as $3/mo with 0% APR.{" "}
                    </span>

                    <a href="" className="mt-1 inline-block underline">
                      {" "}
                      Find out more{" "}
                    </a>
                  </p>
                </div> */}

                <div>
                  <p className="text-xl text-white font-bold">
                    $ {product?.precio}
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full rounded bg-red-700 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white"
                >
                  Add to cart
                </button>
                <Link
                  type="button"
                  to="/productos"
                  className="w-full rounded border
                  border-gray-300 bg-gray-100 px-6 py-3 text-sm font-bold
                  uppercase tracking-wide"
                >
                  <p className="flex justify-center">Volver</p>
                </Link>
              </form>
            </div>

            <div className="lg:col-span-3">
              <div className="prose max-w-none text-white">
                <p>{product?.descripcion}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
