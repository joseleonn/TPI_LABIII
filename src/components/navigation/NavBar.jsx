import { Link } from "react-router-dom";
import { useState, Fragment, useEffect, useContext } from "react";
import "firebase/auth";
import { UserAuth } from "../../context/AuthContext";
import { Dialog, Transition } from "@headlessui/react";
import {
  ShoppingCartIcon,
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import UserModal from "./UserModal";
import TotalItems from "../ShoppingCart/TotalItems";
import { CartUseContext } from "../../context/CartContext";
import NavBarMobile from "./NavBarMobile";
import ModalLogOut from "./ModalLogOut";
import ButtonDarkLightMode from "../ButtonDarkLightMode/ButtonDarkLightMode";
import { ModeContext } from "../../context/DarkLightModeContext";

const navLinks = [
  {
    id: 1,
    name: "Inicio",
    to: "/",
  },
  {
    id: 2,
    name: "Productos",
    to: "/productos",
  },
  {
    id: 3,
    name: "Nosotros",
    to: "/nosotros",
  },
];
const NavBar = () => {
  const [open, setOpen] = useState(false);
  const { user, handleLogOut } = UserAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { itemsQuanty, cart } = CartUseContext();
  const { mode } = useContext(ModeContext);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const toggleAdminMenu = () => {
    setShowAdminMenu(!showAdminMenu);
  };

  const logout = async () => {
    handleLogOut();
    setOpen(false);
  };

  //FUNCION QUE PARA CUANDO HAGA SCROLL PARA ABAJO CAMBIE EL CSS DEL NAVBAR
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="text-white">
      <header aria-label="Site Header" className="bg-transparent ">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8  ">
          <div
            className={`flex h-16 items-center justify-between fixed inset-0 z-10 ${
              scrolled
                ? mode === "dark"
                  ? "bg-black bg-opacity-90 shadow-md"
                  : "bg-white bg-opacity-90 shadow-md"
                : "bg-transparent"
            } `}
          >
            <div className="md:flex  p-8 ">
              <Link className="block " to="/">
                <p
                  className={`${
                    mode === "light" ? "text-gray-800" : "text-white"
                  }`}
                >
                  INDUMENTARIA 21
                </p>
              </Link>
            </div>

            <div className="hidden md:block  ">
              <nav aria-label="Site Nav">
                <ul className="flex items-center gap-12 text-l  ">
                  {navLinks.map((navlink) => (
                    <li key={navlink.id}>
                      <Link
                        className={`hover:text-gray-600 ${
                          mode === "light" ? "text-gray-800" : "text-white"
                        }`}
                        to={navlink.to}
                      >
                        {navlink.name}
                      </Link>
                    </li>
                  ))}

                  {user ? (
                    <li>
                      <Link
                        className={`hover:text-gray-600 ${
                          mode === "light" ? "text-gray-800" : "text-white"
                        }`}
                        to="/miscompras"
                      >
                        Mis Compras
                      </Link>
                    </li>
                  ) : null}
                  {user && user.rol === "Admin" ? (
                    <li className={`${showAdminMenu ? "relative " : ""} `}>
                      <Link
                        className={`hover:text-gray-600 ${
                          mode === "light" ? "text-gray-800" : "text-white"
                        }`}
                        onClick={toggleAdminMenu}
                      >
                        Admin
                      </Link>
                      {showAdminMenu ? (
                        <ul className=" bg-gray-700 rounded-md pt-2 absolute right-0 ">
                          <Link
                            to="/admin/usuarios"
                            className=" transition hover: focus: outline-none"
                          >
                            <li className="text-white p-2 transition-colors duration-300 ease-in-out  hover:text-gray-400">
                              Usuarios
                            </li>
                          </Link>
                          <Link
                            to="/admin/productos"
                            className=" transition hover: focus: outline-none"
                          >
                            <li className="text-white p-2  transition-colors duration-300 ease-in-out hover:text-gray-400">
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
                <div
                  className={`sm:flex sm:gap-4 ${
                    mode === "light" ? "text-gray-800" : "text-white"
                  }`}
                >
                  <div>
                    <UserModal />
                  </div>

                  <Link
                    className={`" mt-3 mr-2 hover:text-gray-700  ${
                      mode === "light" ? "text-gray-800" : "text-white"
                    }`}
                    to="/carrito"
                  >
                    <ShoppingCartIcon className="h-8 w-8" />
                    {cart.length > 0 ? <TotalItems /> : null}
                  </Link>
                  <ButtonDarkLightMode className="" />

                  <Link
                    className="rounded-md text-white bg-red-600 px-5 py-2.5 text-sm font-medium  shadow hover:text-red-900"
                    onClick={(e) => setOpen(true)}
                  >
                    <ArrowLeftOnRectangleIcon className="h-8 w-8" />
                  </Link>
                </div>
              ) : (
                // IF NOT LOGIN
                <div className="sm:flex sm:gap-4 h-full items-center">
                  <Link
                    className="rounded-md  px-5 py-2.5 text-l font-medium text-gray-800 bg-gray-300 bg-opacity-50 shadow transition hover:text-gray-100/75"
                    to="/login"
                  >
                    Acceder
                  </Link>

                  <div className="hidden sm:flex">
                    <Link
                      className="rounded-md  text-gray-200 px-5 py-2.5 text-l font-medium  bg-gray-700 bg-opacity-50 shadow transition hover:text-gray-500/75"
                      to="/register"
                    >
                      Registerse
                    </Link>
                  </div>
                  <Link className=" mr-2  " to="/carrito">
                    <ShoppingCartIcon
                      className={`h-8 w-8 hover:text-gray-600  ${
                        mode === "light" ? "text-gray-800" : "text-white"
                      }`}
                    />
                    {cart.length > 0 ? <TotalItems /> : null}
                  </Link>

                  <ButtonDarkLightMode className="" />
                </div>
              )}
            </div>

            <div className="block flex md:hidden">
              <Link
                className={`" mt-4 mr-2  ${
                  mode === "light" ? "text-gray-800" : "text-white"
                }`}
                to="/carrito"
              >
                <ShoppingCartIcon className="h-8 w-8 hover:text-gray-400" />
                {cart.length > 0 ? <TotalItems /> : null}
              </Link>
              <div className="flex justify-center items-center -mr-5">
                <ButtonDarkLightMode />
              </div>

              {showMenu ? (
                <>
                  <button
                    onClick={toggleMenu}
                    className={`rounded bg-transparent p-4   mr-4 focus:outline-none m-2 hover:border-transparent ${
                      mode === "light" ? "text-gray-800" : "text-white"
                    }`}
                  >
                    <XMarkIcon className="h-6 w-6  hover:text-gray-400" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={toggleMenu}
                    className={`rounded bg-transparent p-4   mr-4 focus:outline-none m-2 hover:border-transparent ${
                      mode === "light" ? "text-gray-800" : "text-white"
                    }`}
                  >
                    <Bars3Icon className="h-6 w-6  hover:text-gray-400" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* // movil nav */}

        <NavBarMobile
          showMenu={showMenu}
          toggleAdminMenu={toggleAdminMenu}
          showAdminMenu={showAdminMenu}
          setOpen={setOpen}
          toggleMenu={toggleMenu}
        />
      </header>
      {/* modal logout */}
      <ModalLogOut setOpen={setOpen} logout={logout} open={open} />
    </div>
  );
};

export default NavBar;
