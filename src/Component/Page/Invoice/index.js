import axios from "axios";
import pako from 'pako';
import { useEffect, useState } from "react";
import { CgShoppingCart } from "react-icons/cg";
import { SlArrowRight } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import icon from "../../Assests/ICON";
import "./style.scss";

const decompressAndDisplayImage = (compressedBase64) => {
  // Decode base64 to binary
  const binaryString = atob(compressedBase64);
  const binaryData = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    binaryData[i] = binaryString.charCodeAt(i);
  }

  // Decompress using pako
  const decompressedData = pako.inflate(binaryData);
  const blob = new Blob([decompressedData], { type: 'image/png' }); // Adjust MIME type if needed
  return URL.createObjectURL(blob); // Create a URL for the Blob
};




const Invoice = () => {
  const [isPopupOpen, setPopupOpen] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [currentStep, setCurrentStep] = useState("Cart");
  const [completedSteps, setCompletedSteps] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [nameOnCard, setNameOnCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvc, setCvc] = useState("");
  const [expiringDate, setExpiringDate] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [recipent, setRecipent] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const openPopup = () => setPopupOpen(true);

  const closePopup = async () => {
    setPopupOpen(false);
    navigate("/websiteDoAn/Shop");
  };

  useEffect(() => {
    
    if (!token) {
      console.error("No auth token found. User must be logged in.");
      return;
    }
  
  
  
    fetchUserId();
  }, []);
  
  const fetchUserId = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setUserId(response.data.id);
  
      if (Array.isArray(response.data.cart) && response.data.cart.length > 0) {
        const activeCartItems = response.data.cart.filter(item => item.status === true);
        setCartItems(activeCartItems);
      } else {
        console.log("Cart is empty or not defined.");
        setCartItems([]);
      }
    } catch (error) {
      console.error("Failed to fetch user information:", error);
    }
  };

 const handleInvoice = async (event) => {
  event.preventDefault();  // Prevent form's default submission behavior
  if (!userId) {
    alert("User ID is not available.");
    return;
  }
  if (!userId) {
    alert("User ID is not available.");
    return;
  }

  const today = new Date();
  const curDate = today.toISOString().split('T')[0];

  const orderData = {
    deliveryAddress: address,
    note: "Delivery Product", // Nếu có ghi chú, bạn có thể lấy từ input
    recipientName: recipent,
    recipientPhone: mobile,
    order_status: "Pending", // Hoặc trạng thái khác nếu cần
    order_date: curDate,
    delivery_date: curDate, // Ngày hiện tại
    receipt_date: curDate, // Ngày hiện tại
    customer:{
      id: userId
    }
  };



  const paymentData = {
    nameOnCard,
    cardNumber,
    cvc,
    expiringDate,
    mobile,
    address,
    recipent,
    user: { id: userId },
  };

  const paymentHistory = {
    purchaseDate: curDate,
    user: { id: userId },
    carts: cartItems.map(item => ({ id: item.id })),
    orders: orderData 
  };
  console.log("Đây là paymentHistory",paymentHistory)
  try {

    await axios.post("http://localhost:8080/api/payments", paymentData,
    );
    await axios.post("http://localhost:8080/api/purchaseHistories", paymentHistory);
    await axios.delete(`http://localhost:8080/api/carts/${userId}`);
    setCurrentStep("Review")
    alert("all DONE")

  } catch (error) {
    alert("Error processing your request. Please try again.");
  }
};

  

  const handleContinueShopping = () => navigate("/websiteDoAn/Shop");

  const handleStepClick = (step) => {
    const steps = ["Cart", "Shipping","Payment", "Review"];
    const currentStepIndex = steps.indexOf(currentStep);
    const newStepIndex = steps.indexOf(step);

    if (cartItems.length === 0 && step !== "Cart") {
      return;
    }

    if (newStepIndex > currentStepIndex) {
      setCompletedSteps(steps.slice(0, newStepIndex + 1));
    } else {
      setCompletedSteps(steps.slice(0, newStepIndex));
    }

    setCurrentStep(step);
  };

  const handleQuantityChange = (index, newQuantity) => {
    setCartItems(prevItems => {
      const updatedItems = [...prevItems];
      const item = updatedItems[index];
      item.quantity = newQuantity;
      item.totalPrice = item.unitPrice * newQuantity;
      return updatedItems;
    });
  };

  const handleRemove = async (productId, e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:8080/api/carts/cart/${userId}/remove/${productId}`);
      fetchUserId();
    } catch (error) {
      console.error("Cannot find cart to delete:", error);
    }
  };

  const handleOrderDetail= async (e)=>{
    e.preventDefault();
    // const 
    try {
      
    } catch (error) {
      
    }
  }

  if (!userId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Invoice">
      <header>
        <h1 className="logo">Shopping</h1>
        <ul className="menu-container">
          <li className="menu-item">Home</li>
          <li className="menu-item">Collections</li>
          <li className="menu-item">Products</li>
          <li className="menu-item red">For Sale</li>
        </ul>
        <div className="menu-icons-container">
          <img src={icon.search} alt="" className="icon" />
          <img src={icon.profile} alt="" className="icon" />
          <img src={icon.check} alt="" className="icon" />
        </div>
      </header>
      <div className="progress-checkout-container">
        {["Cart", "Shipping", "Payment", "Review"].map(step => (
          <div
            key={step}
            className={`progress-step-container ${currentStep === step ? "active" : ""}`}
            onClick={() => handleStepClick(step)}
          >
            <div className={`step-check ${completedSteps.includes(step) ? "completed" : ""}`} />
            <span className="step-title">{step}</span>
          </div>
        ))}
      </div>
      <div className="form-container">
      {currentStep === "Payment" && (
  <>
    <h2 className="form-title">Payment Details</h2>
    <form
      action=""
      className="checkout-form"
      onSubmit={handleInvoice}  // Sửa lại để không gọi hàm ngay lập tức
    >
      <div className="input-line">
        <label htmlFor="nameOnCard">Name on card</label>
        <input
          type="text"
          name="nameOnCard"
          id="nameOnCard"
          placeholder="Your name and surname"
          value={nameOnCard}
          onChange={e => setNameOnCard(e.target.value)}
        />
      </div>
      <div className="input-line">
        <label htmlFor="cardNumber">Card number</label>
        <input
          type="text"
          name="cardNumber"
          id="cardNumber"
          placeholder="1111-2222-3333-4444"
          value={cardNumber}
          onChange={e => setCardNumber(e.target.value)}
        />
      </div>
      <div className="input-container">
        <div className="input-line">
          <label htmlFor="expiringDate">Expiring Date</label>
          <input
            type="text"
            name="expiringDate"
            id="expiringDate"
            placeholder="09-21"
            value={expiringDate}
            onChange={e => setExpiringDate(e.target.value)}
          />
        </div>
        <div className="input-line">
          <label htmlFor="cvc">CVC</label>
          <input
            type="text"
            name="cvc"
            id="cvc"
            placeholder="***"
            value={cvc}
            onChange={e => setCvc(e.target.value)}
          />
        </div>
      </div>
      <button
        type="submit"  // Thay đổi type của button thành submit
        className="button-text"
     
      >
        <span>
          <SlArrowRight size={15} />
        </span>{" "}
        Complete Review
      </button>
    </form>
  </>
)}

           {    currentStep === "Cart" && (
             <div>
<form action="" className="checkout-form">
  <div className="input-line">
    {cartItems && cartItems.length > 0 ? (
      cartItems.map((cartItem, index) =>
        cartItem.products.map((item, productIndex) => (
          <div key={productIndex} className="col-md-12 col-lg-10 mx-auto">
            <div className="cart-item">
              <div className="row">
                <div className="col-md-7 center-item">
                  <img
                    src={decompressAndDisplayImage(
                      item.product_image.find(img => img.isMainImage)?.imageData || ''
                    )}
                    alt={item.productName}
                  />
                  <h5>{item.productName}</h5>
                </div>
                <div className="col-md-5 center-item">
                  <div className="input-group number-spinner">
                    <input
                      id="phone-number"
                      type="number"
                      min={0}
                      className="form-control text-center"
                      defaultValue={cartItem.totalQuantity}
                      onChange={e =>
                        handleQuantityChange(index, e.target.value)
                      }
                    />
                  </div>
                  <h4>{item.totalPrice}$</h4>
                  <button
                    className="status deleting mx-2"
                    onClick={e => handleRemove(item.id, e)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )
    ) : (
      <div className="empty-cart">
        <div className="empty-cart-info">
          <span><CgShoppingCart size={20} /></span>
          <span className="empty-cart-message">
            Your cart is currently empty.
          </span>
        </div>
        <button
          className="empty-cart-button"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>
      </div>
    )}
  </div>

  {cartItems && cartItems.length > 0 && (
    <div
      className="button-text"
      onClick={() => setCurrentStep("Shipping")}
    >
      <span><SlArrowRight /></span> Complete Payment
    </div>
  )}
</form>


             </div>
           )}
           {currentStep === "Shipping" && (
             <div>
               <h2 className="form-title">{currentStep} Form</h2>
               <form action="" className="checkout-form">
                 <div className="input-line">
                   <label htmlFor="address">Address</label>
                   <input
                     type="text"
                     name="address"
                     id="address"
                     placeholder="Your address"
                     value={address}
                     onChange={e => setAddress(e.target.value)}
                   />
                 </div>
                 <div className="input-line">
                   <label htmlFor="mobile">Phone Number</label>
                   <input
                     type="text"
                     name="mobile"
                     id="mobile"
                     placeholder="Your phone number"
                     value={mobile}
                     onChange={e => setMobile(e.target.value)}
                   />
                 </div>
                 <div className="input-container">
                   <div className="input-line">
                     <label htmlFor="recipent">Recipient</label>
                     <input
                       type="text"
                       name="recipent"
                       id="recipent"
                       placeholder="Recipient's name"
                       value={recipent}
                       onChange={e => setRecipent(e.target.value)}
                     />
                   </div>
                 </div>
                 <div
                   className="button-text"
                   onClick={() => setCurrentStep("Payment")}
                 >
                   <span>
                     <SlArrowRight />
                   </span>{" "}
                   Complete Payment
                 </div>
               </form>
             </div>
           )}
           {currentStep === "Review" && (
             <div>
               <div className="SuccessOrder">
                 <div className="container">
                   <div
                     className={`popup ${isPopupOpen ? "open-popup" : ""}`}
                     id="popup"
                   >
                     <img src={icon.accept} alt="Accepted icon" />
                     <h2>Thank You!</h2>
                     <p>Your details have been successfully submitted. Thanks!</p>
                     <button type="button" onClick={closePopup}>
                       OK
                     </button>
                   </div>
                 </div>
               </div>
             </div>
           )}
         </div>
       </div>
     );
    }

   export default Invoice;




