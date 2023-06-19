import { useContext, useState } from "react";
import { CartUseContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import SumAndRestProduct from "./SumAndRestProduct";
import { TrashIcon } from "@heroicons/react/24/outline";
import FormCheckout from "../Checkout/FormCheckout";
import { ModeContext } from "../../context/DarkLightModeContext";
const ShoppingCart = () => {
  const { cart, setCart } = CartUseContext();
  const { mode } = useContext(ModeContext);

  const cartTotal = cart.reduce(
    (acc, element) => acc + parseInt(element.precio) * element.quanty,
    0
  );

  const deleteProductCart = (id) => {
    const foundId = cart.find((item) => item.id === id);

    const newCart = cart.filter((element) => {
      return element !== foundId;
    });

    setCart(newCart);
  };
  return (
    <div>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 shadow-xl ">
          <div className="mx-auto max-w-3xl mt-16">
            <header className="text-center">
              <h1 className="text-xl font-bold  sm:text-3xl">Tu Carrito</h1>
            </header>
            {cart.length > 0 ? (
              <>
                {" "}
                <div className="mt-8">
                  <ul className=" bg-white rounded-md p-4 ">
                    {cart?.map((product) => (
                      <li
                        className="flex flex-wrap justify-between "
                        key={product.id}
                      >
                        <img
                          src={product.url}
                          alt=""
                          className="h-16 w-16 rounded object-cover"
                        />
                        <div className="flex items-center justify-center w-full flex-grow pl-4">
                          <div>
                            <h3 className="text-sm text-gray-900">
                              {product.nombre}
                            </h3>

                            <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                              <div>
                                <dt className="inline">Size:</dt>
                                <dd className="inline">XXS</dd>
                              </div>
                            </dl>
                          </div>

                          <div className="flex flex-1 items-center justify-end gap-2 text-black">
                            <div className="flex text-black">
                              <SumAndRestProduct
                                quanty={product.quanty}
                                product={product}
                              />
                            </div>

                            <div>
                              <button
                                onClick={() => deleteProductCart(product.id)}
                                className="text-gray-600 transition hover:border-white text-black bg-white"
                              >
                                <TrashIcon className="w-6 h-6 text-red-600" />
                              </button>
                            </div>
                          </div>

                          <div className="divide-x-4 p-2 font-bold text-black">
                            $ {product.precio * product.quanty}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                    <div className="w-screen max-w-lg space-y-4">
                      <dl className="space-y-0.5 text-sm text-gray-700">
                        <div
                          className={`flex justify-between text-2xl font-medium ${
                            mode === "light" ? "text-gray-800" : "text-white"
                          }`}
                        >
                          <dt>Total</dt>
                          <dd>$ {cartTotal}</dd>
                        </div>
                      </dl>

                      <div className="flex justify-end">
                        <FormCheckout />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col justify-center items-center mt-16">
                <h2 className="text-2xl text-white font-bold p-4">
                  Tu carrito esta vacio
                </h2>

                <Link to="/productos">
                  <button className="bg-red-600  text-white">
                    Agrega productos a tu carrito!
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShoppingCart;
