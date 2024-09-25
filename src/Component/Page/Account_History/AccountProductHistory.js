import Pako from "pako";
import { useEffect, useState } from "react";
import { getCartById, getUserLogged } from "../../Serivce/ApiService";
import "./css/style.scss";

const decompressAndDisplayImage = (compressedBase64) => {
  if (!compressedBase64) return "";

  try {
    const binaryString = atob(compressedBase64);
    const binaryData = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      binaryData[i] = binaryString.charCodeAt(i);
    }

    // Sử dụng pako để giải nén dữ liệu
    const decompressedData = Pako.inflate(binaryData);
    const blob = new Blob([decompressedData], { type: "image/png" });
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Failed to decompress image:", error);
    return "";
  }
};

const AccountProductHistory = ({ setActiveComponent }) => {
  const [userId, setUserId] = useState(null);
  const [historyProducts, setHistoryProducts] = useState([]);

  useEffect(() => {
    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      loadUserHistoryProduct();
    }
  }, [userId]);

  const fetchUserId = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No auth token found. User must be logged in.");
      return;
    }

    try {
      const response = await getUserLogged(token);
      setUserId(response.data.id);
    } catch (error) {
      console.error("Failed to fetch user information:", error);
    }
  };

  const loadUserHistoryProduct = async () => {
    try {
      const result = await getCartById(userId);
      console.log(result.data); 
      const allProducts = result.data.flatMap(cart => cart.products || []);
      setHistoryProducts(allProducts);
    } catch (error) {
      console.error("Failed to load user history products:", error);
    }
  };

  const aggregateProducts = (products) => {
    const aggregated = {};
    products.forEach((product) => {
      if (!aggregated[product.productName]) {
        aggregated[product.productName] = { ...product };
      }
    });
    return Object.values(aggregated);
  };

  const aggregatedProducts = aggregateProducts(historyProducts);

  return (
    <div>
      <div className="details_table details">
        <div className="table recentOrders">
          <div className="cardHeader">
            <h2>Product History</h2>
          </div>
          <table>
            <thead>
              <tr>
                <th scope="col" style={{ textAlign: "start" }}>Id</th>
                <th scope="col" style={{ textAlign: "start" }}>Product</th>
                <th scope="col" style={{ textAlign: "start" }}>Name</th>
                <th scope="col" style={{ textAlign: "end" }}>Price</th>
                <th scope="col" style={{ textAlign: "end" }}>Quantity</th>
                <th scope="col" style={{ textAlign: "end" }}>Status</th>
                <th scope="col" style={{ textAlign: "end" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {aggregatedProducts.length > 0 ? (
                aggregatedProducts.map((product, index) => (
                  <tr key={index}>
                    <td style={{ textAlign: "start" }}>{product.id}</td>
                    <td style={{ textAlign: "start" }}>
                      <img
                        src={
                          decompressAndDisplayImage(
                            product.product_image?.find((img) => img.isMainImage)?.imageData || ""
                          )
                        }
                        alt={product.productName}
                        width="50"
                      />
                    </td>
                    <td style={{ textAlign: "start" }}>{product.productName}</td>
                    <td style={{ textAlign: "end" }}>${product.unitPrice}</td>
                    <td style={{ textAlign: "end" }}>{product.unitInStock}</td>
                    <td style={{ textAlign: "end" }}>
                      <span
                        className={`status ${product.unitInStock > 0 ? "inprogress" : "deleting"}`}
                      >
                        {product.unitInStock > 0 ? "In stock" : "Out of stock"}
                      </span>
                    </td>
                    <td style={{ textAlign: "end" }}>
                      <button className="status deleting mx-2">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>No product was found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AccountProductHistory;
