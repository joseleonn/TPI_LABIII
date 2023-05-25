import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { CartUseContext } from "../../context/CartContext";
import axios from "axios";
let functionPagarMP = "http://127.0.0.1:5001/tpilab33/us-central1/crearPagoMP";

const Confirmation = () => {
  const [succesBuy, setSuccesBuy] = useState("esperando");

  const { user } = UserAuth();
  const { cart, getCartItems, deleteCartDB } = CartUseContext();
  const [idClient, setIdClient] = useState(null);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query = useQuery();
  let payment_id = query.get("payment_id");
  let status = query.get("status");

  useEffect(() => {
    if (user && user.uid) {
      setIdClient(user.uid);
    }
  }, [user]);

  const navigate = useNavigate("");

  useEffect(() => {
    const fetchData = async () => {
      if (payment_id !== null && status === "approved") {
        const cartDB = await getCartItems();
        const order = {
          payment_id: payment_id,
          status: status,
          cartDB: cartDB,
        };
        console.log(order);
        if (order.cartDB && order.cartDB.length > 0) {
          axios
            .post(functionPagarMP, JSON.stringify(order), {
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:5173",
              },
              withCredentials: true,
            })
            .then((response) => {
              if (response.data) {
                setSuccesBuy("comprado");
                deleteCartDB();
                setTimeout(() => {
                  navigate("/miscompras");
                }, 4000);
              } else {
                console.log("No se pudo comprar");
                setSuccesBuy("error");
              }
            })
            .catch((error) => {
              console.log("Error al realizar la solicitud:", error);
              setSuccesBuy("error");
            });
        }
      }
    };

    fetchData();
  }, [idClient]);

  return (
    <div className="flex flex-col justify-center items-center mt-20 text-white">
      <h1>Confirmacion del pedido</h1>

      <div className="flex ">
        {succesBuy === "esperando" && <p>Procesando...</p>}
        {succesBuy === "comprado" && <p>Gracias por comprar</p>}
        {succesBuy === "error" && <p>Error en la compra</p>}
      </div>
    </div>
  );
};

export default Confirmation;
