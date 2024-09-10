import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Cart from '../../../../Layout/Component/Cart/Cart';
import './style.scss';

function ProductDetail() {
  const [selectedImageId, setSelectedImageId] = useState(0);
  const [imgWidth, setImgWidth] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const [userId, setUserId] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  // Đây là cái Làm hình PHỒNG TO
  const updateImgWidth = () => {
    const image = document.querySelector('.img-showcase img:first-child');
    if (image) {
      setImgWidth(image.clientWidth);
    }
  };

  useEffect(() => {
    updateImgWidth();
    window.addEventListener('resize', updateImgWidth);
    return () => window.removeEventListener('resize', updateImgWidth);
  }, []);

  const handleImageSelect = (id) => {
    setSelectedImageId(id);
  };

  const handleNewPrice= (price,discount)=>{
return price - (price*discount)/100;
  }

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (newQuantity >= 0) {
      setQuantity(newQuantity);
    }
  };

  const slideStyle = {
    transform: `translateX(${-selectedImageId * imgWidth}px)`,
    transition: 'transform 0.5s ease',
  };

  const addToCart = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const result = await axios.get("http://localhost:8080/api/v1/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserId(result.data.id);
    } catch (error) {
      console.error("Failed to load Email:", error);
    }

    if (!token) {
      alert('Please log in to add items to the cart.');
      navigate('/websiteDoAn/Login');
      return;
    }

    try {
      const productToAdd = {
        totalQuantity: quantity,
        totalPrice: quantity * product.unitPrice, // Update totalPrice based on quantity and unitPrice
        user: {
          id: userId,
        },
        products: [
          { id: id },
        ],
      };
console.log("đây là productToAdd: ",productToAdd);
      await axios.post('http://localhost:8080/api/carts', productToAdd, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Đã lưu vào giỏ hàng thành công")
      setShowCart(true);
    } catch (error) {
      console.error('Error adding product to cart:', error);
      if (error.response && error.response.status === 401) {
        alert('Session expired. Please log in again.');
        navigate('/websiteDoAn/Login');
      }
    }
  };

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    loadProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-page">
      <div className="card-wrapper">
        <div className="card">
          <div className="product-imgs">
            <div className="img-display">
              <div className="img-showcase" style={slideStyle}>
                {product.product_image.map((img, index) => (
                  <img key={index} src={`data:image/png;base64,${img.imageData}`} alt={`Product ${index}`}/>
                ))}
              </div>
            </div>
            <div className="img-select">
              {product.product_image.map((img, index) => (
                <div key={index} className="img-item" onClick={() => handleImageSelect(index)}>
                  <img src={`data:image/png;base64,${img.imageData}`} alt={`Product ${index}`} />
                </div>
              ))}
            </div>
          </div>
          <div className="product-content">
            <h2 className="product-title">{product.productName}</h2>
            <Link to="/websiteDoAn/Shop" className="product-link">Visit store</Link>
            <div className="product-rating">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star-half-alt"></i>
              <span>4.7 (21)</span>
            </div>
            <div className="product-price">
              <p className="last-price">Old Price: <span>${product.unitPrice}</span></p>
              <p className="new-price">New Price: <span>${handleNewPrice(product.unitPrice,product.promotion.discountPercentage)} ({product.promotion.discountPercentage}%)</span></p>
            </div>
            <div className="product-detail">
              <h2>About this item:</h2>
              <p>{product.promotion.description}</p>
              <ul>
                <li>Color: <span>Black</span></li>
                <li>Available: <span>{product.unitInStock > 0 ? "in stock" : "out of stock"}</span></li>
                <li>Category: <span>{product.category.categoryName}</span></li>
                <li>Shipping Area: <span>All over the world</span></li>
                <li>Shipping Fee: <span>Free</span></li>
              </ul>
            </div>
            <div className="purchase-info">
              <input type="number" min="0" value={quantity} onChange={handleQuantityChange} />
              <button type="button" className="btn" onClick={addToCart}>
                Add to Cart <i className="fas fa-shopping-cart"></i>
              </button>
            
            </div>
            <div className="social-links">
              <p>Share At: </p>
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-whatsapp"></i></a>
              <a href="#"><i className="fab fa-pinterest"></i></a>
            </div>
          </div>
        </div>
      </div>
      {showCart && <Cart showCart={showCart} id={product.id} />}
     
    </div>
  );
}

export default ProductDetail;
