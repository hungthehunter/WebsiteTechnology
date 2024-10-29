// src/Component/Page/Main/ProductCard.js
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { Link } from "react-router-dom";

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

const ProductCard = ({ image, alt, title, link }) => (
  <Grid item xs={12} sm={6} md={3}>
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        src={image}
        alt={alt}
        sx={{ height: 200, objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Typography 
          gutterBottom 
          variant="h5" 
          component="h2" 
          sx={{ 
            textAlign: 'center', 
            fontWeight: 'bold', 
            flexGrow: 1, 
          }}
        >
          {title}
        </Typography>
        <GreenButton 
          component={Link} 
          to={link} 
          endIcon={<ArrowForwardIosOutlinedIcon fontSize='3'/>}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center', 
            fontSize: '1.2rem', 
            fontWeight: 'bold', 
            marginTop: 'auto', 
          }}
        >
          Shop Now
        </GreenButton>
      </CardContent>
    </Card>
  </Grid>
);

export default ProductCard;