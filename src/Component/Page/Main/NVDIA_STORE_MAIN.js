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
import { Link } from "react-router-dom";
import { promotionThunk } from '../../../services/redux/thunks/thunk.js';
import PICTURE from "../../Assests/PICTURE";
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

const DeepLearningSection = styled(Box)(({ theme }) => ({
  backgroundImage: `url(${PICTURE.nvidia_dli_banner})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  padding: theme.spacing(8,0),
  marginBottom: theme.spacing(8), // Thêm khoảng cách dưới cho DeepLearningSection
  color: theme.palette.common.black,
}));

function NVDIA_STORE_MAIN() {
  const [activeSlide, setActiveSlide] = useState(0);

  const handleSlideChange = (newIndex) => {
    setActiveSlide(newIndex);
  };

  // const images = [
  //   {
  //     src: PICTURE.shield_full_family, // Replace with your actual image path
  //     alt: 'NVIDIA TITAN',
  //     brand: 'More Options.',
  //     brand1: 'More to Love.',
  //     heading: 'SHIELD',
  //     link: '/Shop', // Replace with your actual link
  //   },
  //   {
  //     src: PICTURE.geforce_ada,
  //     alt: 'Image 1',
  //     brand: 'GeForce RTX 40 Series',
  //     heading: 'BEYOND FAST',
  //     link: '/Shop',
  //   },
  //   {
  //     src: PICTURE.jetson_nano_shop, // Replace with your actual image path
  //     alt: 'GeForce RTX 30',
  //     brand1: 'Buy the latest developer kits',
  //     heading: 'Jetson',
  //     link: '/Shop', // Replace with your actual link
  //   },
    
  //   {
  //     src: PICTURE.geforce_laptop_shop_banner, // Replace with your actual image path
  //     alt: 'NVIDIA TITAN',
  //     brand1: 'GAMING EVENT ANIVERSARY',
  //     heading: 'BEST CHOICE',
  //     link: '/Shop', // Replace with your actual link
  //   },
  // ];
  const dispatch = useDispatch();
  const images = useSelector((state) => state.promotion.listPromotion)
  useEffect(()=>{
  dispatch(promotionThunk.getAllPromotions())
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

      <DeepLearningSection>
        <Container maxWidth="lg">
          <Grid container justifyContent="flex-end">
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'left', pr: { xs: 0, md: 4 } }}>
                <Typography variant="h4" gutterBottom
                 sx={{ 
                  color: 'common.black',
                  marginBottom: 3 // Tăng khoảng cách phía dưới
                }}
                >
                  NVIDIA Deep Learning Institute
                </Typography>
                <Typography variant="h5" paragraph>
                  Education and Training Solution to Solve <br></br>the World's Most Challenging Problem
                </Typography>
                <Box sx={{ mt: 4 }}>
                  <GreenButton 
                    variant="contained" 
                    component={Link} 
                    to=""
                    sx={{ 
                      backgroundColor: '#76b900',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#5c8f00',
                      },
                    }}
                  >
                    Get Online Training
                  </GreenButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </DeepLearningSection>

      <Footer />
    </Box>
  );
}

export default NVDIA_STORE_MAIN;