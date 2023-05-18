import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CartUseContext } from "../../../context/CartContext";
import { CheckIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";

const ProductList = () => {
  //TRAEMOS LOS PRODUCTOS DESDE CONTEXT
  const { data, addToCart } = CartUseContext();
  const [addCheckMap, setAddCheckMap] = useState(false);

  //CAMBIA EL ICONO DEL CARRITO A UN CHECK MEDIANMTE UN ESTADO
  const handlerAddCheck = (productId) => {
    setAddCheckMap((prevState) => ({
      ...prevState,
      [productId]: !prevState[productId],
    }));

    //LE AGREGA UN TIMEOUT PARA CANCELAR ESE ESTADO Y VOLVER AL INICIAL
    setTimeout(() => {
      setAddCheckMap((prevState) => ({
        ...prevState,
        [productId]: !prevState[productId],
      }));
    }, 1000); // Delay de 1 segundo (1000 milisegundos)
  };

  return (
    <div>
      <section>
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
          <header className="mt-16">
            <h2 className="text-xl font-bold text-white sm:text-3xl flex justify-center">
              Productos
            </h2>
          </header>

          <ul className="grid gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-4 ">
            {data.map((product) => (
              <li className="" key={product.id}>
                <Link
                  to={`/detalleproducto/${product.id}`}
                  className="block overflow-hidden group rounded-md "
                  // onClick={() => selectProduct(product.id)}
                >
                  <div className="flex items-center justify-center bg-white">
                    <img
                      src={product.url}
                      alt=""
                      className=" h-[250px] w-[200px] object-cover transition duration-500 group-hover:scale-105 "
                    />
                  </div>

                  <div className="relative pt-3 bg-gray-700 p-1">
                    <h3 className="text-xl text-white">{product.nombre}</h3>

                    <p className="mt-2">
                      <span className="sr-only"> Regular Price </span>

                      <span className="tracking-wider text-white text-xl">
                        $ {product.precio}
                      </span>
                    </p>
                  </div>
                </Link>

                <button
                  onClick={() => {
                    addToCart(product);
                    handlerAddCheck(product.id);
                  }}
                  className="bg-transparent flex justify-end ml-52 -mt-14 relative border border-white focus:outline-none hover:border-white"
                >
                  {addCheckMap[product.id] ? (
                    <CheckIcon className="h-6 w-6 text-white" />
                  ) : (
                    <ShoppingCartIcon className="h-6 w-6 text-white" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ProductList;
