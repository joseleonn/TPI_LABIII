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

//////////////
//CONTEXTO DE CARRITO Y DE PRODUCTOS
/////////////

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

  //Funcion para acumular productos iguales
  const addToCart = (product) => {
    const productrepeat = cart.find((item) => item.id === product.id);

    if (productrepeat) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...product, quanty: productrepeat.quanty + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, product]);
    }
  };

  //funcion para saber la cantidad de items en el carrito
  const itemsQuanty = cart.reduce((acc, el) => acc + el.quanty, 0);

  const value = {
    cart,
    setCart,
    data,
    deleteProductHandle,
    addToCart,
    itemsQuanty,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const CartUseContext = () => {
  return useContext(CartContext);
};
