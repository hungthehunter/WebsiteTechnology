import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toSlug } from "../../../services/slug";
function ProductDetailll() {
  const { productName } = useParams(); // Lấy slug từ URL
  const { listProduct } = useSelector((state) => ({
    listProduct: state.product.listProduct,
  }));
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Tìm sản phẩm dựa trên slug
    const selected = listProduct.find(
      (product) => toSlug(product.productName) === productName
    );

    if (selected) {
      setProduct(selected);
    } else {
      toast.error("Product not found.");
    }
  }, [productName, listProduct]);

  if (!product) {
    return <div>Loading product details...</div>;
  }

  return (
    <div>
      <h1>{product.productName}</h1>
      <p>Price: ${product.unitPrice}</p>
      <p>{product.description}</p>
    </div>
  );
}

export default ProductDetailll;
