import NavBar from "../../components/navigation/NavBar";
import Footer from "../../components/navigation/Footer";
import AdminManagment from "../../components/Admin/AdminManagment";
import AdminListProducts from "../../components/Admin/AdminListProducts";
import AdminListUsers from "../../components/Admin/AdminListUsers";
const AdminDashboard = () => {
  return (
    <>
      <NavBar />
      {/* <AdminListProducts /> */}
      <AdminListUsers />
      <Footer />
    </>
  );
};

export default AdminDashboard;
