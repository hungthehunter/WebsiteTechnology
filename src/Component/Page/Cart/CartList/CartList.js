import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { Box, Button, Chip, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BASE_PATH } from '../../../Config/config.js';
import CartItem from '../CartItem/CartItem.js';
// Dữ liệu giả
const dummyData = {
  cartList: [
    { id: 1, name: 'Product 1', price: 10, quantity: 2 },
    { id: 2, name: 'Product 2', price: 20, quantity: 1 },
  ],
  totalItem: 2,
  recentlyItem: { name: 'Product 1', action: 'add' }
};

const GreenButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: '#00CED1', 
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

export default function CartList({ maxHeight, maxWidthItem }) {
  const [{ cartList, totalItem, recentlyItem }, setCartData] = useState(dummyData);
  const listCartItems = useSelector((state) => state.cart.listCartItems)
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  /* Render */
  const renderBadgeContent = () => {
    const itemName = recentlyItem?.name;
    const action = recentlyItem?.action;
    let message = '';
    switch (action) {
      case 'add':
        message = ' - has been added to the shopping cart';
        break;
      case 'increase':
        message = ' - has increased the quantity';
        break;
      case 'reduce':
        message = ' - has reduced the quantity';
        break;
      case 'delete':
        message = ' - has been removed from the shopping cart';
        break;
      default:
        break;
    }
    return (
      <>
        {itemName}
        <Typography
          component="span"
          sx={{ textTransform: 'lowercase', fontWeight: 'lighter' }}
        >
          {message}
        </Typography>
      </>
    );
  };

  const changeColorBadgeAction = () => {
    const action = recentlyItem?.action;
    if (!totalItem) {
      return 'default';
    }
    switch (action) {
      case 'add':
        return 'success';
      case 'increase':
        return 'primary';
      case 'reduce':
        return 'warning';
      case 'delete':
        return 'error';
      default:
        return 'default';
    }
  };

  const renderCartItem = () => {
    if (!listCartItems || listCartItems.length === 0) {
      return (
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            textAlign: 'center' 
          }}
        >
          <AiOutlineShoppingCart size={48} /> {/* Biểu tượng giỏ hàng */}
          <Typography variant="h6" sx={{ mt: 2 }}>
            There is no item in Cart
          </Typography>
          <GreenButton 
          endIcon={<ArrowForwardIosOutlinedIcon fontSize='3'/>}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center', 
            fontSize: '1.2rem', 
            fontWeight: 'bold', 
            marginTop: 'auto', 
          }}
          onClick={()=>navigate(`${BASE_PATH}/Shop`)}
        >
          Shop Now
        </GreenButton>
        </Box>
      );
    }

    return listCartItems.map((item) => (
      <CartItem key={item.id} maxWidth={maxWidthItem} cart={item} />
    ));
  };

  return (
    <>
      <Chip
        label={
          totalItem
            ? renderBadgeContent()
            : 'You have not added any products to your cart yet'
        }
        color={changeColorBadgeAction()}
        icon={totalItem !== 0 ? <FontAwesomeIcon icon={faBell} fontSize={15} shake /> : null}
        sx={{
          width: '100%',
          py: 2,
          borderRadius: 0,
          textTransform: 'capitalize',
          '& .MuiChip-label': {
            display: 'block',
            whiteSpace: 'normal',
            fontWeight: 'bold',
            fontSize: isMobile ? '1.3rem' : '1.5rem',
          },
          backgroundColor: '#84e020 ',
          color: '#000',
        }}
      />
      <Box
        sx={{
          display: totalItem ? 'flex' : 'none',
          mt: 2.5,
          maxHeight: isMobile ? 'none' : maxHeight,
          p: 2,
          border: '1px solid #2E2E2E',
          overflowY: isMobile ? 'visible' : 'auto',
          backgroundColor: '#121212',
          width: '100%',
        }}
      >
        <Stack spacing={2} width="100%">
          {renderCartItem()}
        </Stack>
      </Box>
    </>
  );
}