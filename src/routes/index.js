import BodyOnly from "../Component/Layout/Component/BodyOnly/index.js";
import HeaderOnly from "../Component/Layout/Component/HeaderOnly/index.js";
import AccountAddress from "../Component/Page/Account_History/AccountAddress.js";
import AccountDetail from "../Component/Page/Account_History/AccountDetail.js";
import AccountHeader from "../Component/Page/Account_History/AccountHeader.js";
import AccountOrder from "../Component/Page/Account_History/AccountOrder.js";
import AccountProductHistory from "../Component/Page/Account_History/AccountProductHistory.js";
import AccountHistory from "../Component/Page/Account_History/index.js";
import AdminAccess from "../Component/Page/Admin/Admin Dashboard/Access.js";
import AdminAddAccess from "../Component/Page/Admin/Admin Dashboard/AddAccess.js";
import AdminAddCategory from "../Component/Page/Admin/Admin Dashboard/AddCategory.js";
import AdminAddManufacturer from "../Component/Page/Admin/Admin Dashboard/AddManufacturer.js";
import AdminAddStaff from "../Component/Page/Admin/Admin Dashboard/AddStaff.js";
import AdminCategory from "../Component/Page/Admin/Admin Dashboard/Category.js";
import AdminChart from "../Component/Page/Admin/Admin Dashboard/Chart.js";
import AdminCustomer from "../Component/Page/Admin/Admin Dashboard/Customer.js";
import AdminEditAccess from "../Component/Page/Admin/Admin Dashboard/EditAccess.js";
import AdminEditCategory from "../Component/Page/Admin/Admin Dashboard/EditCategory.js";
import AdminEditManufacturer from "../Component/Page/Admin/Admin Dashboard/EditManufacturer.js";
import AdminEditOrder from "../Component/Page/Admin/Admin Dashboard/EditOrder.js";
import AdminEditStaff from "../Component/Page/Admin/Admin Dashboard/EditStaff.js";
import {
  default as AdminDecentralization,
  default as AdminManufacturer,
} from "../Component/Page/Admin/Admin Dashboard/Manufacturer.js";
import AdminOrder from "../Component/Page/Admin/Admin Dashboard/Order.js";
import AdminProduct from "../Component/Page/Admin/Admin Dashboard/Product.js";
import AdminStaff from "../Component/Page/Admin/Admin Dashboard/Staff.js";
import AdminViewCategory from "../Component/Page/Admin/Admin Dashboard/ViewCategory.js";
import AdminViewCustomer from "../Component/Page/Admin/Admin Dashboard/ViewCustomer.js";
import AdminViewManufacturer from "../Component/Page/Admin/Admin Dashboard/ViewManufacturer.js";
import AdminViewStaff from "../Component/Page/Admin/Admin Dashboard/ViewStaff.js";
import {
  default as AdminDashboard,
  default as AdminPage,
} from "../Component/Page/Admin/Admin Dashboard/index.js";
import CartPage from "../Component/Page/Cart/Cart.js";
import CartItem from "../Component/Page/Cart/CartItem/CartItem.js";
import CartList from "../Component/Page/Cart/CartList/CartList.js";
import OrderDetail from "../Component/Page/Cart/OrderDetail/OrderDetail.js";
import ErrorPage from "../Component/Page/Error/404.js";
import Login from "../Component/Page/LoginSignup/Login.js";
import SignUp from "../Component/Page/LoginSignup/LoginSignup.js";
import NVDIA_STORE_MAIN from "../Component/Page/Main/NVDIA_STORE_MAIN.js";
import Policy from "../Component/Page/Policy/index.js";
import ProductDetail from "../Component/Page/Products/DetailProducts/product-detail-card-slider-master/index.js";
import Products from "../Component/Page/Products/Products.js";
import ImageUpload from "../Component/Page/Products/index.js";
import ProductReview from "../Component/Page/Review/Review.js";
import Shop from "../Component/Page/Shop/index.js";
import SuccessOrder from "../Component/Page/Success/index.js";

const publicRoutes = [
  {
    path: "/websiteDoAn",
    component: NVDIA_STORE_MAIN,
  },
  {
    path: "/websiteDoAn/Shop",
    component: Shop,
  },
  {
    path: "/websiteDoAn/SignUp",
    component: SignUp,
    layout: HeaderOnly,
  },

  {
    path: "/websiteDoAn/Main",
    component: NVDIA_STORE_MAIN,
  },
  {
    path: "/websiteDoAn/Products",
    component: Products,
  },

  {
    path: "/websiteDoAn/Policy",
    component: Policy,
  },

  {
    path: "/websiteDoAn/Login",
    component: Login,
    layout: HeaderOnly,
  },
  {
    path: "/websiteDoAn/ImageUpload",
    component: ImageUpload,
    layout: BodyOnly,
  },

  {
    path: "/websiteDoAn/AdminDashboard",
    component: AdminDashboard,
    layout: BodyOnly,
  },
  {
    path: "/websiteDoAn/AdminPage",
    component: AdminPage,
    layout: BodyOnly,
  },
  {
    path: "/websiteDoAn/AdminCustomer",
    component: AdminCustomer,
    layout: BodyOnly,
  },
  {
    path: "/websiteDoAn/AdminProduct",
    component: AdminProduct,
    layout: BodyOnly,
  },

  {
    path: "/websiteDoAn/AdminOrder",
    component: AdminOrder,
    layout: BodyOnly,
  },

  {
    path: "/websiteDoAn/AdminStaff",
    component: AdminStaff,
    layout: BodyOnly,
  },

  {
    path: "/websiteDoAn/AdminDecentralization",
    component: AdminDecentralization,
    layout: BodyOnly,
  },

  {
    path: "/websiteDoAn/AdminViewCustomer",
    component: AdminViewCustomer,
    layout: BodyOnly,
  },

  {
    path: "/websiteDoAn/ProductDetail/:id",
    component: ProductDetail,
  },
  {
    path: "/websiteDoAn/Access",
    component: AdminAccess,
    layout: BodyOnly,
  },

  {
    path: "/websiteDoAn/AddAccess",
    component: AdminAddAccess,
    layout: BodyOnly,
  },

  {
    path: "/websiteDoAn/EditAccess",
    component: AdminEditAccess,
    layout: BodyOnly,
  },

  {
    path: "/websiteDoAn/AdminEditOrder",
    component: AdminEditOrder,
    layout: BodyOnly,
  },
  {
    path: "/websiteDoAn/AdminAddStaff",
    component: AdminAddStaff,
    layout: BodyOnly,
  },
  {
    path: "/websiteDoAn/AdminViewStaff",
    component: AdminViewStaff,
    layout: BodyOnly,
  },
  {
    path: "/websiteDoAn/AdminEditStaff",
    component: AdminEditStaff,
    layout: BodyOnly,
  },
  {
    path: "/websiteDoAn/AdminCategory",
    component: AdminCategory,
    layout: BodyOnly,
  },
  {
    path: "/websiteDoAn/AdminAddCategory",
    component: AdminAddCategory,
    layout: BodyOnly,
  },
  {
    path: "/websiteDoAn/AdminEditCategory",
    component: AdminEditCategory,
    layout: BodyOnly,
  },
  {
    path: "/websiteDoAn/AdminViewCategory",
    component: AdminViewCategory,
    layout: BodyOnly,
  },
  {
    path: "/websiteDoAn/AdminManufacturer",
    component: AdminManufacturer,
    layout: BodyOnly,
  },
  {
    path: "/websiteDoAn/AdminAddManufacturer",
    component: AdminAddManufacturer,
    layout: BodyOnly,
  },
  {
    path: "/websiteDoAn/AdminEditManufacturer",
    component: AdminEditManufacturer,
    layout: BodyOnly,
  },
  {
    path: "/websiteDoAn/AdminViewManufacturer",
    component: AdminViewManufacturer,
    layout: BodyOnly,
  },
  {
    path: "/websiteDoAn/AdminChart",
    component: AdminChart,
    layout: BodyOnly,
  },

  {
    path: "/websiteDoAn/AccountHistory",
    component: AccountHistory,
  },

  {
    path: "/websiteDoAn/SuccessOrder",
    component: SuccessOrder,
  },

  {
    path: "/websiteDoAn/AccountDetail",
    component: AccountDetail,
  },
  {
    path: "/websiteDoAn/AccountHeader",
    component: AccountHeader,
  },

  {
    path: "/websiteDoAn/AccountProductHistory",
    component: AccountProductHistory,
  },

  {
    path: "/websiteDoAn/AccountAddress",
    component: AccountAddress,
  },

  {
    path: "/websiteDoAn/AccountOrder",
    component: AccountOrder,
  },

  {
    path: "/websiteDoAn/Review",
    component: ProductReview,
    layout: BodyOnly,
  },

  /*--- Cart ---*/
  {
    path: "/websiteDoAn/CartPage",
    component: CartPage,
  },

  {
    path: "/websiteDoAn/CartItem",
    component: CartItem,
    layout: BodyOnly,
  },

  {
    path: "/websiteDoAn/CartList",
    component: CartList,
    layout: BodyOnly,
  },

  {
    path: "/websiteDoAn/OrderDetail",
    component: OrderDetail,
    layout: BodyOnly,
  },

  {
    path: "/websiteDoAn/*",
    component: ErrorPage,
  },
];

const privateRoutes = {};

export { privateRoutes, publicRoutes };

