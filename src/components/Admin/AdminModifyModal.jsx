import { useNavigate } from "react-router-dom";
import { useState, Fragment, useEffect, useContext } from "react";
import "firebase/auth";
import { UserAuth } from "../../context/AuthContext";
import { Dialog, Transition } from "@headlessui/react";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import app from "../../firebase/Credentials";
import { CartUseContext } from "../../context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faCheck } from "@fortawesome/free-solid-svg-icons";
import { LoadingContext } from "../../context/LoadingContext";
import { ToastContainer } from "react-toastify";

const AdminModifyModal = ({ productId }) => {
  const [open, setOpen] = useState(false);
  const { user } = UserAuth();
  const firestore = getFirestore(app);
  const storage = getStorage(app);
  const navigate = useNavigate("");
  const { data } = CartUseContext();
  const [urlLoaded, setUrlLoaded] = useState(false);
  const [fileload, setFileLoading] = useState(false);
  const { toggleLoading } = useContext(LoadingContext);

  //TOMAMOS LOS DATOS DE DATA
  const [newData, setData] = useState({
    id: productId,
    nombre: "",
    categoria: "",
    precio: "",
    descripcion: "",
    url: "",
    stock: "",
  });

  //cambia los datos del estado
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
      id: productId,
    }));
  };

  const getProductData = () => {
    if (open) {
      const productRef = data.find((item) => item.id === productId);
      if (productRef) {
        setData(productRef);
      } else {
        console.log("No se encontró el producto");
      }
    }
  };
  //funcion para actualizar los datos
  const updateData = async (newData) => {
    try {
      const productRef = doc(firestore, `Products/${newData.id}`);
      await setDoc(productRef, newData);
      console.log("Datos actualizados correctamente");
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
    }
  };

  //FUNCIO PARA ENVIAR LOS DATOS
  const handleSubmit = async (e) => {
    toggleLoading(true);
    e.preventDefault();

    try {
      await updateData(newData); // Utiliza la función de actualización en lugar de la de creación
      console.log("Datos actualizados correctamente");
      toggleLoading(false);
      setOpen(false);
      navigate("/admin/productos");
    } catch (error) {
      toggleLoading(false);
      console.error("Error al actualizar los datos:", error);
    }
  };

  const fileLoading = () => {
    setFileLoading(!fileload);
  };
  const fileHandler = async (e) => {
    //detectamos archivo
    const localFile = e.target.files[0];
    //cargarlo a firebase storage
    const fileRef = ref(storage, `documentos/${localFile.name}`);

    await uploadBytes(fileRef, localFile);

    //obtener url

    const url = await getDownloadURL(fileRef);
    // Actualizar el estado "data" con la URL del archivo
    setData((prevData) => ({
      ...prevData,
      url: url,
    }));
    setUrlLoaded(true); // Marcar la URL como cargada
  };

  useEffect(() => {
    getProductData(); // Llama a getProductData cuando productId cambie
  }, [productId]);

  return (
    <div>
      <div>
        <div
          className=""
          onClick={(e) => {
            setOpen(true);
            getProductData();
          }}
        >
          <p className="hover:text-gray-500/75">Modificar</p>
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
                        Modificar Producto
                      </Dialog.Title>

                      {/* FORMULARIO DE MODIFICACION */}
                      <form
                        action=""
                        onSubmit={handleSubmit}
                        className="mx-auto -mb-10 mt-8 max-w-md space-y-4"
                      >
                        <div>
                          <div className="relative">
                            <p className="text-gray-400 m-2">
                              Nombre del producto
                            </p>
                            <input
                              required
                              type="text"
                              name="nombre"
                              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                              placeholder="Ingrese el nombre"
                              value={newData.nombre}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="relative">
                            <p className="text-gray-400 m-2">Categoria</p>

                            <select
                              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                              placeholder="Seleccione una categoria"
                              name="categoria"
                              required
                              value={newData.categoria || "default"}
                              onChange={handleChange}
                            >
                              <option value={"default"} disabled>
                                Choose an option
                              </option>
                              <option value="remeras">Remeras</option>
                              <option value="buzos">Buzos</option>
                              <option value="pantalones">Pantalones</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <div className="relative">
                            <p className="text-gray-400 m-2">Descripcion</p>
                            <input
                              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                              placeholder="Ingrese una descripcion"
                              required
                              name="descripcion"
                              value={newData.descripcion}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="relative">
                            <p className="text-gray-400 m-2">Precio</p>
                            <input
                              type="number"
                              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                              placeholder="Ingrese el precio"
                              required
                              name="precio"
                              value={newData.precio}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="relative">
                            <p className="text-gray-400 m-2">Stock</p>
                            <input
                              type="number"
                              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                              placeholder="Ingrese el stock"
                              required
                              name="stock"
                              value={newData.stock}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="relative">
                            <p className="text-gray-400 m-2">Imagen</p>
                            <input
                              type="file"
                              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                              placeholder="Ingrese la imagen"
                              name="url"
                              onClick={fileLoading}
                              onChange={fileHandler}
                            />
                            {fileload ? (
                              urlLoaded ? (
                                <span className="text-gray-400">
                                  <FontAwesomeIcon icon={faCheck} /> Imagen
                                  Cargada
                                </span>
                              ) : (
                                <span className="text-gray-400">
                                  <FontAwesomeIcon icon={faSpinner} spin />{" "}
                                  Cargando imagen...
                                </span>
                              )
                            ) : null}
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
                  <div className="  flex items-center justify-center ">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-lg px-5 py-3 text-sm border -mt-1 border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none sm:text-sm"
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
