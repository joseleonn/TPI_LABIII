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

const AdminListProducts = () => {
  // LLAMADA DE TODOS LOS PRODUCTOS A LA BASE DE DATOS
  const [data, setData] = useState([]);
  const navigate = useNavigate("");
  const { categoriaId } = useParams();
  const [deletedProductId, setDeletedProductId] = useState(null);

  useEffect(() => {
    const querydb = getFirestore();
    const products = collection(querydb, "Products");

    getDocs(products).then((res) =>
      setData(
        res.docs.map((product) => ({
          id: product.id,
          ...product.data(),
        }))
      )
    );
  }, [categoriaId, deletedProductId]);

  //   FUNCION PARA REMOVER UN PRODUCTO DE LA BASE DE DATOS
  const firestore = getFirestore(app);

  const deleteProductHandle = async (id) => {
    try {
      const productRef = doc(firestore, `Products/${id}`);
      await deleteDoc(productRef);
      console.log("Datos eliminados correctamente");
      setDeletedProductId(id); // Actualiza el estado deletedProductId
    } catch (error) {
      console.error("Error al eliminar los datos:", error);
    }
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
              <button className="focus:outline-none sm:text-sm">
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

                    <p className="mt-2">
                      <span className="tracking-wider text-white text-xl">
                        $ {product.precio}
                      </span>

                      <span className="flex justify-end">
                        <TrashIcon
                          onClick={() => deleteProductHandle(product.id)}
                          className="h-8 w-8 text-white bg-red-600 rounded-md p-1"
                        />
                      </span>
                    </p>
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
