import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { 
  Grid, 
  Typography, 
  Button, 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions, 
  Pagination, 
  Container 
} from "@mui/material";

const Shop_Fake = ({ isGridView, searchItem, categoryFilters }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [products, setProducts] = useState([]);

  // Fetch data from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        if (response.status === 200) {
          setProducts(response.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const filteredItems = products.filter((item) => {
    const matchesSearch = item.productName
      .toLowerCase()
      .includes(searchItem.toLowerCase());

    const matchesFilter = Object.entries(categoryFilters).some(
      ([key, value]) => value && matchCategoryFilter(item, key)
    );

    return (
      matchesSearch &&
      (Object.values(categoryFilters).every((filter) => !filter) || matchesFilter)
    );
  });

  const matchCategoryFilter = (item, key) => {
    switch (key) {
      case "gpu":
        return item.category.categoryName === "GPU";
      case "laptop":
        return item.category.categoryName === "lAPTOP";
      case "$500":
        return item.unitPrice >= 500 && item.unitPrice < 1000;
      case "$1000":
        return item.unitPrice >= 1000 && item.unitPrice <= 2000;
      case "$2000":
        return item.unitPrice >= 2000;
      case "RTX4090":
        return item.gpu === "GeForce RTX4090";
      case "RTX4080":
        return item.gpu === "GeForce RTX4080";
      case "RTX4070":
        return item.gpu === "GeForce RTX4070";
      case "RTX4050":
        return item.gpu === "GeForce RTX4050";
      case "NVIDIA":
        return item.manufacturer.manufacturerName === "NVIDIA";
      case "ACER":
        return item.manufacturer.manufacturerName === "ACER";
      case "ASUS":
        return item.manufacturer.manufacturerName === "ASUS";
      default:
        return false;
    }
  };

  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {currentItems.map((item) => (
          <Grid item xs={12} md={isGridView ? 4 : 12} key={item.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={item.product_image.find(img => img.mainImage)?.url || ''}
                alt={item.productName}
              />
              <CardContent>
                <Typography variant="h6">{item.productName}</Typography>
                <Typography variant="body2" color="text.secondary">
                  CPU: {item.cpu} | Screen: {item.screen} | RAM: {item.ram}
                </Typography>
                <Typography variant="h5" sx={{ mt: 2 }}>
                  ${item.unitPrice}.00
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="success">
                  Add to Cart
                </Button>
                <Button component={Link} to={`/websiteDoAn/ProductDetail/${item.id}`}>
                  Detail Product
                </Button>
                <Button>Compare</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Pagination
        count={Math.ceil(filteredItems.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}
      />
    </Container>
  );
};

export default Shop_Fake;
