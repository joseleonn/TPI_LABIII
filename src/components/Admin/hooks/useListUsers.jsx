import React, { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
} from "firebase/firestore";

const useListUsers = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const querydb = getFirestore();
    const users = collection(querydb, "Usuarios");

    getDocs(users).then((res) =>
      setData(
        res.docs.map((user) => ({
          id: user.id,
          ...user.data(),
        }))
      )
    );
  }, []);
  return { data };
};

export default useListUsers;
