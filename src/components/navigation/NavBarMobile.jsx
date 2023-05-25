import { Link } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import UserModalMovil from "./UserModalMovil";

const NavBarMobile = ({
  showMenu,
  toggleAdminMenu,
  showAdminMenu,
  setOpen,
  toggleMenu,
}) => {
  const { user } = UserAuth();

  return (
    <div>
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
              onClick={toggleMenu}
            >
              Inicio
            </Link>
          </li>

          <li className="p-2">
            <Link
              className=" text-white transition hover:text-gray-500/75 ml-4"
              to="/productos"
              onClick={toggleMenu}
            >
              Productos
            </Link>
          </li>

          <li className="p-2">
            <Link
              className=" text-white transition hover:text-gray-500/75  ml-4"
              to="/nosotros"
              onClick={toggleMenu}
            >
              Nosotros
            </Link>
          </li>

          {user ? (
            <li className="p-2">
              <Link
                className=" text-white transition hover:text-gray-500/75  ml-4"
                to="/miscompras"
                onClick={toggleMenu}
              >
                Mis Compras
              </Link>
            </li>
          ) : null}

          {/* IF ADMIN */}
          {user && user.rol === "Admin" ? (
            <li className="ml-5">
              <Link
                className="text-white transition hover:text-gray-500/75 focus: outline-none"
                onClick={toggleAdminMenu}
              >
                Administrador
              </Link>
              {showAdminMenu ? (
                <ul className="text-white bg-gray-800 rounded-md pt-2 ">
                  <Link
                    onClick={toggleMenu}
                    to="/admin/usuarios"
                    className="text-white transition hover:text-white focus: outline-none"
                  >
                    <li className="p-2 transition-colors duration-300 ease-in-out  hover:text-gray-400">
                      Usuarios
                    </li>
                  </Link>
                  <Link
                    onClick={toggleMenu}
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
                  onClick={toggleMenu}
                >
                  Login
                </Link>
              </li>

              <li className="mt-4 p-2">
                <Link
                  className="text-white transition hover:text-gray-500/75 ml-4 mt-6"
                  to="/register"
                  onClick={toggleMenu}
                >
                  Register
                </Link>
              </li>
            </ul>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NavBarMobile;
