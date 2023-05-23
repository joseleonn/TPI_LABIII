import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Confirmation = () => {
  const [succesBuy, setSuccesBuy] = useState("esperando");
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query = useQuery();
  let status = query.get("status");

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
