import NavBar from "../../components/navigation/NavBar";
import Footer from "../../components/navigation/Footer";
import AdminManagment from "../../components/Admin/AdminManagment";
import AdminListProducts from "../../components/Admin/AdminListProducts";
const AdminDashboard = () => {
  return (
    <>
      <NavBar />
      <AdminListProducts />
      <Footer />
    </>
  );
};

export default AdminDashboard;
