import axios from "axios";
import { UserAuth } from "../../context/AuthContext";
import { CartUseContext } from "../../context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

let functionGenerarID =
  "https://us-central1-tpilab33.cloudfunctions.net/crearIdMdPp";

const FormCheckout = () => {
  const { cart, addCartDB } = CartUseContext();
  const { user } = UserAuth();
  const [loading, setLoading] = useState(false);

  const paymentLoading = () => {
    setLoading(!loading);
  };

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

  const payWhitMercadoPago = async () => {
    if (user) {
      paymentLoading();
      const request = await axios.post(
        functionGenerarID,
        JSON.stringify(cart),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://tpi-labiii.vercel.app",
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
        {loading ? (
          <span className="text-white">
            <FontAwesomeIcon icon={faSpinner} spin /> Procesando...
          </span>
        ) : (
          <p>Pagar con Mercado Pago</p>
        )}
      </button>
      <ToastContainer />
    </div>
  );
};

export default FormCheckout;
