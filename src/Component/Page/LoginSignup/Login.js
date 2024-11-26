import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FaGoogle } from "react-icons/fa";
import { MdFacebook } from "react-icons/md";
import { RxDiscordLogo } from "react-icons/rx";
import PICTURE from "../../Assests/PICTURE";
import "./LoginSignup.scss";
const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    // phone: "",
  });

  // Validate email
  const [emailError, setEmailError] = useState("");
  const { email, password } = user;
  const validateEmail = (email) => {
    const validDomains = ['@gmail.com', '@email.com'];
    return validDomains.some(domain => email.toLowerCase().endsWith(domain));
  };
  // Validate phone
  // const [phoneError, setPhoneError] = useState("");
  // const validatePhone = (phone) => {
  //   const phoneRegex = /^[0-9]{10}$/;  
  //   return phoneRegex.test(phone);
  // };

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });

    if (e.target.name === 'email') {
      const newEmail = e.target.value;
      if (newEmail && !validateEmail(newEmail)) {
        setEmailError("Email không hợp lệ");
      } else {
        setEmailError("");
      }
    }
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

    if (emailError) {
      alert("Vui lòng kiểm tra lại email");
      return;
    }
    
    try {
      // Post login credentials to the server
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/signin",
        user
      );
      console.log("Response data: ", response.data);
  
      // Check if the server responded with a token
      if (response.data.token) {
        // Store the token in local storage or manage it in a way suitable for your security requirements
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("email", response.data.email);
        alert("Welcome to our website!");
  
        // Check the role and navigate accordingly
        const isAdmin = await GetRoleToken(response.data.token);
        if (isAdmin) {
          navigate("/websiteDoAn/AdminDashboard");
        } else {
          navigate("/websiteDoAn");
        }
      } else {
        // Handle any case where login is unsuccessful but does not throw an error
        alert(
          response.data.message ||
            "Invalid login credentials. Please try again."
        );
      }
    } catch (error) {
      console.error("Login failed, please check the email and password", error);
      alert("Login failed due to technical issues. Please try again later.");
    }
  };
  

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
