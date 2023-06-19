import { useParams } from "react-router-dom";
import { db } from "../../../../firebase/Credentials";
import { getDoc, collection, doc } from "firebase/firestore";
import { useEffect, useState } from "react";

const useProductDetail = () => {
  const [product, setProductInfo] = useState(null);
  const { productId } = useParams();

  //funcion para obetener informacion del producto especifio en la base de datos
  const getProductById = async () => {
    const collectionRef = collection(db, "Products");
    const docuRef = doc(collectionRef, productId);
    const snapDoc = await getDoc(docuRef);
    const producto = snapDoc.data();
    return producto;
  };

  useEffect(() => {
    const getProduct = async () => {
      const product = await getProductById(productId);
      setProductInfo({ ...product, id: productId });
      console.log(product);
    };
    getProduct();
  }, [productId]);
  return { product };
};

export default useProductDetail;
