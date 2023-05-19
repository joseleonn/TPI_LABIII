import { Link, useParams } from "react-router-dom";
import { db } from "../../../firebase/Credentials";
import { getDoc, collection, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { CartUseContext } from "../../../context/CartContext";
import { CheckIcon } from "@heroicons/react/24/outline";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProductInfo] = useState(null);
  const { cart, setCart, addToCart } = CartUseContext();
  const [addCheck, setAddCheck] = useState(false);

  //funcion para obetener informacion del producto especifio en la base de datos
  const getProductById = async () => {
    const collectionRef = collection(db, "Products");
    const docuRef = doc(collectionRef, productId);
    const snapDoc = await getDoc(docuRef);
    const producto = snapDoc.data();
    return producto;
  };

  useEffect(() => {
    const getProduct = async () => {
      const product = await getProductById(productId);
      setProductInfo({ ...product, id: productId });
      console.log(product);
    };
    getProduct();
  }, [productId]);

  //CAMBIA EL ICONO DEL CARRITO A UN CHECK MEDIANMTE UN ESTADO
  const handlerAddCheck = () => {
    setAddCheck(!addCheck);

    //LE AGREGA UN TIMEOUT PARA CANCELAR ESE ESTADO Y VOLVER AL INICIAL
    setTimeout(() => {
      setAddCheck(addCheck);
    }, 2000); // Delay de 1 segundo (1000 milisegundos)
  };
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
              </div>
            </div>

            <div className="lg:sticky lg:top-0">
              <form className="space-y-4 lg:pt-8">
                <div>
                  <p className="text-xl text-white font-bold">
                    $ {product?.precio}
                  </p>
                </div>

                <div className="w-full rounded bg-red-700 px-6 py-3 text-sm font-bold uppercase  text-center tracking-wide text-white">
                  <button
                    className="focus:outline-none hover:outline-none border-none"
                    type="button"
                    onClick={() => {
                      addToCart(product);
                      handlerAddCheck();
                    }}
                  >
                    {addCheck ? (
                      <p className="text-center text-white">
                        <CheckIcon className="h-8 w-8" />
                      </p>
                    ) : (
                      <p>Añadir al carrito</p>
                    )}
                  </button>
                </div>
                <div
                  className="w-full rounded border
                  border-green-900 bg-green-900 px-6 py-3 text-sm font-bold
                  uppercase text-center"
                >
                  <Link type="button" to="/carrito">
                    <p className="text-center text-white">Ir al carrito</p>
                  </Link>
                </div>
                <div
                  className="w-full rounded border
                  border-gray-300 bg-gray-100 px-6 py-3 text-sm font-bold
                  uppercase tracking-wide text-center"
                >
                  <Link type="button" to="/productos">
                    <p className="text-center ">Volver</p>
                  </Link>
                </div>
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
