import { Box } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { FaExclamationCircle } from "react-icons/fa"; // Biểu tượng
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  accessThunk,
  addressThunk,
  categoryThunk,
  decentralizationThunk,
  exportThunk,
  functionThunk,
  importThunk,
  manufacturerThunk,
  orderThunk,
  productThunk,
  promotionThunk,
  userThunk,
} from "../../../../services/redux/thunks/thunk";
import AdminAccess from "./Access";
import AdminAddAccess from "./AddAccess";
import AdminAddCustomer from "./AddCustomer";
import AdminAddExport from "./AddExport";
import AdminAddImport from "./AddImport";
import AdminAddManufacturer from "./AddManufacturer";
import AdminAddProduct from "./AddProduct";
import AdminAddStaff from "./AddStaff";
import "./assets/css/style.scss";
import AdminCategory from "./Category";
import AdminChart from "./Chart";
import AdminCustomer from "./Customer";
import AdminDashboard from "./Dashboard";
import AdminEditAccess from "./EditAccess";
import AdminEditCategory from "./EditCategory";
import AdminEditCustomer from "./EditCustomer";
import AdminEditExport from "./EditExport";
import AdminEditImport from "./EditImport";
import AdminEditManufacturer from "./EditManufacturer";
import AdminEditOrder from "./EditOrder";
import AdminEditProduct from "./EditProduct";
import AdminEditStaff from "./EditStaff";
import AdminExport from "./Export";
import AdminHeader from "./Header";
import AdminImport from "./Import";
import AdminManufacturer from "./Manufacturer";
import AdminOrder from "./Order";
import AdminProduct from "./Product";
import SidebarAdmin from "./Sidebar";
import AdminStaff from "./Staff";
import AdminViewCategory from "./ViewCategory";
import AdminViewCustomer from "./ViewCustomer";
import AdminViewExport from "./ViewExport";
import AdminViewImport from "./ViewImport";
import AdminViewManufacturer from "./ViewManufacturer";
import AdminViewOrder from "./ViewOrder";
import AdminViewProduct from "./ViewProduct";
import AdminViewStaff from "./ViewStaff";
// Tạo theme tùy chỉnh
const theme = createTheme({
  palette: {
    primary: {
      main: "#2a2185", // Màu chính cho theme
    },
    secondary: {
      main: "#f50057", // Màu phụ cho theme
    },
  },
});
function AdminPage() {
  /*------- Dispatch function -------*/
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(orderThunk.getAllOrders()).unwrap(),
          dispatch(addressThunk.getAllAddresses()).unwrap(),
          dispatch(userThunk.getAllUsers()).unwrap(),
          dispatch(productThunk.getAllProduct()).unwrap(),
          dispatch(functionThunk.getAllFunctions()).unwrap(),
          dispatch(accessThunk.getAllAccess()).unwrap(),
          dispatch(decentralizationThunk.getAllDecentralization()).unwrap(),
          dispatch(promotionThunk.getAllPromotions()).unwrap(),
          dispatch(categoryThunk.getAllCategories()).unwrap(),
          dispatch(manufacturerThunk.getAllManufacturers()).unwrap(),
          dispatch(importThunk.getAllImports()).unwrap(),
          dispatch(exportThunk.getAllExports()).unwrap,
        ]);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  /*------- Data function -------*/
  const userCurrentLogged = useSelector(
    (state) => state.user.userCurrentLogged
  );
  /*------- Page function -------*/

  const [activeIndex, setActiveIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const [menuActive, setMenuActive] = useState(true);
  const [activeComponent, setActiveComponent] = useState({
    name: "AdminDashboard",
    props: {},
  });

  const handleMouseOver = (index) => {
    setActiveIndex(index);
  };

  // Snackbar alert state
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(""); // "success" or "error"
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const showAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setOpenSnackbar(true);
  };

  // Dashboard: Handle change main page

  const getActiveComponent = () => {
    switch (activeComponent.name) {
      case "AdminDashboard":
        return <AdminDashboard />;
      case "AdminCustomer":
        return checkPermission("View Customer List") ? (
          <AdminCustomer
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        ) : null;
      case "AdminOrder":
        return checkPermission("View Order List") ? (
          <AdminOrder
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        ) : null;

      case "AdminViewOrder":
        return checkPermission("View Order List") ? (
          <AdminViewOrder
            id={activeComponent.props.id}
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        ) : null;

      case "AdminProduct":
        return checkPermission("View Product List") ? (
          <AdminProduct
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        ) : null;
      case "AdminStaff":
        return checkPermission("View Staff List") ? (
          <AdminStaff
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        ) : null;
      case "AdminAddCustomer":
        return checkPermission("Create Customer") ? (
          <AdminAddCustomer
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        ) : null;
      case "AdminCategory":
        return checkPermission("View Category List") ? (
          <AdminCategory
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        ) : null;
      case "AdminManufacturer":
        return checkPermission("View Manufacturer List") ? (
          <AdminManufacturer
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        ) : null;
      case "AdminAddManufacturer":
        return checkPermission("Create Manufacturer") ? (
          <AdminAddManufacturer
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        ) : null;
      case "AdminEditManufacturer":
        return checkPermission("Edit Manufacturer") ? (
          <AdminEditManufacturer
            id={activeComponent.props.id}
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        ) : null;
      case "AdminViewManufacturer":
        return checkPermission("View Manufacturer List") ? (
          <AdminViewManufacturer
            id={activeComponent.props.id}
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        ) : null;
      case "AdminViewCustomer":
        return checkPermission("View Customer List") ? (
          <AdminViewCustomer
            id={activeComponent.props.id}
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        ) : null;
      case "AdminEditCustomer":
        return checkPermission("Edit Customer") ? (
          <AdminEditCustomer
            id={activeComponent.props.id}
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        ) : null;
      case "AdminViewProduct":
        return checkPermission("View Product List") ? (
          <AdminViewProduct
            id={activeComponent.props.id}
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        ) : null;
      case "AdminViewCategory":
        return checkPermission("View Category List") ? (
          <AdminViewCategory
            id={activeComponent.props.id}
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        ) : null;
      case "AdminEditProduct":
        return checkPermission("Edit Product") ? (
          <AdminEditProduct
            id={activeComponent.props.id}
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        ) : null;
      case "AdminAddProduct":
        return checkPermission("Create Product") ? (
          <AdminAddProduct
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        ) : null;
      case "AdminEditCategory":
        return checkPermission("Edit Category") ? (
          <AdminEditCategory
            id={activeComponent.props.id}
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        ) : null;
      case "AdminEditOrder":
        return checkPermission("Edit Order") ? (
          <AdminEditOrder
            id={activeComponent.props.id}
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        ) : null;
      case "AdminAddStaff":
        return checkPermission("Create Staff") ? (
          <AdminAddStaff
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        ) : null;
      case "AdminViewStaff":
        return checkPermission("View Staff List") ? (
          <AdminViewStaff
            id={activeComponent.props.id}
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        ) : null;
      case "AdminEditStaff":
        return checkPermission("Edit Staff") ? (
          <AdminEditStaff
            id={activeComponent.props.id}
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        ) : null;
      case "AdminAccess":
        return checkPermission("View Access List") ? (
          <AdminAccess
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        ) : null;
      case "AdminEditAccess":
        return checkPermission("Edit Access") ? (
          <AdminEditAccess
            id={activeComponent.props.id}
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        ) : null;
      case "AdminAddAccess":
        return checkPermission("Create Access") ? (
          <AdminAddAccess
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        ) : null;
      case "AdminChart":
        return checkPermission("View Chart") ? <AdminChart /> : null;

      case "AdminExport":
        return checkPermission("View Export List") ? (
          <AdminExport
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        ) : null;

      case "AdminAddExport":
        return checkPermission("Create Export") ? (
          <AdminAddExport
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        ) : null;

      case "AdminEditExport":
        return checkPermission("Edit Export") ? (
          <AdminEditExport
            id={activeComponent.props.id}
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        ) : null;

      case "AdminImport":
        return checkPermission("View Import List") ? (
          <AdminImport
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        ) : null;

      case "AdminAddImport":
        return checkPermission("Create Import") ? (
          <AdminAddImport
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        ) : null;

      case "AdminEditImport":
        return checkPermission("Edit Import") ? (
          <AdminEditImport
            id={activeComponent.props.id}
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        ) : null;

        case "AdminViewImport":
          return checkPermission("View Import List") ? (
            <AdminViewImport
              id={activeComponent.props.id}
              setActiveComponent={setActiveComponent}
              showAlert={showAlert}
            />
          ) : null;

          case "AdminViewExport":
            return checkPermission("View Export List") ? (
              <AdminViewExport
                id={activeComponent.props.id}
                setActiveComponent={setActiveComponent}
                showAlert={showAlert}
              />
            ) : null;

      default:
        handleAccessDenied();
        return null;
    }
  };

  const handleAccessDenied = () => {
    if (!open) {
      // Chỉ mở Snackbar nếu nó chưa mở
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false); // Đóng Snackbar
  };

  const checkPermission = (permissionName) => {
    // Kiểm tra xem người dùng có quyền truy cập vào chức năng không
    if (
      !userCurrentLogged ||
      !userCurrentLogged.decentralization ||
      !userCurrentLogged.decentralization.functionIds
    )
      return false;

    return userCurrentLogged.decentralization.functionIds.some(
      (func) => func.functionName === permissionName && func.status
    );
  };

  return (
    <ThemeProvider theme={theme}>
      {" "}
      {/* Thêm ThemeProvider */}
      <Box className="adminDashboard">
        <Box className="container">
          <SidebarAdmin
            activeIndex={activeIndex}
            handleMouseOver={handleMouseOver}
            setActiveComponent={setActiveComponent}
            menuActive={menuActive}
          />

          <Box className={`main ${menuActive ? "active" : ""}`}>
            <AdminHeader
              toggleMenu={toggleMenu}
              menuActive={menuActive}
              openSnackbar={openSnackbar}
              alertMessage={alertMessage}
              alertType={alertType}
              handleCloseSnackbar={handleCloseSnackbar}
            />

            {getActiveComponent(activeComponent)}
          </Box>
        </Box>
      </Box>
      {/* Snackbar thông báo */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FaExclamationCircle style={{ marginRight: "8px" }} />{" "}
            {/* Biểu tượng */}
            <div>
              <div style={{ fontWeight: "bold" }}>Access Denied</div>{" "}
              {/* Tiêu đề */}
              <div>You are not allowed to go there.</div>{" "}
              {/* Dòng chữ bên dưới */}
            </div>
          </div>
        </MuiAlert>
      </Snackbar>
    </ThemeProvider>
  );
}
export default AdminPage;
