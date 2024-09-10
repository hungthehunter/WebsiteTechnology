import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Grid,
  Typography
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./assets/css/style.scss";

function AdminViewProduct({ id, setActiveComponent }) {
  const [product, setProduct] = useState(null);

  // GET: Fetch product data by ID
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    loadProduct();
  }, [id]);

  if (!product) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  // Prepare images for Image Gallery
  const images = product.product_image.map((image) => ({
    original: `data:${image.type};base64,${image.imageData}`,
  thumbnail: `data:${image.type};base64,${image.imageData}`,
  }));

  return (
    <Container className="no-margin-container" style={{ marginTop: '20px', maxWidth: '100%' }}>

      <Card>
        <CardHeader title="Product Information" />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <ImageGallery items={images} showPlayButton={false} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>
                {product.productName}
              </Typography>
              <Typography variant="h6">
                <strong>CPU:</strong> {product.cpu}
              </Typography>
              <Typography variant="h6">
                <strong>RAM:</strong> {product.ram}
              </Typography>
              <Typography variant="h6">
                <strong>Screen:</strong> {product.screen}
              </Typography>
              <Typography variant="h6">
                <strong>Unit Price:</strong> ${product.unitPrice}
              </Typography>
              <Typography variant="h6">
                <strong>Units in Stock:</strong> {product.unitInStock}
              </Typography>
              <Typography variant="h6">
                <strong>Units in Order:</strong> {product.unitInOrder}
              </Typography>
              <Typography variant="h6">
                <strong>Battery Capacity:</strong> {product.batteryCapacity}
              </Typography>
              <Typography variant="h6">
                <strong>Operating System:</strong> {product.operatingSystem}
              </Typography>
              <Typography variant="h6">
                <strong>Design:</strong> {product.design}
              </Typography>
              <Typography variant="h6">
                <strong>Warranty Information:</strong> {product.warrantyInformation}
              </Typography>
              <Typography variant="h6">
                <strong>General Information:</strong> {product.generalInformation}
              </Typography>
              <Typography variant="h6">
                <strong>Category:</strong> {product.category?.categoryName}
              </Typography>
              <Typography variant="h6">
                <strong>Manufacturer:</strong> {product.manufacturer?.manufacturerName}
              </Typography>

              <Button
                variant="contained"
                color="primary"
                onClick={() => setActiveComponent({ name: "AdminProduct" })}
                style={{ marginTop: '20px' }}
              >
                Return
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

export default AdminViewProduct;
