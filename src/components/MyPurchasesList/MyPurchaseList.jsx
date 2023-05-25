import { CartUseContext } from "../../context/CartContext";

const MyPurchaseList = () => {
  const { pedidosData } = CartUseContext();

  return (
    <div className="mt-14  ">
      <h1 className="text-center p-6 text-white">Mis Compras</h1>
      <div className="overflow-x-auto  ">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white  text-sm">
          <thead className="ltr:text-left rtl:text-right ">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Nro de orden
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Fecha de compra
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Productos
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Total
              </th>
            </tr>
          </thead>
          {pedidosData ? (
            <tbody className=" divide-y-2 divide-gray-200">
              {pedidosData.map((pedido) => (
                <tr key={pedido.id} className="odd:bg-gray-50 bg-white ">
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {pedido.OrderNum}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {new Date(pedido.Date.seconds * 1000).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
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
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    $ {pedido.Total}
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <p className="text-white">No tienes compras realizadas</p>
          )}
        </table>
      </div>
    </div>
  );
};

export default MyPurchaseList;
