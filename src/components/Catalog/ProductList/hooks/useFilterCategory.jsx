import { useEffect, useState } from "react";
import { CartUseContext } from "../../../../context/CartContext";

const useFilterCategory = () => {
  const [categ, setCateg] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { data } = CartUseContext();

  //funcion para trarerme categ
  const categFunc = (categoria) => {
    setCateg(categoria);
  };

  //funcion para filtrar por categoria

  useEffect(() => {
    if (categ !== "") {
      if (categ === "todos") {
        setFilteredProducts(data);
      } else {
        const filter = data.filter((producto) => producto.categoria === categ);
        setFilteredProducts(filter);
      }
    } else {
      setFilteredProducts(data);
    }
  }, [data, categ]);
  return { filteredProducts, categFunc };
};

export default useFilterCategory;
