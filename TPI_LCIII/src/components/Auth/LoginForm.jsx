import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { Typewriter } from "react-simple-typewriter";
import { UserCircleIcon } from "@heroicons/react/24/outline";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { user, handleSingIn } = UserAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleSingIn(email, password);
  };

  if (user) {
    navigate("/");
  }

  return (
    <div className="flex h-screen">
      <section className="flex justify-center content-center ">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12 ">
          <main
            aria-label="Main"
            className="  px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 "
          >
            <div className="max-w-xl lg:max-w-3xl bg-gray-600 bg-opacity-50 p-10 rounded-3xl mt-12 ">
              <div className="relative  block ">
                <h1 className=" text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl flex justify-center">
                  <UserCircleIcon
                    className="h-12 w-12 text-white -mb-2"
                    aria-hidden="true"
                  />
                </h1>
              </div>

              <form
                action="#"
                onSubmit={handleSubmit}
                className="mt-8 grid grid-cols-6 gap-6 "
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
                    className="mt-1 w-full rounded-md border-gray-200 bg-gray-400 text-sm text-gray-700 shadow-sm p-2"
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="Password"
                    className="block text-sm font-medium text-white p-2"
                  >
                    Password
                  </label>

                  <input
                    type="password"
                    id="Password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 w-full rounded-md border-gray-200 bg-gray-400 text-sm text-gray-700 shadow-sm p-2"
                  />
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                    Iniciar Sesion
                  </button>

                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Already have an account?
                    <Link
                      to="/register"
                      className="text-gray-700 underline pl-2"
                    >
                      Registrarse
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

export default LoginForm;
