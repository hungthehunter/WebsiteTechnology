import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import icon from "../../Assests/ICON"; // Kiểm tra lại đường dẫn đến ảnh ICON của bạn
import "./style.scss";

function SuccessOrder() {
  const navigate=useNavigate();
  const [isPopupOpen, setPopupOpen] = useState(true);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
    navigate("/websiteDoAn/");
  };

  return (
    <div className="SuccessOrder">
      <div className="container">
      <button type="submit" className="btn" onClick={openPopup}>
  Submit
</button>
        <div className={`popup ${isPopupOpen ? 'open-popup' : ''}`} id="popup">
          <img src={icon.accept} alt="Accepted icon" />
          <h2>Thank You!</h2>
          <p>Your details have been successfully submitted. Thanks!</p>
          <button type="button" onClick={closePopup}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessOrder;
