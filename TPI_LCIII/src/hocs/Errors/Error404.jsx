import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div>
      <div className="grid  mt-48 px-4 bg-white place-content-center">
        <h1 className="tracking-widest text-gray-500 uppercase">
          404 | No Encontrada
        </h1>
      </div>

      {/* button  */}
      <div className="flex flex-col items-center">
        <Link
          className="group relative inline-block overflow-hidden border border-gray-600 px-8 py-3 mt-12 focus:outline-none focus:ring"
          to="/"
        >
          <span className="absolute inset-y-0 left-0 w-[2px] bg-gray-600 transition-all group-hover:w-full group-active:bg-gray-500"></span>

          <span className="relative text-sm font-medium text-gray-600 transition-colors group-hover:text-white">
            Volver
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Error404;
