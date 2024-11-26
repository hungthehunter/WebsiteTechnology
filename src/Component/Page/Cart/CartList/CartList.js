import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Chip, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react';
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

export default function CartList({ maxHeight, maxWidthItem }) {
  const [{ cartList, totalItem, recentlyItem }, setCartData] = useState(dummyData);
  const theme = useTheme();
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
    return cartList.map((item) => (
      <CartItem key={item.id} maxWidth={maxWidthItem} initialProduct={item} />
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