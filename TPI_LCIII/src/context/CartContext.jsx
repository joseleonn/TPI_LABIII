import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import app from "../firebase/Credentials";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const [selectedProductId, setSelectedProductId] = useState("");
  const [data, setData] = useState([]);
  const { categoriaId } = useParams();
  // const [selectedProductId, setSelectedProductId] = useState("");

  //TRAEMOS TODOS LOS PRODUCTOS DE LA BASE DE DATOS
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
  }, [data]);

  //FUNCION PARA ELIMINAR PRODUCTOS DE LA BASE DE DATOS
  const firestore = getFirestore(app);

  const deleteProductHandle = async (id) => {
    try {
      const productRef = doc(firestore, `Products/${id}`);
      await deleteDoc(productRef);
      console.log("Datos eliminados correctamente");
    } catch (error) {
      console.error("Error al eliminar los datos:", error);
    }
  };
  const value = { cart, setCart, data, deleteProductHandle };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const CartUseContext = () => {
  return useContext(CartContext);
};
