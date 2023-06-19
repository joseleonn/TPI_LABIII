import { useState } from "react";
import { Link } from "react-router-dom";
import AdminModifyModalUser from "./AdminModifyModalUser";
import useListUsers from "./hooks/useListUsers";

const AdminListUsers = () => {
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUserEmail, setSelectedUserEmail] = useState("");

  //DESESTRUCTURAMOS EL DATA QUE VIENE DE UN CUSTOMHOOK QUE TRAE LA LISTA DE USUARIOS.
  const { data } = useListUsers();

  const selectUser = (userId) => {
    setSelectedUserId(userId);
    console.log(userId);
  };

  const selectUserE = (userEmail) => {
    setSelectedUserEmail(userEmail);
    console.log(userEmail);
  };
  return (
    <div className="  ">
      <section>
        <div className=" px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
          <header className="mt-16">
            <h2 className="text-xl font-bold text-white sm:text-3xl flex justify-center mb-8">
              Usuarios Registrados
            </h2>
          </header>
          <div className="overflow-auto max-w-screen">
            <table className="w-full">
              <ul className="flex flex-wrap  justify-center ">
                {data.map((user) => (
                  <li className="md:w-1/2 w-full text-xl" key={user.id}>
                    <Link to="#" className="rounded-md ">
                      <div className=" pt-3 bg-gray-700 p-1 m-2 rounded-md p-4">
                        <h3 className=" text-white">Email: {user.correo}</h3>
                        <h3 className="text-white">Rol: {user.rol}</h3>

                        <div className="mt-6">
                          <span className="flex -mt-6 ">
                            <button
                              className="bg-transparent border border-white text-sm mt-4 text-white hover:text-gray-600 hover:border-gray-600 focus:outline-none"
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
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminListUsers;
