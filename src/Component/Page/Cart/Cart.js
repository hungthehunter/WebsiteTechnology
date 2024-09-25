import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import "./Cart.scss";
import CartList from './CartList/CartList.js';
import OrderDetail from './OrderDetail/OrderDetail.js';

export default function CartPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (false) {
      navigate('/');
      return () => {
        toast.error('You are not logged in');
      };
    }
  }, [navigate]);

  return (
    <Box 
      component="section" 
      className="cart" 
      sx={{ 
        backgroundColor: '#121212', 
        color: '#fff', 
        minHeight: '100vh',
        width: '100%',
        maxWidth: '100%',
        overflowX: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '50px',
      }}
    >
      <Box sx={{ 
        width: '100%', 
        maxWidth: '1200px', // Adjust this value as needed
        px: 2, 
        py: 4,
        boxSizing: 'border-box'
      }}>
        <Typography variant={isMobile ? "h5" : "h4"} textTransform="uppercase" gutterBottom fontWeight="bold" color="#fff">
          Your Order
        </Typography>
        <Typography variant={isMobile ? "h6" : "h5"} color="gray" textTransform="uppercase" mb={3}>
          There are 3 item(s) in your cart
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          gap: 3,
          width: '100%',
          justifyContent: 'flex-start'
        }}>
          <Box sx={{ flex: isMobile ? '1 1 auto' : '0 0 65%', width: '100%', maxWidth: '800px' }}>
            <CartList maxHeight={isMobile ? 'auto' : '600px'} maxWidthItem={isMobile ? 80 : 120} />
          </Box>
          <Box sx={{ flex: isMobile ? '1 1 auto' : '0 0 35%', width: '100%', maxWidth: '400px' }}>
            <OrderDetail />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}