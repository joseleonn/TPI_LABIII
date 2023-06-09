import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
} from "firebase/firestore";
import app from "../../firebase/Credentials";
import { useContext, useState } from "react";
import NavBar from "../navigation/NavBar";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { LoadingContext } from "../../context/LoadingContext";

const AdminManagment = () => {
  const { user } = UserAuth();
  const navigate = useNavigate();
  const firestore = getFirestore(app);
  const storage = getStorage(app);
  const { toggleLoading } = useContext(LoadingContext);

  const [data, setData] = useState({
    nombre: "",
    categoria: "",
    precio: "",
    descripcion: "",
    stock: "",
    url: "",
    quanty: 1,
  });

  //funcion para agregar los datos al data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //FUNCION PARA AGREGAR LOS DATOS A LA BASE DE DATOS
  const addData = async (data) => {
    try {
      const docRef = await addDoc(collection(firestore, "Products"), data);
      console.log(
        "Datos agregados correctamente. ID del documento:",
        docRef.id
      );
    } catch (error) {
      console.error("Error al agregar los datos:", error);
    }
  };

  //FUNCION PARA ENVIAR LOS DATOS
  const handleSubmit = async (e) => {
    toggleLoading(true);
    e.preventDefault();
    console.log(data);

    try {
      await addData(data);
      console.log("Datos agregados correctamente");
      toggleLoading(false);
      navigate("/admin/productos");
    } catch (error) {
      toggleLoading(false);
      console.error("Error al agregar los datos:", error);
    }
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
    console.log(url);
  };

  return (
    <div>
      <NavBar />
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Agrega Productos para vender
          </h1>
        </div>

        <form
          action=""
          onSubmit={handleSubmit}
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
        >
          <div>
            <div className="relative">
              <p className=" m-2">Nombre del producto</p>
              <input
                required
                type="text"
                name="nombre"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black"
                placeholder="Ingrese el nombre"
                value={data.nombre}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <p className=" m-2">Categoria</p>

              <select
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black"
                placeholder="Seleccione una categoria"
                name="categoria"
                required
                value={data.categoria || "default"}
                onChange={handleChange}
              >
                <option value={"default"} disabled>
                  Elija una opcion
                </option>
                <option value="remeras">Remeras</option>
                <option value="buzos">Buzos</option>
                <option value="pantalones">Pantalones</option>
              </select>
            </div>
          </div>

          <div>
            <div className="relative">
              <p className=" m-2">Descripcion</p>
              <input
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black"
                placeholder="Ingrese una descripcion"
                required
                name="descripcion"
                value={data.descripcion}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <p className=" m-2">Precio</p>
              <input
                type="number"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black"
                placeholder="Ingrese el precio"
                required
                name="precio"
                value={data.precio}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <p className=" m-2">Stock</p>
              <input
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black"
                placeholder="Ingrese el stock del producto"
                required
                type="number"
                name="stock"
                value={data.stock}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <p className=" m-2">Imagen</p>
              <input
                type="file"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black bg-white"
                placeholder="Ingrese la imagen"
                name="url"
                onChange={fileHandler}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
            >
              Agregar
            </button>
          </div>
        </form>
        <div className=" flex justify-center -mt-11 -ml-36">
          <Link to="/admin/productos">
            <button className="px-5 py-3 inline-block rounded-lg text-sm focus:outline-none sm:text-sm">
              Vovler
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminManagment;
