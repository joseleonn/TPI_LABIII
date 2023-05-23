import axios from "axios";
import { UserAuth } from "../../context/AuthContext";
import { CartUseContext } from "../../context/CartContext";

let functionGenerarID =
  "http://127.0.0.1:5001/tpilab33/us-central1/crearIdMdPp";

const FormCheckout = () => {
  const { cart } = CartUseContext();
  const { user } = UserAuth();

  const payWhitMercadoPago = async () => {
    console.log(JSON.stringify(cart));

    if (user) {
      const request = await axios.post(
        functionGenerarID,
        JSON.stringify(cart),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:5173",
          },
          withCredentials: true,
        }
      );
      console.log(request);
      if (request.data) {
        console.log("recibido");
        window.location.href = request.data.url
      } else {
        console.log("hubo un error con mercado pago");
      }
    } else {
      console.log("debe registrarse para pagar");
    }
  };

  return (
    <div>
      {" "}
      <button onClick={payWhitMercadoPago}>Pagar con Mercado Pago</button>
    </div>
  );
};

export default FormCheckout;
