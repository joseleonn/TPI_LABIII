import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CartUseContext } from "../../../context/CartContext";
import { CheckIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import Filter from "../../Filters/Filter";
import useFilterCategory from "./hooks/useFilterCategory";

const ProductList = () => {
  //TRAEMOS LOS PRODUCTOS DESDE CONTEXT
  const { addToCart } = CartUseContext();
  const [addCheckMap, setAddCheckMap] = useState(false);

  //desestructuramos el filteredProducts del customhook
  const { filteredProducts, categFunc } = useFilterCategory();

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
    <div className="">
      <section>
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
          <header className="mt-16">
            <h2 className="text-xl font-bold  sm:text-3xl flex justify-center">
              Productos
            </h2>
          </header>

          <ul className="grid gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-4 ">
            <Filter categFunc={categFunc} />

            {filteredProducts.length === 0 && (
              <p className=" text-xl text-center">
                No hay productos disponibles.
              </p>
            )}
            {filteredProducts.map((product) => (
              <li className="shadow-xl  " key={product.id}>
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

                  <div className="relative pt-3 bg-white p-1 ">
                    <h3 className="text-xl text-gray-800">{product.nombre}</h3>

                    <p className="mt-2">
                      <span className="sr-only"> Regular Price </span>

                      <span className="tracking-wider text-gray-800 text-xl">
                        $ {product.precio}
                      </span>
                    </p>
                  </div>
                </Link>
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      addToCart(product);
                      handlerAddCheck(product.id);
                    }}
                    className="bg-transparent m-2 -mt-16 relative border border-white focus:outline-none hover:border-white"
                  >
                    {addCheckMap[product.id] ? (
                      <CheckIcon className="h-6 w-6 text-gray-800" />
                    ) : (
                      <ShoppingCartIcon className="h-6 w-6 text-gray-800" />
                    )}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ProductList;
