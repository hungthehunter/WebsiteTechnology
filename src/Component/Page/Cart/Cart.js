import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import CartList from './CartList/CartList.js';
import OrderDetail from './OrderDetail/OrderDetail.js';
import { motion } from 'framer-motion';

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box 
        component="section" 
        sx={{ 
          backgroundColor: '#000',  // Đảm bảo nền đen hoàn toàn cho toàn bộ section
          color: '#fff', 
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingTop: '80px',
          paddingBottom: '50px',
        }}
      >
        <Box 
          sx={{ 
            width: '100%', 
            maxWidth: '1200px', 
            px: isMobile ? 2 : 4, 
            py: 4,
            boxSizing: 'border-box',
          }}
        >
          {/* Tiêu đề đơn hàng */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Typography 
              variant={isMobile ? "h5" : "h4"} 
              textTransform="uppercase" 
              gutterBottom 
              fontWeight="bold" 
              color="#76B900" 
              sx={{ textAlign: isMobile ? 'center' : 'left' }}
            >
              Your Order
            </Typography>

            <Typography 
              variant={isMobile ? "subtitle1" : "h6"} 
              color="#B0B0B0" 
              textTransform="uppercase" 
              mb={4} 
              sx={{ textAlign: isMobile ? 'center' : 'left' }}
            >
              There are 3 item(s) in your cart
            </Typography>
          </motion.div>

          {/* Bố cục chính của giỏ hàng */}
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: isMobile ? 'column' : 'row', 
              gap: isMobile ? 4 : 3, 
              width: '100%', 
              justifyContent: 'space-between', 
              alignItems: isMobile ? 'center' : 'flex-start',
            }}
          >
            {/* Danh sách sản phẩm */}
            <motion.div
              whileHover={{ 
                scale: 1.02, 
                boxShadow: '0 0 15px rgba(118, 185, 0, 0.5)' 
              }}
              transition={{ duration: 0.3 }}
            >
              <Box 
                sx={{ 
                  flex: isMobile ? '1 1 auto' : '0 0 65%', 
                  width: '100%', 
                  maxWidth: '800px', 
                  backgroundColor: '#0F0F0F',  // Nền đen xám cho danh sách sản phẩm
                  borderRadius: 2, 
                  p: 3, 
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                }}
              >
                <CartList maxHeight={isMobile ? 'auto' : '600px'} maxWidthItem={isMobile ? 90 : 130} />
              </Box>
            </motion.div>

            {/* Chi tiết đơn hàng */}
            <motion.div
              whileHover={{ 
                scale: 1.02, 
                boxShadow: '0 0 15px rgba(118, 185, 0, 0.5)' 
              }}
              transition={{ duration: 0.3 }}
            >
              <Box 
                sx={{ 
                  flex: isMobile ? '1 1 auto' : '0 0 35%', 
                  width: '100%', 
                  maxWidth: '400px', 
                  backgroundColor: '#0F0F0F',  // Nền đen xám cho chi tiết đơn hàng
                  borderRadius: 2, 
                  p: 3, 
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                }}
              >
                <OrderDetail />
              </Box>
            </motion.div>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}
