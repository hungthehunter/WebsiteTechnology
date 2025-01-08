import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { promotionThunk } from '../../../services/redux/thunks/thunk.js';
import Footer from "../../Layout/Component/Footer/index.js";
import SLIDER from "./NVDIA_STORE_MAIN_SLIDER.js";
import ProductCard from './ProductCard.js';
import { gamingProducts, graphicsProducts, networkingProducts } from './productData';

const GreenButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: 'black', 
  '&:hover': {
    backgroundColor: 'transparent',
    color: '#76b900',
    '& .MuiButton-endIcon': { 
      transform: 'translateX(10px)', 
      transition: 'color 0.3s ease, transform 0.3s ease ',
      color: '#76b900', 
    },
  },
}));

const ProductSection = ({ title, products }) => (
  <Box sx={{ py: 8 }}>
    <Container maxWidth="lg">
      <Typography variant="h3" component="h2" align="center" gutterBottom>
        {title}
      </Typography>
      <Grid container spacing={4}>
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </Grid>
    </Container>
  </Box>
);

function NVDIA_STORE_MAIN() {
  const [activeSlide, setActiveSlide] = useState(0);

  const handleSlideChange = (newIndex) => {
    setActiveSlide(newIndex);
  };
  const dispatch = useDispatch();
  const images = useSelector((state) => state.promotion.listPromotion)
  
  useEffect(()=>{
  dispatch(promotionThunk.getAllPromotions()).unwrap();
  },[dispatch])
  
  return (
    <Box sx={{ bgcolor: '#eee' }}>
      <AppBar position="static" color="default">
        <Toolbar>
        </Toolbar>
      </AppBar>

      <SLIDER images={images} activeSlide={activeSlide} onChangeSlide={handleSlideChange}  height="300px"  />

      <ProductSection title="Gaming and Entertainment" products={gamingProducts} />
      <ProductSection title="Graphics Cards, Laptops and Embedded Systems" products={graphicsProducts} />
      <ProductSection title="Networking" products={networkingProducts} />

      <Footer />
    </Box>
  );
}

export default NVDIA_STORE_MAIN;