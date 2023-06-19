import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import app from "../firebase/Credentials";
import { UserAuth } from "./AuthContext";
export const CartContext = createContext();

//////////////
//CONTEXTO DE CARRITO Y DE PRODUCTOS
/////////////

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user } = UserAuth();

  const [selectedProductId, setSelectedProductId] = useState("");
  const [data, setData] = useState([]);
  const { categoriaId } = useParams();
  const [idClient, setIdClient] = useState(null);
  const [pedidosData, setPedido] = useState([]);

  const firestore = getFirestore(app);

  useEffect(() => {
    if (user && user.uid) {
      setIdClient(user.uid);
    }
  }, [user]);
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

  //AGREGAR CARRITO A LA BASE DE DATOS PARA LA COMPRA
  const addCartDB = (cart) => {
    if (idClient) {
      const usuariosRef = collection(firestore, "Usuarios");
      const cartCollectionRef = collection(usuariosRef, idClient, "Carrito");
      const cartDocRef = doc(cartCollectionRef);
      const cartTotal = cart.reduce(
        (acc, element) => acc + parseInt(element.precio) * element.quanty,
        0
      );
      const data = {
        items: cart,
        cartTotal: cartTotal,
        idClient: idClient,
      };
      return setDoc(cartDocRef, data)
        .then(() => {
          console.log("Carrito agregado a la base de datos");
          return true;
        })
        .catch((error) => {
          console.error(
            "Error al agregar el carrito a la base de datos",
            error
          );
          return false;
        });
    } else {
      console.error("idClient no está definido");
      return false;
    }
  };

  //FUNCION PARA TRAER CART DE BASE DE DATOS

  const getCartItems = async () => {
    if (idClient !== null) {
      if (idClient) {
        const usuariosRef = collection(firestore, "Usuarios");
        const cartCollectionRef = collection(usuariosRef, idClient, "Carrito");

        try {
          const querySnapshot = await getDocs(cartCollectionRef);
          const cartItems = [];

          querySnapshot.forEach((doc) => {
            const cartItem = doc.data();
            cartItems.push(cartItem);
          });

          console.log("Items del carrito:", cartItems);
          return cartItems;
        } catch (error) {
          console.error("Error al obtener los items del carrito:", error);
          return [];
        }
      } else {
        console.error("idClient no está definido");
        return [];
      }
    }
  };

  //FUNCION PARA ELIMINAR CARRITO DE LA BASE DE DATOS
  const deleteCartDB = async () => {
    if (idClient) {
      const usuariosRef = collection(firestore, "Usuarios");
      const cartCollectionRef = collection(usuariosRef, idClient, "Carrito");
      const cartQuerySnapshot = await getDocs(cartCollectionRef);

      const deletePromises = cartQuerySnapshot.docs.map((doc) =>
        deleteDoc(doc.ref)
      );

      return Promise.all(deletePromises)
        .then(() => {
          console.log("Carrito eliminado de la base de datos");
          return true;
        })
        .catch((error) => {
          console.error(
            "Error al eliminar el carrito de la base de datos",
            error
          );
          return false;
        });
    } else {
      console.error("idClient no está definido");
      return false;
    }
  };

  //funcion para traer los pedidos realizados

  useEffect(() => {
    const getPedidos = async () => {
      if (idClient) {
        const usuariosRef = collection(firestore, "Usuarios");
        const pedidosCollectionRef = collection(
          usuariosRef,
          idClient,
          "Pedidos"
        );

        try {
          getDocs(pedidosCollectionRef).then((res) =>
            setPedido(
              res.docs.map((product) => ({
                id: product.id,
                ...product.data(),
              }))
            )
          );
        } catch (error) {
          console.error("Error al obtener los pedidos:", error);
          return [];
        }
      } else {
        return [];
      }
    };
    getPedidos();
  }, [pedidosData, idClient]);

  const value = {
    cart,
    setCart,
    data,
    deleteProductHandle,
    addToCart,
    itemsQuanty,
    addCartDB,
    getCartItems,
    deleteCartDB,
    pedidosData,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const CartUseContext = () => {
  return useContext(CartContext);
};
