import React from "react";
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
import AdminModifyModalUser from "./AdminModifyModalUser";

const AdminListUsers = () => {
  // LLAMADA DE TODOS LOS PRODUCTOS A LA BASE DE DATOS
  const [data, setData] = useState([]);
  const { categoriaId } = useParams();
  //   const [deletedProductId, setDeletedProductId] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUserEmail, setSelectedUserEmail] = useState("");

  useEffect(() => {
    const querydb = getFirestore();
    const users = collection(querydb, "Usuarios");

    getDocs(users).then((res) =>
      setData(
        res.docs.map((user) => ({
          id: user.id,
          ...user.data(),
        }))
      )
    );
  }, [categoriaId]);

  //   FUNCION PARA REMOVER UN PRODUCTO DE LA BASE DE DATOS
  //   const firestore = getFirestore(app);

  //   const deleteProductHandle = async (id) => {
  //     try {
  //       const productRef = doc(firestore, `Usuarios/${id}`);
  //       await deleteDoc(productRef);
  //       console.log("Datos eliminados correctamente");
  //       setDeletedProductId(id); // Actualiza el estado deletedProductId
  //     } catch (error) {
  //       console.error("Error al eliminar los datos:", error);
  //     }
  //   };

  const selectUser = (userId) => {
    setSelectedUserId(userId);
    console.log(userId);
  };

  const selectUserE = (userEmail) => {
    setSelectedUserEmail(userEmail);
    console.log(userEmail);
  };
  return (
    <div>
      <section>
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
          <header className="mt-16">
            <h2 className="text-xl font-bold text-white sm:text-3xl flex justify-center">
              Usuarios Registrados
            </h2>
            {/* <Link to="/agregarproducto">
              <button className="focus:outline-none sm:text-sm">
                Agregar Producto
              </button>
            </Link> */}
          </header>

          <table className="min-w-full  bg-transparent text-sm">
            {data.map((user) => (
              <li className="" key={user.id}>
                <Link
                  to="#"
                  className="block overflow-hidden group rounded-md "
                >
                  <div className="relative pt-3 bg-gray-700 p-1">
                    <h3 className="text-xl text-white">Email: {user.correo}</h3>
                    <h3 className="text-xl text-white">Rol: {user.rol}</h3>

                    <p className="mt-2">
                      <div className="mt-6">
                        {/* <span className="flex justify-start ml-28 -mb-9 ">
                          <TrashIcon
                            onClick={() => deleteProductHandle(user.id)}
                            className="h-8 w-8 text-white bg-red-600 rounded-md p-1"
                          />
                        </span> */}

                        <span className="flex -mt-6 ">
                          <button
                            onClick={() => {
                              selectUser(user.id), selectUserE(user.correo);
                            }}
                          >
                            <AdminModifyModalUser
                              userId={selectedUserId}
                              userEmail={selectedUserEmail}
                            />
                          </button>
                        </span>
                      </div>
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminListUsers;
