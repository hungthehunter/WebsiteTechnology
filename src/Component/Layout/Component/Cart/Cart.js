import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Cart/Cart.scss";

function Cart({ showCart, id }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/products/${id}`);
        setProduct(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    loadProduct();
  }, [id]);

  // Find the main image
  const mainImage = product?.product_image?.find(img => img.isMainImage)?.imageData;

  return (
    <div className="Cart">
      <div className={showCart ? "cart-section active" : "cart-section"}>
        <div className="cart-white">
          <div className="cart-tool">
            <div className="cart-heading">Thêm vào giỏ hàng thành công</div>
          </div>
          <ul>
            <li>
              <div className="cart-item">
                {mainImage ? (
                  <img
                    src={`data:image/png;base64,${mainImage}`}
                    className="cart-img"
                    alt={product?.productName || "Product"}
                  />
                ) : (
                  <p>No main image available</p>
                )}
                <h3 className="cart-desc">{product?.productName}</h3>
              </div>
            </li>
            <li>
              <Link type="button" className="button" to={{ pathname: `/websiteDoAn/Invoice` }}>
                Xem giỏ hàng
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cart;
