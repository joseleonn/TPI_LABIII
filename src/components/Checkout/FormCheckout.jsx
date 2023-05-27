import axios from "axios";
import { UserAuth } from "../../context/AuthContext";
import { CartUseContext } from "../../context/CartContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let functionGenerarID =
  "http://127.0.0.1:5001/tpilab33/us-central1/crearIdMdPp";

const FormCheckout = () => {
  const { cart, addCartDB } = CartUseContext();
  const { user } = UserAuth();

  const payWhitMercadoPago = async () => {
    const messageError = () => {
      toast.error("Debe estar registrado para poder pagar!", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    };

    const messageSuccess = () => {
      toast.success("Llevandote a Mercado Pago!", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    };

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
        messageSuccess();
        addCartDB(cart);
        setTimeout(() => {
          window.location.href = request.data.url;
        }, 4000);
      } else {
        console.log("hubo un error con mercado pago");
      }
    } else {
      messageError();

      console.log("debe registrarse para pagar");
    }
  };

  return (
    <div className="">
      {" "}
      <button
        onClick={payWhitMercadoPago}
        className="bg-blue-500 text-white w-full h-full"
      >
        Pagar con Mercado Pago
      </button>
      <ToastContainer />
    </div>
  );
};

export default FormCheckout;
