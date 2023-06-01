import { CartUseContext } from "../../context/CartContext";

const MyPurchaseList = () => {
  const { pedidosData } = CartUseContext();

  return (
    <div className="mt-14  w-full  ">
      <h1 className="text-center p-6 text-white">Mis Compras</h1>
      <div className=" flex justify-center rounded-md  max-w-screen w-full max-h-screen  ">
        <ul className="flex flex-col  justify-center ">
          {pedidosData ? (
            <div className=" divide-y-2 divide-gray-200 ">
              {pedidosData.map((pedido) => (
                <li key={pedido.id} className="odd:bg-gray-50 bg-white flex ">
                  <span className="whitespace-nowrap px-4 py-2  text-gray-700">
                    <p>Nro de pedido</p>
                    {pedido.OrderNum}
                  </span>
                  <span className="whitespace-nowrap px-4 py-2 text-gray-700">
                    <p>Fecha de compra</p>
                    {new Date(pedido.Date.seconds * 1000).toLocaleDateString()}
                  </span>
                  <span className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {/* Mostrar los valores específicos dentro de pedido.Products */}
                    {pedido.Products.map((producto) => (
                      <div key={producto.id} className="flex pt-1">
                        <img src={producto.url} alt="" className="h-8 w-8" />
                        <div>
                          <p>{producto.nombre}</p>
                          <p>$ {producto.precio}</p>
                          <p>Cantidad: {producto.quanty}</p>
                        </div>
                      </div>
                    ))}
                  </span>
                  <span className="whitespace-nowrap px-4 py-2 text-gray-700">
                    <p>Total de la compra</p>$ {pedido.Total}
                  </span>
                </li>
              ))}
            </div>
          ) : (
            <p className="text-white">No tienes compras realizadas</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MyPurchaseList;
