import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "firebase/auth";
import { useNavigate } from "react-router-dom";
import app, { auth } from "../../firebase/Credentials";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import Alerts from "./Alerts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingContext } from "../../context/LoadingContext";
const firestore = getFirestore(app);

const RegisterFormFire = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");

  const [rol, setRol] = useState("Cliente");
  const [error, setError] = useState();
  const navigate = useNavigate();
  const { toggleLoading } = useContext(LoadingContext);

  const messageError = () => {
    toast.error("La contraseña no coincide!", {
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
    toast.success("Registrado!", {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    toggleLoading(true);
    if (password === repassword) {
      createUserWithEmailAndPassword(auth, email, password, rol)
        .then((userCredential) => {
          // Signed in
          messageSuccess();

          const user = userCredential.user;

          // Agrega al usuario a la BASE DE DATOS y le asigna el rol
          const docuRef = doc(firestore, `Usuarios/${user.uid}`);
          setDoc(docuRef, { correo: email, rol: rol });
          // ...
          toggleLoading(false);

          navigate("/");
        })
        .catch((error) => {
          setError(error.message);
          toggleLoading(false);
        });
    } else {
      messageError();
      toggleLoading(false);
    }
  };

  return (
    <div>
      <section className=" bg-gray-800">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt="Night"
              src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />

            <div className="hidden lg:relative lg:block lg:p-12 lg:flex ">
              <h2 className=" text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Bienvenido a Indumentaria 21
              </h2>
            </div>
          </section>

          <main
            aria-label="Main"
            className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
          >
            <div className="max-w-xl lg:max-w-3xl">
              <div className="relative -mt-16 block lg:hidden">
                <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl md:text-4xl pt-10">
                  Bienvenido a Indumentaria 21
                </h1>
              </div>
              <ToastContainer />

              {error && <Alerts message={error} />}
              <form
                action="#"
                onSubmit={handleSubmit}
                className="mt-8 grid grid-cols-6 gap-6"
              >
                <div className="col-span-6">
                  <label
                    htmlFor="Email"
                    className="block text-sm font-medium text-white p-2"
                  >
                    Email
                  </label>

                  <input
                    type="email"
                    id="Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="Password"
                    className="block text-sm font-medium text-white p-2"
                  >
                    Contraseña
                  </label>

                  <input
                    type="password"
                    id="Password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="PasswordConfirmation"
                    className="block text-sm font-medium text-white p-2"
                  >
                    Confirmar contraseña
                  </label>

                  <input
                    type="password"
                    id="PasswordConfirmation"
                    name="confirm_password"
                    value={repassword}
                    onChange={(e) => setRePassword(e.target.value)}
                    required
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2"
                  />
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button
                    type="submit"
                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                  >
                    Crear cuenta
                  </button>

                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Ya tenes cuenta?
                    <Link to="/login" className="text-gray-700 underline">
                      Entra ya!
                    </Link>
                    .
                  </p>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};

export default RegisterFormFire;
