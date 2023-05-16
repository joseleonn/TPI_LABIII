import { useNavigate } from "react-router-dom";
import { useState, Fragment } from "react";
import "firebase/auth";
import { UserAuth } from "../../context/AuthContext";
import { Dialog, Transition } from "@headlessui/react";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import app from "../../firebase/Credentials";

const AdminModifyModal = ({ userId, userEmail }) => {
  const [open, setOpen] = useState(false);
  const { user } = UserAuth();
  const firestore = getFirestore(app);
  const storage = getStorage(app);
  const navigate = useNavigate("");

  //TOMAMOS LOS DATOS DE DATA
  const [data, setData] = useState({
    id: "",
    correo: "",
    rol: "",
  });

  //cambia los datos del estado
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
      id: userId,
      correo: userEmail,
    }));
  };

  //actualiza la data en la base de datos
  const updateData = async (data) => {
    try {
      console.log(data.id);
      const productRef = doc(firestore, `Usuarios/${data.id}`);
      await setDoc(productRef, data);
      console.log("Datos actualizados correctamente");
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
    }
  };

  //FUNCIO PARA ENVIAR LOS DATOS
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);

    try {
      await updateData(data); // Utiliza la función de actualización en lugar de la de creación
      console.log("Datos actualizados correctamente");
      navigate("/admin/usuarios");
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
    }
    // ...
  };

  return (
    <div>
      <div>
        <div className="" onClick={(e) => setOpen(true)}>
          <p className="hover:text-gray-500/75">Modificar rol</p>
        </div>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-800 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-white"
                      >
                        Modificar rol de usuario
                      </Dialog.Title>

                      {/* FORMULARIO DE MODIFICACION */}
                      <form
                        action=""
                        onSubmit={handleSubmit}
                        className="mx-auto -mb-10 mt-8 max-w-md space-y-4"
                      >
                        <div className="relative">
                          <p className="text-gray-400 m-2">{data.correo}</p>
                        </div>

                        <div>
                          <div className="relative">
                            <p className="text-gray-400 m-2">Rol</p>

                            <select
                              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                              placeholder="Seleccione un rol"
                              name="rol"
                              required
                              value={data.rol || "default"}
                              onChange={handleChange}
                            >
                              <option value={"default"} disabled>
                                Elija una opcion
                              </option>
                              <option value="Cliente">Cliente</option>
                              <option value="Admin">Admin</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <button
                            type="submit"
                            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none"
                          >
                            Agregar
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="  flex items-center justify-center -ml-10">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-lg px-5 py-3 border -mt-1 border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none sm:text-sm"
                      onClick={(e) => setOpen(false)}
                    >
                      Cancelar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default AdminModifyModal;
