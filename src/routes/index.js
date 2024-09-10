import AdminAccess from "../Component/Layout/Component/Admin/Admin Dashboard/Access.js";
import AdminAddAccess from "../Component/Layout/Component/Admin/Admin Dashboard/AddAccess.js";
import AdminAddCategory from "../Component/Layout/Component/Admin/Admin Dashboard/AddCategory.js";
import AdminAddManufacturer from "../Component/Layout/Component/Admin/Admin Dashboard/AddManufacturer.js";
import AdminAddStaff from "../Component/Layout/Component/Admin/Admin Dashboard/AddStaff.js";
import AdminCategory from "../Component/Layout/Component/Admin/Admin Dashboard/Category.js";
import AdminChart from "../Component/Layout/Component/Admin/Admin Dashboard/Chart.js";
import AdminCustomer from "../Component/Layout/Component/Admin/Admin Dashboard/Customer.js";
import AdminEditAccess from "../Component/Layout/Component/Admin/Admin Dashboard/EditAccess.js";
import AdminEditOrder from "../Component/Layout/Component/Admin/Admin Dashboard/EditOrder.js";
import AdminEditStaff from "../Component/Layout/Component/Admin/Admin Dashboard/EditStaff.js";
import { default as AdminDecentralization, default as AdminManufacturer } from "../Component/Layout/Component/Admin/Admin Dashboard/Manufacturer.js";
import AdminOrder from "../Component/Layout/Component/Admin/Admin Dashboard/Order.js";
import AdminProduct from "../Component/Layout/Component/Admin/Admin Dashboard/Product.js";
import AdminRole from "../Component/Layout/Component/Admin/Admin Dashboard/Role.js";
import AdminStaff from "../Component/Layout/Component/Admin/Admin Dashboard/Staff.js";
import AdminViewCustomer from "../Component/Layout/Component/Admin/Admin Dashboard/ViewCustomer.js";
import AdminViewStaff from "../Component/Layout/Component/Admin/Admin Dashboard/ViewStaff.js";
import { default as AdminDashboard, default as AdminPage } from "../Component/Layout/Component/Admin/Admin Dashboard/index.js";
import BodyOnly from "../Component/Layout/Component/BodyOnly/index.js";
import HeaderOnly from "../Component/Layout/Component/HeaderOnly/index.js";
import AccountAddress from "../Component/Page/Account_History/AccountAddress.js";
import AccountDetail from "../Component/Page/Account_History/AccountDetail.js";
import AccountHeader from "../Component/Page/Account_History/AccountHeader.js";
import AccountOrder from "../Component/Page/Account_History/AccountOrder.js";
import AccountProductHistory from "../Component/Page/Account_History/AccountProductHistory.js";
import AccountHistory from "../Component/Page/Account_History/index.js";
import CustomerOrderDetail from "../Component/Page/Customer/CustomerOrderDetail.js";
import ErrorPage from "../Component/Page/Error/404.js";
import Invoice from "../Component/Page/Invoice/index.js";
import Login from "../Component/Page/LoginSignup/Login.js";
import SignUp from "../Component/Page/LoginSignup/LoginSignup.js";
import NVDIA_STORE_MAIN from "../Component/Page/Main/NVDIA_STORE_MAIN.js";
import Policy from "../Component/Page/Policy/index.js";
import ProductDetail from "../Component/Page/Products/DetailProducts/product-detail-card-slider-master/index.js";
import Products from "../Component/Page/Products/Products.js";
import ImageUpload from "../Component/Page/Products/index.js";
import Search from "../Component/Page/Search/index.js";
import Service from "../Component/Page/Service/Service.js";
import Shop from '../Component/Page/Shop/index.js';
import SuccessOrder from "../Component/Page/Success/index.js";
import Test from "../Component/Page/Test/Test.js";
const publicRoutes = [
  {
    path: "/websiteDoAn",
    component: NVDIA_STORE_MAIN,
  },
  
    {
      path: "/websiteDoAn/Service",
      component: Service,
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
      path: "/websiteDoAn/Search",
      component: Search,
    }, 
  {
    path:"/websiteDoAn/Main",
    component: NVDIA_STORE_MAIN,
  },
  {
    path:"/websiteDoAn/Products",
    component: Products
  },



{
  path:"/websiteDoAn/Policy",
  component: Policy
},


{
  path:"/websiteDoAn/CustomerOrderDetail",
  component: CustomerOrderDetail,
  layout: BodyOnly
},



{
  path:"/websiteDoAn/Test",
  component: Test
},




{
  path: "/websiteDoAn/Login",
  component: Login,
  layout: HeaderOnly,
},
{
  path: "/websiteDoAn/ImageUpload",
  component: ImageUpload,
  layout: BodyOnly
},




{
  path: "/websiteDoAn/AdminDashboard",
  component: AdminDashboard,
  layout: BodyOnly

},
{
  path: "/websiteDoAn/AdminPage",
  component: AdminPage,
  layout: BodyOnly

},
{
  path: "/websiteDoAn/AdminCustomer",
  component: AdminCustomer,
  layout: BodyOnly

},
{
  path: "/websiteDoAn/AdminProduct",
  component: AdminProduct,
  layout: BodyOnly
},

{
  path: "/websiteDoAn/AdminOrder",
  component: AdminOrder,
  layout: BodyOnly
},

{
  path: "/websiteDoAn/AdminStaff",
  component: AdminStaff,
  layout: BodyOnly
},

{
  path: "/websiteDoAn/AdminDecentralization",
  component: AdminDecentralization,
  layout: BodyOnly
},

{
  path: "/websiteDoAn/AdminViewCustomer",
  component: AdminViewCustomer,
  layout: BodyOnly
},

{
  path: "/websiteDoAn/ProductDetail/:id",
  component: ProductDetail,
 
},

{
  path: "/websiteDoAn/Invoice",
  component: Invoice,
},

{
  path: "/websiteDoAn/Access",
  component: AdminAccess,
  layout: BodyOnly
},

{
  path: "/websiteDoAn/AddAccess",
  component: AdminAddAccess,
  layout: BodyOnly
},

{
 path: "/websiteDoAn/EditAccess",
 component: AdminEditAccess,
 layout: BodyOnly
},

{
  path: "/websiteDoAn/Role",
  component: AdminRole,
  layout: BodyOnly
},

{
  path: "/websiteDoAn/AdminEditOrder",
  component: AdminEditOrder,
  layout: BodyOnly
},
{
  path: "/websiteDoAn/AdminAddStaff",
  component: AdminAddStaff,
  layout: BodyOnly
},
{
  path: "/websiteDoAn/AdminViewStaff",
  component: AdminViewStaff,
  layout: BodyOnly
},
{
  path: "/websiteDoAn/AdminEditStaff",
  component: AdminEditStaff,
  layout: BodyOnly
},
{
  path: "/websiteDoAn/AdminCategory",
  component: AdminCategory,
  layout: BodyOnly
},
{
  path: "/websiteDoAn/AdminManufacturer",
  component: AdminManufacturer,
  layout: BodyOnly
},
{
  path: "/websiteDoAn/AdminAddManufacturer",
  component: AdminAddManufacturer,
  layout: BodyOnly
},
{
  path: "/websiteDoAn/AdminAddCategory",
  component: AdminAddCategory,
  layout: BodyOnly
},
{
  path: "/websiteDoAn/AdminChart",
  component: AdminChart,
  layout: BodyOnly
},

{
  path:"/websiteDoAn/AccountHistory",
  component: AccountHistory,
},

{
path:"/websiteDoAn/SuccessOrder",
component: SuccessOrder,

},

{
  path:"/websiteDoAn/AccountDetail",
  component: AccountDetail
},
{
  path:"/websiteDoAn/AccountHeader",
  component: AccountHeader
},

{
  path:"/websiteDoAn/AccountProductHistory",
  component: AccountProductHistory,
},

{
  path:"/websiteDoAn/AccountAddress",
  component: AccountAddress,
},

{
  path:"/websiteDoAn/AccountOrder",
  component: AccountOrder,
},

{
  path: "/websiteDoAn/*",
  component: ErrorPage,
},
];

const privateRoutes = {};

export { privateRoutes, publicRoutes };
