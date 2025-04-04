import { BASE_PATH } from "../Component/Config/config.js";
import BodyOnly from "../Component/Layout/Component/BodyOnly/index.js";
import HeaderOnly from "../Component/Layout/Component/HeaderOnly/index.js";
import AccountAddress from "../Component/Page/Account_History/AccountAddress.js";
import AccountDetail from "../Component/Page/Account_History/AccountDetail.js";
import AccountHeader from "../Component/Page/Account_History/AccountHeader.js";
import AccountOrder from "../Component/Page/Account_History/AccountOrder.js";
import AccountProductHistory from "../Component/Page/Account_History/AccountProductHistory.js";
import AccountHistory from "../Component/Page/Account_History/index.js";
import AdminAccess from "../Component/Page/Admin/Admin Dashboard/Access/Access.js";
import AdminAddAccess from "../Component/Page/Admin/Admin Dashboard/Access/AddAccess.js";
import AdminEditAccess from "../Component/Page/Admin/Admin Dashboard/Access/EditAccess.js";
import AdminAddCategory from "../Component/Page/Admin/Admin Dashboard/Category/AddCategory.js";
import AdminCategory from "../Component/Page/Admin/Admin Dashboard/Category/Category.js";
import AdminEditCategory from "../Component/Page/Admin/Admin Dashboard/Category/EditCategory.js";
import AdminViewCategory from "../Component/Page/Admin/Admin Dashboard/Category/ViewCategory.js";
import AdminChart from "../Component/Page/Admin/Admin Dashboard/Chart.js";
import AdminCustomer from "../Component/Page/Admin/Admin Dashboard/Customer/Customer.js";
import AdminViewCustomer from "../Component/Page/Admin/Admin Dashboard/Customer/ViewCustomer.js";
import AdminEditExport from "../Component/Page/Admin/Admin Dashboard/Export/EditExport.js";
import AdminExport from "../Component/Page/Admin/Admin Dashboard/Export/Export.js";
import AdminEditImport from "../Component/Page/Admin/Admin Dashboard/Import/EditImport.js";
import AdminImport from "../Component/Page/Admin/Admin Dashboard/Import/Import.js";
import AdminAddManufacturer from "../Component/Page/Admin/Admin Dashboard/Manufacturer/AddManufacturer.js";
import AdminEditManufacturer from "../Component/Page/Admin/Admin Dashboard/Manufacturer/EditManufacturer.js";
import {
  default as AdminDecentralization,
  default as AdminManufacturer,
} from "../Component/Page/Admin/Admin Dashboard/Manufacturer/Manufacturer.js";
import AdminViewManufacturer from "../Component/Page/Admin/Admin Dashboard/Manufacturer/ViewManufacturer.js";
import AdminEditOrder from "../Component/Page/Admin/Admin Dashboard/Order/EditOrder.js";
import AdminOrder from "../Component/Page/Admin/Admin Dashboard/Order/Order.js";
import AdminViewOrder from "../Component/Page/Admin/Admin Dashboard/Order/ViewOrder.js";
import AdminProduct from "../Component/Page/Admin/Admin Dashboard/Product/Product.js";
import AdminAddStaff from "../Component/Page/Admin/Admin Dashboard/Staff/AddStaff.js";
import AdminEditStaff from "../Component/Page/Admin/Admin Dashboard/Staff/EditStaff.js";
import AdminStaff from "../Component/Page/Admin/Admin Dashboard/Staff/Staff.js";
import AdminViewStaff from "../Component/Page/Admin/Admin Dashboard/Staff/ViewStaff.js";
import {
  default as AdminDashboard,
  default as AdminPage,
} from "../Component/Page/Admin/Admin Dashboard/index.js";
import NotAllowedPage from "../Component/Page/Admin/Admin Dashboard/warning/NotAllowPage.js";
import CartPage from "../Component/Page/Cart/Cart.js";
import CartItem from "../Component/Page/Cart/CartItem/CartItem.js";
import CartList from "../Component/Page/Cart/CartList/CartList.js";
import OrderDetail from "../Component/Page/Cart/OrderDetail/OrderDetail.js";
import ErrorPage from "../Component/Page/Error/404.js";
import Login from "../Component/Page/LoginSignup/Login.js";
import SignUp from "../Component/Page/LoginSignup/SignUp.js";
import NVDIA_STORE_MAIN from "../Component/Page/Main/NVDIA_STORE_MAIN.js";
import Policy from "../Component/Page/Policy/index.js";
import ProductDetail from "../Component/Page/Products/DetailProducts/product-detail-card-slider-master/index.js";
import ProductReview from "../Component/Page/Review/Review.js";
import ProductDetailll from "../Component/Page/Searching/index.js";
import Shop from "../Component/Page/Shop/index.js";
import SuccessOrder from "../Component/Page/Success/index.js";

// Routes với tiền tố BASE_PATH
const publicRoutes = [
  {
    path: `${BASE_PATH}`,
    component: NVDIA_STORE_MAIN,
  },
  {
    path: `${BASE_PATH}/Shop`,
    component: Shop,
  },
  {
    path: `${BASE_PATH}/SignUp`,
    component: SignUp,
    layout: HeaderOnly,
  },
  {
    path: `${BASE_PATH}/Main`,
    component: NVDIA_STORE_MAIN,
  },
  {
    path: `${BASE_PATH}/Policy`,
    component: Policy,
  },
  {
    path: `${BASE_PATH}/Login`,
    component: Login,
    layout: HeaderOnly,
  },
  {
    path: `${BASE_PATH}/AdminDashboard`,
    component: AdminDashboard,
    layout: BodyOnly,
  },
  {
    path: `${BASE_PATH}/AdminPage`,
    component: AdminPage,
    layout: BodyOnly,
  },
  {
    path: `${BASE_PATH}/AdminCustomer`,
    component: AdminCustomer,
    layout: BodyOnly,
  },
  {
    path: `${BASE_PATH}/AdminProduct`,
    component: AdminProduct,
    layout: BodyOnly,
  },
  {
    path: `${BASE_PATH}/AdminOrder`,
    component: AdminOrder,
    layout: BodyOnly,
  },
  {
    path: `${BASE_PATH}/AdminStaff`,
    component: AdminStaff,
    layout: BodyOnly,
  },
  {
    path: `${BASE_PATH}/AdminDecentralization`,
    component: AdminDecentralization,
    layout: BodyOnly,
  },
  {
    path: `${BASE_PATH}/AdminViewCustomer`,
    component: AdminViewCustomer,
    layout: BodyOnly,
  },
  {
    path: `${BASE_PATH}/AdminViewOrder`,
    component: AdminViewOrder,
    layout: BodyOnly,
  },
  {
    path: `${BASE_PATH}/ProductDetail/:productName`,
    component: ProductDetail,
  },
  {
    path: `${BASE_PATH}/Access`,
    component: AdminAccess,
    layout: BodyOnly,
  },
  {
    path: `${BASE_PATH}/AddAccess`,
    component: AdminAddAccess,
    layout: BodyOnly,
  },
  {
    path: `${BASE_PATH}/EditAccess`,
    component: AdminEditAccess,
    layout: BodyOnly,
  },
  {
    path: `${BASE_PATH}/AdminEditOrder`,
    component: AdminEditOrder,
    layout: BodyOnly,
  },
  {
    path: `${BASE_PATH}/AdminAddStaff`,
    component: AdminAddStaff,
    layout: BodyOnly,
  },
  {
    path: `${BASE_PATH}/AdminViewStaff`,
    component: AdminViewStaff,
    layout: BodyOnly,
  },
  {
    path: `${BASE_PATH}/AdminEditStaff`,
    component: AdminEditStaff,
    layout: BodyOnly,
  },
  {
    path: `${BASE_PATH}/AdminCategory`,
    component: AdminCategory,
    layout: BodyOnly,
  },
  {
    path: `${BASE_PATH}/AdminAddCategory`,
    component: AdminAddCategory,
    layout: BodyOnly,
  },
  {
    path: `${BASE_PATH}/AdminEditCategory`,
    component: AdminEditCategory,
    layout: BodyOnly,
  },
  {
    path: `${BASE_PATH}/AdminViewCategory`,
    component: AdminViewCategory,
    layout: BodyOnly,
  },
  {
    path: `${BASE_PATH}/AdminManufacturer`,
    component: AdminManufacturer,
    layout: BodyOnly,
  },
  {
    path: `${BASE_PATH}/AdminAddManufacturer`,
    component: AdminAddManufacturer,
    layout: BodyOnly,
  },
  {
    path: `${BASE_PATH}/AdminEditManufacturer`,
    component: AdminEditManufacturer,
    layout: BodyOnly,
  },
  {
    path: `${BASE_PATH}/AdminViewManufacturer`,
    component: AdminViewManufacturer,
    layout: BodyOnly,
  },
  {
    path: `${BASE_PATH}/AdminChart`,
    component: AdminChart,
    layout: BodyOnly,
  },
  {
    path: `${BASE_PATH}/AccountHistory`,
    component: AccountHistory,
  },
  {
    path: `${BASE_PATH}/SuccessOrder`,
    component: SuccessOrder,
  },
  {
    path: `${BASE_PATH}/AccountDetail`,
    component: AccountDetail,
  },
  {
    path: `${BASE_PATH}/AccountHeader`,
    component: AccountHeader,
  },
  {
    path: `${BASE_PATH}/AccountProductHistory`,
    component: AccountProductHistory,
  },
  {
    path: `${BASE_PATH}/AccountAddress`,
    component: AccountAddress,
  },
  {
    path: `${BASE_PATH}/AccountOrder`,
    component: AccountOrder,
  },
  {
    path: `${BASE_PATH}/AdminExport`,
    component: AdminExport,
    layout: BodyOnly,
  },
  {
    path: `${BASE_PATH}/AdminImport`,
    component: AdminImport,
    layout: BodyOnly,
  },
  {
    path: `${BASE_PATH}/AdminEditImport`,
    component: AdminEditImport,
    layout: BodyOnly,
  },
  {
    path: `${BASE_PATH}/AdminEditExport`,
    component: AdminEditExport,
    layout: BodyOnly,
  },
  {
    path: `${BASE_PATH}/Review`,
    component: ProductReview,
    layout: BodyOnly,
  },
  {
    path: `${BASE_PATH}/NotAllowPage`,
    component: NotAllowedPage,
    layout: BodyOnly,
  },
  {
    path: `${BASE_PATH}/CartPage`,
    component: CartPage,
  },
  {
    path: `${BASE_PATH}/CartItem`,
    component: CartItem,
    layout: BodyOnly,
  },
  {
    path: `${BASE_PATH}/CartList`,
    component: CartList,
    layout: BodyOnly,
  },
  {
    path: `${BASE_PATH}/OrderDetail`,
    component: OrderDetail,
    layout: BodyOnly,
  },

  {
    path: `${BASE_PATH}/ProductDetailll/:productName`,
    component: ProductDetailll,
    layout: BodyOnly,
  },
  {
    path: `${BASE_PATH}/*`,
    component: ErrorPage,
  },
];

const privateRoutes = {};

export { privateRoutes, publicRoutes };

