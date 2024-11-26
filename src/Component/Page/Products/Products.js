import React, { useState } from "react";
import { BsSlashLg } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import PICTURE from "../../Assests/PICTURE";
import "../Products/Products.scss";

function Products() {
  const [laptopOff, setLaptopOff] = useState(false);

  const toggleLaptop = () => {
    setLaptopOff(!laptopOff);
  };

  return (
    <div className="inner">
      <div className="grid wide">
        <div className="products">
          <div className="breadcrumb-list">
            <ol>
              <li>
                <Link to="/">
                  <FaHome
                    style={{ color: "#76b900", paddingRight: 4 }}
                    size={20}
                  />
                  <span>Home Page <BsSlashLg /> ASUS PROART GeForce RTX 4090</span>
                </Link>
              </li>
            </ol>
          </div>

          <div className="row">
            <div className="col l-4">
              <img
                src={PICTURE.laptop}
                className="products-picture"
                alt="Laptop"
              />
            </div>
            <div className="col l-8">
              <h2 className="products-title-heading">
                Màn hình Viewsonic VA2432-H-W 24" IPS 100Hz viền mỏng
              </h2>
              <div className="products-price">
                <span className="products-price-new">2.550.000₫</span>
                <span className="products-price-old">2.990.000₫</span>
                <span className="products-discount">-15%</span>
              </div>
              <button className="button btn-buynow" onClick={toggleLaptop}>
                <span className="maintext">BUY NOW</span>
                <span className="subtext">
                  Delivery to your door or pick up from the store
                </span>
              </button>
              <div className="products-desc-short">
                <p>General information: Support change new in 7 days</p>
              </div>
            </div>
          </div>

          <div className="products-block">
            <h2>News about products</h2>
            <ul className="list-post">
              <li className="item-post fade-box">
                <Link to="https://gvn360.com">
                  <img src={PICTURE.cardnew} alt="Product news" />
                </Link>
                <h3>
                  <Link to="https://gvn360.com">Galax RTX 4090 HDMI Retimer</Link>
                </h3>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
