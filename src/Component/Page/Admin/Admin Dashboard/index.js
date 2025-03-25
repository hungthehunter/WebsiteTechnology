import { Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  accessThunk,
  addressThunk,
  bannerThunk,
  categoryThunk,
  decentralizationThunk,
  exportThunk,
  functionThunk,
  importThunk,
  manufacturerThunk,
  orderThunk,
  productThunk,
  promotionThunk,
  reviewThunk,
  summaryThunk,
  userThunk,
} from "../../../../services/redux/thunks/thunk";
import { BASE_PATH } from "../../../Config/config";
import AdminAccess from "./Access/Access";
import AdminAddAccess from "./Access/AddAccess";
import AdminEditAccess from "./Access/EditAccess";
import "./assets/css/style.scss";
import AdminAddBanner from "./Banner/AddBanner";
import AdminBanner from "./Banner/Banner";
import AdminEditBanner from "./Banner/EditBanner";
import AdminViewBanner from "./Banner/ViewBanner";
import AdminAddCategory from "./Category/AddCategory";
import AdminCategory from "./Category/Category";
import AdminEditCategory from "./Category/EditCategory";
import AdminViewCategory from "./Category/ViewCategory";
import AdminChart from "./Chart";
import AdminAddCustomer from "./Customer/AddCustomer";
import AdminCustomer from "./Customer/Customer";
import AdminEditCustomer from "./Customer/EditCustomer";
import AdminViewCustomer from "./Customer/ViewCustomer";
import AdminDashboard from "./Dashboard";
import AdminAddExport from "./Export/AddExport";
import AdminEditExport from "./Export/EditExport";
import AdminExport from "./Export/Export";
import AdminViewExport from "./Export/ViewExport";
import AdminHeader from "./Header";
import AdminAddImport from "./Import/AddImport";
import AdminEditImport from "./Import/EditImport";
import AdminImport from "./Import/Import";
import AdminViewImport from "./Import/ViewImport";
import AdminAddManufacturer from "./Manufacturer/AddManufacturer";
import AdminEditManufacturer from "./Manufacturer/EditManufacturer";
import AdminManufacturer from "./Manufacturer/Manufacturer";
import AdminViewManufacturer from "./Manufacturer/ViewManufacturer";
import AdminEditOrder from "./Order/EditOrder";
import AdminOrder from "./Order/Order";
import AdminViewOrder from "./Order/ViewOrder";
import AdminAddProduct from "./Product/AddProduct";
import AdminEditProduct from "./Product/EditProduct";
import AdminProduct from "./Product/Product";
import AdminViewProduct from "./Product/ViewProduct";
import AdminAddPromotion from "./Promotion/AddPromotion";
import AdminEditPromotion from "./Promotion/EditPromotion";
import AdminPromotion from "./Promotion/Promotion";
import AdminViewPromotion from "./Promotion/ViewPromotion";
import SidebarAdmin from "./Sidebar";
import AdminAddStaff from "./Staff/AddStaff";
import AdminEditStaff from "./Staff/EditStaff";
import AdminStaff from "./Staff/Staff";
import AdminViewStaff from "./Staff/ViewStaff";
import NotAllowedPage from "./warning/NotAllowPage";
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
          dispatch(promotionThunk.getAllPromotions()).unwrap(),
          dispatch(functionThunk.getAllFunctions()).unwrap(),
          dispatch(accessThunk.getAllAccess()).unwrap(),
          dispatch(decentralizationThunk.getAllDecentralization()).unwrap(),
          dispatch(promotionThunk.getAllPromotions()).unwrap(),
          dispatch(categoryThunk.getAllCategories()).unwrap(),
          dispatch(manufacturerThunk.getAllManufacturers()).unwrap(),
          dispatch(importThunk.getAllImports()).unwrap(),
          dispatch(exportThunk.getAllExports()).unwrap(),
          dispatch(bannerThunk.getAllBanners()).unwrap(),
          dispatch(summaryThunk.getAllSummary()).unwrap(),
          dispatch(reviewThunk.getAllReviews()).unwrap()
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
    const renderComponent = () => {
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
        case "AdminAddCategory":
          return checkPermission("Create Category") ? (
            <AdminAddCategory
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
          return checkPermission("View Chart") ? <AdminChart setActiveComponent={setActiveComponent}/> : null;

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

        case "AdminPromotion":
          return checkPermission("View Promotion List") ? (
            <AdminPromotion
              setActiveComponent={setActiveComponent}
              showAlert={showAlert}
            />
          ) : null;

        case "AdminAddPromotion":
          return checkPermission("Create Promotion") ? (
            <AdminAddPromotion
              setActiveComponent={setActiveComponent}
              showAlert={showAlert}
            />
          ) : null;

          case "AdminViewPromotion":
          return checkPermission("View Promotion List") ? (
            <AdminViewPromotion
              id={activeComponent.props.id}
              setActiveComponent={setActiveComponent}
              showAlert={showAlert}
            />
          ) : null;

          case "AdminEditPromotion":
          return checkPermission("Edit Promotion") ? (
            <AdminEditPromotion
              id={activeComponent.props.id}
              setActiveComponent={setActiveComponent}
              showAlert={showAlert}
            />
          ) : null;

          case "AdminBanner":
            return checkPermission("View Banner List") ? (
              <AdminBanner
              setActiveComponent={setActiveComponent}
              showAlert={showAlert}
            />
            
            ) :null

            case "AdminViewBanner":
              return checkPermission("View Banner List") ? (
                <AdminViewBanner
                id={activeComponent.props.id}
                setActiveComponent={setActiveComponent}
                showAlert={showAlert}
              />
              
              ) :null

              case "AdminEditBanner":
                return checkPermission("Edit Banner") ? (
                  <AdminEditBanner
                  id={activeComponent.props.id}
                  setActiveComponent={setActiveComponent}
                  showAlert={showAlert}
                />
                
                ) :null

                case "AdminAddBanner":
                  return checkPermission("Create Banner") ? (
                    <AdminAddBanner
                    setActiveComponent={setActiveComponent}
                    showAlert={showAlert}
                  />
                  
                  ) :null

        default:
          return null;
      }
    };

    const component = renderComponent();
    return component === null ? (
      <NotAllowedPage setActiveComponent={setActiveComponent} />
    ) : (
      component
    );
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

  // Đá người dùng ra nếu nó không là role = Admin hoặc role = Employee hoặc chưa đăng nhập
  useEffect(() => {
    if (
      !userCurrentLogged ||
      (userCurrentLogged.role !== "Employee" && userCurrentLogged.role !== "Admin")
    ) {
      navigate(`${BASE_PATH}/**`);
    }
  }, [userCurrentLogged, navigate]);

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
    </ThemeProvider>
  );
}
export default AdminPage;
