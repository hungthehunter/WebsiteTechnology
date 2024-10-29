import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { MdFacebook } from "react-icons/md";
import { RxDiscordLogo } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUserLoggedIn } from "../../../services/redux/slices/userSlice";
import { cartThunk } from "../../../services/redux/thunks/thunk";
import PICTURE from "../../Assests/PICTURE";
import "./LoginSignup.scss";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state)=>state.cart.selectedCartItem);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const GetRoleToken = async (token) => {
    try {
      const result = await axios.get(
        "http://localhost:8080/api/v1/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Check if the user has the "Admin" authority
      const isAdmin = result.data.authorities.some(auth => auth.authority === "Admin");
      console.log(isAdmin);
      return isAdmin;
    } catch (error) {
      console.error("Failed to load user details:", error);
      return false;
    }
  };
  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Gửi thông tin đăng nhập đến server
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/signin",
        user
      );
  
      // Kiểm tra xem server có trả về token không
      if (response.data.token) {
        // Lưu token
        const { token } = response.data;
        localStorage.setItem("authToken", token);
        
        // Lấy thông tin người dùng với token
        const userResponse = await axios.get("http://localhost:8080/api/v1/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        const userData = userResponse.data;
  
        // Dispatch setUserLoggedIn và lấy thông tin giỏ hàng
        dispatch(setUserLoggedIn(userData));
  
        if (userData && userData.id) {
           // Dispatch lấy giỏ hàng
           await dispatch(cartThunk.getUserCart(userData.id)); // Đảm bảo await
           console.log("selectedCartItem", cartItems); // Chờ cartItems cập nhật
        } else {
          console.warn("User ID is undefined, cannot get cart.");
        }
  
        // Hiển thị thông báo thành công
        toast.success("Welcome to our website!");
  
        // Kiểm tra xem người dùng có phải là Admin và điều hướng tương ứng
        const isAdmin = userData.authorities.some(auth => auth.authority === "Admin");
        navigate(isAdmin ? "/websiteDoAn/AdminDashboard" : "/websiteDoAn");
  
      } else {
        // Xử lý trường hợp đăng nhập không thành công nhưng không báo lỗi
        alert(response.data.message || "Invalid login credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login failed, please check the email and password", error);
      toast.error("Login failed due to technical issues. Please try again later.");
    }
  };
  
  // Sử dụng useEffect để theo dõi sự thay đổi của cartItems
useEffect(() => {
  console.log("Updated cart items:", cartItems);
}, [cartItems]);

  return (
    <div className="account-section">
      <div className="box">
        <div className="login-container">
          <form className="inputs" onSubmit={handleLogin}>
            <div className="header">
              <div className="text">Your NVIDIA Account</div>
              <div className="underline"></div>
            </div>

            <div className="input">
              <img src={PICTURE.email} alt="email" />
              <input
                type="text"
                placeholder="Email"
                name="email"
                required
                value={email}
                onChange={onInputChange}
              />
            </div>

            <div className="input">
              <img src={PICTURE.password} alt="password" />
              <input
                type="password" // Changed type to 'password' for better security
                placeholder="Password"
                name="password"
                required
                value={password}
                onChange={onInputChange}
              />
            </div>

            <div className="forgot-password">
              Don't have an account yet?{" "}
              <Link to="/websiteDoAn/SignUp">
                <span>click here</span>
              </Link>
            </div>

            <div className="submit-container">
              <button className="submit" type="submit">
                Continue
              </button>
            </div>

            <div class="separator-container">
    <div class="separator">or</div>
</div>

<div className="other-container">
<button className="other-item">
  <span className="other-icon">
  <FaGoogle size={12}/>
  </span>
  <span className="other-message">Log In With Google</span>
</button>

<button className="other-item">
  <span className="other-icon">
  <MdFacebook size={15}/> 
  </span>
  <span className="other-message">Log In With Facebook</span>
</button>

<button className="other-item">
  <span className="other-icon">
  <RxDiscordLogo size={15}/>
  </span>
  <span className="other-message">Log In With Discord</span>
</button>
</div>

            <div className="footer">
              <span>
                <Link to="/terms">Terms</Link>
              </span>
              <span>
                <Link to="/privacy">Privacy</Link>
              </span>
              <span>
                <Link to="/docs">Docs</Link>
              </span>
              <span className="contact">Contact Support</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
