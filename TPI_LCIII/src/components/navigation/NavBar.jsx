import { Link } from "react-router-dom";
import { useState, Fragment } from "react";
import "firebase/auth";
import { UserAuth } from "../../context/AuthContext";
import { Dialog, Transition } from "@headlessui/react";
import {
  ShoppingCartIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import UserModal from "./UserModal";
import UserModalMovil from "./UserModalMovil";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const toggleAdminMenu = () => {
    setShowAdminMenu(!showAdminMenu);
  };

  const { user, handleLogOut } = UserAuth();

  const logout = async () => {
    handleLogOut();
    setOpen(false);
  };
  return (
    <div>
      <header aria-label="Site Header" className="bg-transparent">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 ">
          <div className="flex h-16 items-center justify-between fixed inset-0 z-10 bg-transparent   ">
            <div className="md:flex md:items-center md:gap-12 p-8 ">
              <a className="block text-teal-600" href="/">
                <span className="sr-only">Home</span>
                <svg
                  className="h-8"
                  viewBox="0 0 28 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>

            <div className="hidden md:block ml-44">
              <nav aria-label="Site Nav">
                <ul className="flex items-center gap-12 text-xl ">
                  <li>
                    <Link
                      className="text-white transition hover:text-gray-500/75"
                      to="/"
                    >
                      Inicio
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="text-white transition hover:text-gray-500/75"
                      to="/productos"
                    >
                      Productos
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="text-white transition hover:text-gray-500/75"
                      to="/nosotros"
                    >
                      Nosotros
                    </Link>
                  </li>
                  {user && user.rol === "Admin" ? (
                    <li className={`${showAdminMenu ? "mt-24 " : ""} `}>
                      <Link
                        className="text-white transition hover:text-gray-500/75 focus: outline-none"
                        onClick={toggleAdminMenu}
                      >
                        Administrador
                      </Link>
                      {showAdminMenu ? (
                        <ul className="text-white bg-gray-700 rounded-md pt-2 ">
                          <Link
                            to="/admin/usuarios"
                            className="text-white transition hover:text-white focus: outline-none"
                          >
                            <li className="p-2 transition-colors duration-300 ease-in-out  hover:text-gray-400">
                              Usuarios
                            </li>
                          </Link>
                          <Link
                            to="/admin/productos"
                            className="text-white transition hover:text-white focus: outline-none"
                          >
                            <li className="p-2  transition-colors duration-300 ease-in-out hover:text-gray-400">
                              Productos
                            </li>
                          </Link>
                        </ul>
                      ) : null}
                    </li>
                  ) : null}
                </ul>
              </nav>
            </div>

            {/* If Login */}

            <div className="flex items-center gap-4 hidden md:block p-8">
              {user ? (
                <div className="sm:flex sm:gap-4">
                  <div>
                    <UserModal />
                  </div>

                  <Link
                    className="mt-3 mr-2 text-white hover:text-gray-300 "
                    to="/carrito"
                  >
                    <ShoppingCartIcon className="h-8 w-8" />
                  </Link>
                  <Link
                    className="rounded-md bg-red-600 px-5 py-2.5 text-sm font-medium text-white shadow hover:text-red-900"
                    onClick={(e) => setOpen(true)}
                  >
                    <ArrowLeftOnRectangleIcon className="h-8 w-8" />
                  </Link>
                </div>
              ) : (
                // IF NOT LOGIN
                <div className="sm:flex sm:gap-4">
                  <Link
                    className="rounded-md  px-5 py-2.5 text-l font-medium text-gray-800 bg-gray-300 bg-opacity-50 shadow transition hover:text-gray-100/75"
                    to="/login"
                  >
                    Login
                  </Link>

                  <div className="hidden sm:flex">
                    <Link
                      className="rounded-md  px-5 py-2.5 text-l font-medium text-white bg-gray-700 bg-opacity-50 shadow transition hover:text-gray-500/75"
                      to="/register"
                    >
                      Register
                    </Link>
                  </div>
                  <Link className="mt-2 mr-2 text-white " to="/carrito">
                    <ShoppingCartIcon className="h-8 w-8" />
                  </Link>
                </div>
              )}
            </div>

            <div className="block md:hidden">
              <button
                onClick={toggleMenu}
                className="rounded bg-transparent p-4 text-gray-600 transition mr-4 focus:outline-none "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* // movil nav */}
        <div
          className={` transition-transform ${
            showMenu ? "transform translate-x-0" : "transform translate-x-full"
          } md:hidden ml-auto max-w-max z-10 fixed inset-0 mt-16`}
        >
          <ul className="flex flex-col items-start gap-6 text-md mx-8 ml-44 bg-gray-700 rounded p-2 ">
            <li className="p-2">
              <Link
                className=" text-white transition hover:text-gray-500/75  ml-4"
                to="/"
              >
                Inicio
              </Link>
            </li>

            <li className="p-2">
              <Link
                className=" text-white transition hover:text-gray-500/75 ml-4"
                to="/productos"
              >
                Productos
              </Link>
            </li>

            <li className="p-2">
              <Link
                className=" text-white transition hover:text-gray-500/75  ml-4"
                to="/nosotros"
              >
                Nosotros
              </Link>
            </li>

            {/* IF ADMIN */}
            {user && user.rol === "Admin" ? (
              <li>
                <Link
                  className="text-white transition hover:text-gray-500/75  ml-5"
                  to="/admin"
                >
                  Administrador
                </Link>
              </li>
            ) : null}

            {/* IF CLIENT */}
            {user ? (
              <ul className="">
                <li className="p-2">
                  <UserModalMovil />
                </li>

                <li className="p-2">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md  border border-transparent bg-red-600 px-4 py-2 text-base  text-white shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 xs:text-xs"
                    onClick={(e) => setOpen(true)}
                  >
                    Cerrar Sesion
                  </button>
                </li>
              </ul>
            ) : (
              <ul className="">
                <li className="p-2">
                  <Link
                    className="text-white transition hover:text-gray-500/75 ml-4"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>

                <li className="mt-4 p-2">
                  <Link
                    className="text-white transition hover:text-gray-500/75 ml-4 mt-6"
                    to="/register"
                  >
                    Register
                  </Link>
                </li>
              </ul>
            )}
          </ul>
        </div>
      </header>
      {/* modal logout */}

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-700 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <ArrowLeftOnRectangleIcon
                        className="h-6 w-6 text-gray-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-white"
                      >
                        Seguro quieres salir?
                      </Dialog.Title>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 flex items-center justify-center">
                    <Link
                      to="/"
                      type="button"
                      className="inline-flex justify-center rounded-md m-1 border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none sm:text-sm"
                      onClick={logout}
                    >
                      Cerrar Sesion
                    </Link>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border m-1 border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none sm:text-sm"
                      onClick={(e) => setOpen(false)}
                    >
                      Cancelar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default NavBar;
