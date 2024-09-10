import axios from "axios";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineEventNote } from "react-icons/md";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import icon from "../../../Assests/ICON";
import Sidebar from "../DefaultLayout/Sidebar/index.js";
import styles from "./Header.module.scss";
const cx = classNames.bind(styles);
function Header() {
  const [email, setEmail] = useState("");
  const id = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [title, setTitle] = useState("NVIDIA STORE");
  const [showNav, setShowNav] = useState(false);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
    if (token) {
      GetEmailToken(token);
      }
    if (location.pathname === "/") {
      setTitle("NVIDIA STORE");
    } else if (location.pathname === "/Service") {
      setTitle("Service");
    } else if (location.pathname === "/Login") {
      setTitle("Login / Sign Up");
    }
  }, [location]);

  const GetEmailToken = async (token) => {
    try {
     const result = await axios.get(
    "http://localhost:8080/api/v1/auth/me",
    {
     headers: {
     Authorization: `Bearer ${token}`,
     },
    }
     );
     setEmail(result.data.email);
    } catch (error) {
     console.error("Failed to load Email:", error);
    }
     };

  const toLoginPage = () => {
    navigate("/websiteDoAn/Login");
  };

  const toMainPage = () => {
    navigate("/websiteDoAn/");
  };

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userEmail"); // Remove the email from local storage
      setIsLoggedIn(false);
      setEmail(""); // Clear the email
      navigate("/websiteDoAn/Login"); // Navigate to login after logout
    } else {
      navigate("/websiteDoAn/Login");
    }
  };

  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <nav className={cx("global-nav")}>
          <div className={cx("nav-header-container")}>
            <div className={cx("logo-container")}>
              <div className={cx("logo")} onClick={toMainPage}>
                <img
                  src={icon.nvidia}
                  alt="nvidia-icon"
                  style={{ width: 110, height: 44 }}
                ></img>
              </div>
            </div>
            {location.pathname === "/Login" ||
            "" ||
            "/Products" ||
            "/Products_gtx_4080" ||
            "/Products_gtx_4090" ? (
              <div className={cx("nav-tool-container")}>
                <div className={cx("header-action_text")}>
               
                   <span className={cx("box-icon")}>
                     <MdOutlineEventNote
                      size={24}
                      style={{ paddingRight: 5, marginLeft: 3 }}
                    /> 
                  </span> 
                 <span className={cx("box-text")}>
                 <Link to="/websiteDoAn/AccountHistory">
                    <span>Tra</span>
                    <span className={cx("txtbl")}>
                      <span className={cx("txt-overflow")}>
                        <span>cứu</span>
                      </span>
                    </span>
                    </Link>
                  </span> 
                
                </div>

                <div className={cx("header-action_text")}>
                  <span className={cx("box-icon")}>
                    <span className={cx("cart-counter")}>0</span>
                    <FiShoppingCart
                      size={23}
                      style={{ paddingRight: 5, marginLeft: 3 }}
                      onClick={() => setShowCart(!showCart)}
                    />
                  </span>
                  <span className={cx("box-text")}>
                    <Link to="/websiteDoAn/Invoice">
                      <span>Giỏ</span>
                      <span className={cx("txtbl")}>
                        <span className={cx("txt-overflow")}>
                          <span>hàng</span>
                        </span>
                      </span>
                    </Link>
                  </span>
                </div>
                {isLoggedIn ? (
                  <div
                    className={cx("header-action_text")}
                    onClick={handleLoginLogout}
                  >
                    <span className={cx("box-icon")}>
                      <FaUserAlt
                        size={23}
                        style={{ paddingRight: 5, marginLeft: 3 }}
                      />
                    </span>
                    <span className={cx("box-text")}>
                      <span>{email}</span>
                      <span className={cx("txtbl")}>
                        <span className={cx("txt-overflow")}>
                          <span>Đăng xuất</span>{" "}
                        </span>
                      </span>
                    </span>
                  </div>
                ) : (
                  <div
                    className={cx("header-action_text")}
                    onClick={handleLoginLogout}
                  >
                    <span className={cx("box-icon")}>
                      <FaUserAlt
                        size={23}
                        style={{ paddingRight: 5, marginLeft: 3 }}
                      />
                    </span>
                    <span className={cx("box-text")}>
                      <span>Đăng nhập</span>
                    </span>
                  </div>
                )}
                <GiHamburgerMenu
                  size={28}
                  className={cx("nav-header-item")}
                  onClick={() => setShowNav(!showNav)}
                  style={{ marginLeft: 10 }}
                />

                <Sidebar show={showNav} />
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <nav className={cx("navbar-fixed-top")}>
            <div className={cx("container")}>
              <div className={cx("row")}>
                <div className={cx("navbar-header")}>
                  <h1 className={cx("navbar-brand")}>{title}</h1>
                </div>
              </div>
            </div>
          </nav>
        </nav>
      </div>
    </header>
  );
}
export default Header;
