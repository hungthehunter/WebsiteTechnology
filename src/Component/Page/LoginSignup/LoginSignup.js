import axios from "axios";
import React, { useState } from "react";
import { FaSquarePhone } from "react-icons/fa6";
import { MdDriveFileRenameOutline, MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import "./LoginSignup.scss";
const LoginSignup = () => {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    fullname: "",
    mobile: "",
    email: "",
    password:"",
  });
  const handleRegister = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/api/v1/auth/signup", user);
    navigate("/websiteDoAn/Login");
  };

  const {fullname,mobile, email,password } = user;

  function onInputChange(e) {
    const { name, value } = e.target;
    setUser(prevState => ({
        ...prevState,
        [name]: value
    }));
}


  return (
    <div className="account-section">
      <div className="box">

        <div className="login-container">
        {/* onSubmit={(e) => onSubmit(e)} */}
          <form  method="POST" className="inputs" onSubmit={handleRegister}>
            {/* (title) */}
            <div className="header">
              <div className="text">Create Your Account</div>
              <div className="underline"></div>
            </div>

            {/* import section */}

   
              <div className="input">
              <MdEmail size={20} className="logo"/>
                <input type="text" placeholder="Email" name="email" required 
                value={email}
                onChange={(e) => onInputChange(e)}
               
                />
              </div>

              <div className="input">
              <MdDriveFileRenameOutline size={20} className="logo"/>
                <input type="text" placeholder="Full Name" name="fullname" required 

                value={fullname}
                  onChange={(e) => onInputChange(e)}
                 
                />
              </div>

              <div className="input">
              <RiLockPasswordFill size={20} className="logo"/>
                <input
                  type="text"
                  placeholder="password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => onInputChange(e)}
               
                />
              </div>

              <div className="input">
              <FaSquarePhone size={20} className="logo"/>
                <input
                  type="text"
                  placeholder="Phone number"
                  name="mobile"
                  required
                  value={mobile}
                  onChange={(e) => onInputChange(e)}
               
                />
              </div>
              {/* <div className="forgot-password">
                Already has account? <Link to="/websiteDoAn/Login"><span>click here</span></Link>
              </div> */}

<div className="forgot-password">
Already has account? <Link to="/websiteDoAn/Login"><span>click here</span></Link>
          </div>


              <div className="submit-container">


            <button    className="submit" type="submit" >
        Create Account
            </button>

              </div>
           

            <div className="footer">
              <span>
                <Link>Terms</Link>
              </span>
              <span>
                <Link>Privacy</Link>
              </span>
              <span>
                <Link>Docs</Link>
              </span>
              <span className="contact">Contact Github Support</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginSignup;
