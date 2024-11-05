import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { MdFacebook } from "react-icons/md";
import { RxDiscordLogo } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLoginError, setUserLoggedIn } from "../../../services/redux/slices/userSlice";
import { cartThunk, userThunk } from "../../../services/redux/thunks/thunk";
import PICTURE from "../../Assests/PICTURE";
import "./LoginSignup.scss";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userCurrentLogged = useSelector((state) => state.user.userCurrentLogged);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(userThunk.loginUser(user))
      .unwrap()
      .then((user) => {
        dispatch(setUserLoggedIn(user))
        console.log("user id", user?.id)
        dispatch(cartThunk.getUserCart(user?.id));
        toast.success("Login successfully");
        navigate('/websiteDoAn/')
      })
      .catch((error) => {
        dispatch(setLoginError(error));
        toast.error("Failed to login");
      });
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
                type="password"
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

            <div className="separator-container">
              <div className="separator">or</div>
            </div>

            <div className="other-container">
              <button className="other-item">
                <span className="other-icon">
                  <FaGoogle size={12} />
                </span>
                <span className="other-message">Log In With Google</span>
              </button>

              <button className="other-item">
                <span className="other-icon">
                  <MdFacebook size={15} />
                </span>
                <span className="other-message">Log In With Facebook</span>
              </button>

              <button className="other-item">
                <span className="other-icon">
                  <RxDiscordLogo size={15} />
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
