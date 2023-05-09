import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

const AdminManagment = () => {
  const { user } = UserAuth();
  const navigate = useNavigate();

  if (!user) {
    return <div>Cargando...</div>; // Muestra un indicador de carga o mensaje de espera mientras se obtiene el usuario
  }
  return (
    <div>
      {user.rol === "Admin" ? (
        <p className="text-xl text-white ">sos admin</p>
      ) : (
        navigate("/")
      )}
    </div>
  );
};

export default AdminManagment;
