import { TrashIcon } from "@heroicons/react/24/outline";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import app from "../../firebase/Credentials";
import AdminModifyModal from "./AdminModifyModal";
import { CartUseContext } from "../../context/CartContext";

const AdminListProducts = () => {
  // LLAMADA DE TODOS LOS PRODUCTOS DESDE CONTEXT
  const { data, deleteProductHandle } = CartUseContext();
  const { categoriaId } = useParams();
  const [selectedProductId, setSelectedProductId] = useState("");

  const selectProduct = (productId) => {
    setSelectedProductId(productId);
    console.log(productId);
  };
  return (
    <div>
      <section>
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
          <header className="mt-16">
            <h2 className="text-xl font-bold text-white sm:text-3xl flex justify-center">
              Productos
            </h2>
            <Link to="/agregarproducto">
              <button className="bg-gray-700 border border-gray-800 shadow-md text-sm mt-4 text-white hover:text-gray-600 hover:border-gray-600 focus:outline-none">
                Agregar Producto
              </button>
            </Link>
          </header>

          <ul className="grid gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-4 ">
            {data.map((product) => (
              <li className="" key={product.id}>
                <Link
                  to="#"
                  className="block overflow-hidden group rounded-md "
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

                    <span className="tracking-wider text-white text-xl">
                      $ {product.precio}
                    </span>
                    <div className="mt-6">
                      <span className="flex justify-end  -mb-11 ">
                        <TrashIcon
                          onClick={() => deleteProductHandle(product.id)}
                          className="h-8 w-8 text-white bg-red-600 rounded-md p-1"
                        />
                      </span>

                      <span className="flex -mt-6 ">
                        <button
                          className="bg-transparent shadow-xl border border-white text-sm mt-2 mb-2 text-white hover:text-gray-600 hover:border-gray-600 focus:outline-none"
                          onClick={() => selectProduct(product.id)}
                        >
                          <AdminModifyModal productId={selectedProductId} />
                        </button>
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};
export default AdminListProducts;
