import { Link } from "react-router-dom";
import { ModeContext } from "../../context/DarkLightModeContext";
import { useContext } from "react";

const Footer = () => {
  const { mode } = useContext(ModeContext);

  return (
    <footer aria-label="Site Footer" className="bg-transparent mt-auto	">
      <div className="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24">
        <div className="lg:flex lg:items-end lg:justify-between">
          <div>
            <div className="flex justify-center  lg:justify-start">
              <p
                className={`font-bold ${
                  mode === "light" ? "text-black " : "text-white "
                }`}
              >
                INDUMENTARIA 21
              </p>
            </div>

            <p
              className={`mx-auto mt-6 max-w-md text-center leading-relaxed lg:text-left ${
                mode === "light" ? "text-black " : "text-white "
              }`}
            >
              Somos una marca de ropa emergente enfocada en brindar calidad y un
              estilo unico.
            </p>
          </div>

          <nav aria-label="Footer Nav" className="mt-12 lg:mt-0">
            <ul className="flex flex-wrap justify-center gap-6 md:gap-8 lg:justify-end lg:gap-12">
              <li>
                <Link
                  className={`transition hover:text-gray-700/75 ${
                    mode === "light" ? "text-black " : "text-white "
                  }`}
                  to="/"
                >
                  Inicio
                </Link>
              </li>

              <li>
                <Link
                  className={`transition hover:text-gray-700/75 ${
                    mode === "light" ? "text-black " : "text-white "
                  }`}
                  to="/productos"
                >
                  Productos
                </Link>
              </li>

              <li>
                <Link
                  className={`transition hover:text-gray-700/75 ${
                    mode === "light" ? "text-black " : "text-white "
                  }`}
                  to="/nosotros"
                >
                  Nosotros
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <p className="mt-12 text-center text-sm text-gray-500 lg:text-right">
          Copyright &copy; 2022. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
