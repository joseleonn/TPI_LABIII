// CREAMOS EL CONTEXT PARA PROVEER LA INFORMACION DEL USUARIO A TODA LA APP

import {
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
  sendPasswordResetEmail,
} from "firebase/auth";
import app, { auth } from "../firebase/Credentials";
import { useContext, useEffect, useState, createContext } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();
const firestore = getFirestore(app);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // FUNCION PARA OBTENER EL ROL Y PODER PASARLO A TODA LA APP JUNTO CON LOS DATOS DEL USER
  async function getRol(uid) {
    const docuRef = doc(firestore, `Usuarios/${uid}`);
    const docuCifrada = await getDoc(docuRef);

    const infoFinal = docuCifrada.data().rol;

    return infoFinal;
  }

  const handleSingIn = async (email, password) => {
    const auth = getAuth();
    const { user } = signInWithEmailAndPassword(auth, email, password);

    return signInWithEmailAndPassword(auth, email, password);
  };

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  function setUserWithFirebaseAndRol(user) {
    getRol(user.uid).then((rol) => {
      const userData = {
        uid: user.uid,
        email: user.email,
        rol: rol,
      };
      setUser(userData);
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserWithFirebaseAndRol(user);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const ResetPassword = (email) => {
    sendPasswordResetEmail(auth, email);
  };

  const value = { user, handleLogOut, handleSingIn, ResetPassword };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const UserAuth = () => {
  return useContext(AuthContext);
};
