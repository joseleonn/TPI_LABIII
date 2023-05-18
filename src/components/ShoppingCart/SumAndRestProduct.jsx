import { CartUseContext } from "../../context/CartContext";

const SumAndRestProduct = ({ product, quanty }) => {
  const { cart, setCart, addToCart } = CartUseContext();

  //funcion para restar productos
  const decreseProduct = () => {
    const productrepeat = cart.find((item) => item.id === product.id);

    if (productrepeat.quanty !== 1) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...product, quanty: productrepeat.quanty - 1 }
            : item
        )
      );
    }
  };

  return (
    <div className="flex items-center gap-4">
      <p
        className="p-4 text-xl font-bold cursor-pointer	"
        onClick={() => addToCart(product)}
      >
        +
      </p>
      <p>{quanty}</p>
      <p
        className="p-4 text-xl font-bold cursor-pointer	"
        onClick={() => decreseProduct(product)}
      >
        -
      </p>
    </div>
  );
};

export default SumAndRestProduct;
