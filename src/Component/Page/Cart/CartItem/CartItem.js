import { keyframes } from '@emotion/react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Box, Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogTitle,
  Grid, IconButton, Stack, Tooltip, Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import "../CartItem/CartItem.scss";

const dummyCartProduct = {
  id: 1,
  name: "Premium Leather Wallet",
  price: 59.99,
  quantity: 1,
  total: 59.99,
  image: "http://res.cloudinary.com/dy53gt8yd/image/upload/v1726574589/rbduwtkahn5l9nyvpz6v.jpg",
  shortDescription: "Handcrafted genuine leather wallet with multiple card slots and RFID protection."
};

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export default function CartItem({ cart }) { // Giảm kích thước tối đa
  const [open, setOpen] = useState(false);
  const [cartProduct, setCartProduct] = useState(dummyCartProduct);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const increaseQuantity = () => {
    setCartProduct(prev => ({
      ...prev,
      quantity: prev.quantity + 1,
      total: (prev.quantity + 1) * prev.price,
    }));
  };

  const reduceQuantity = () => {
    if (cartProduct.quantity === 1) {
      setOpen(true);
      return;
    }
    
    setCartProduct(prev => ({
      ...prev,
      quantity: prev.quantity - 1,
      total: (prev.quantity - 1) * prev.price,
    }));
  };

  const handleClose = () => setOpen(false);
  const handleConfirmDelete = () => {
    toast.success('Product removed from cart successfully!');
    setOpen(false);
  };

  return (
    <Box 
      className="wrapper" 
      sx={{ 
        backgroundColor: '#0F0F0F',
        p: 3, 
        borderRadius: 2, 
        mb: 2,
        position: 'relative',
        animation: `${fadeIn} 0.5s ease-in`,
      }}
    >
      <Tooltip title="Delete item" placement="left">
        <IconButton 
          size="medium" 
          className="deleteBtn" 
          onClick={() => setOpen(true)} 
          sx={{  
            color: '#FF5252',
            position: 'absolute',
            top: '50%',
            left: 10,
            transform: 'translateY(-50%)', // Căn giữa biểu tượng thùng rác
            transition: 'color 0.3s',
            '&:hover': {
              color: '#FFA500',
            },
          }}
        >
          <FontAwesomeIcon icon={faTrash} fontSize={20} />
        </IconButton>
      </Tooltip>

      <Grid container spacing={2} alignItems="center">
        <Grid 
          item xs={12} sm={4} 
          sx={{ 
            textAlign: 'center', 
            display: 'flex', 
            justifyContent: 'center' 
          }}
        >
          <Link to={`/detail/${cart.id}`} style={{ textDecoration: 'none' }}>
            <Box
              component="img"
              src={cart.product.product_image.find((img) => img.mainImage)?.url}
              sx={{ 
                width: isMobile ? '90px' : '150px', // Giảm kích thước ảnh
                height: isMobile ? '90px' : '150px',
                objectFit: 'cover', 
                borderRadius: 1,
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.05) rotate(2deg)',
                },
              }} 
            />
          </Link>
        </Grid>

        <Grid item xs={12} sm={5}>
          <Stack spacing={1}>
            <Typography
              variant={isMobile ? "body1" : "h5"}
              color="#76B900"
              sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}
            >
              {cart.product.productName}
            </Typography>
            <Typography variant="h6" color="#FFD700">
              ${cart.product.unitPrice.toFixed(2)}
            </Typography>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Stack 
            direction="column" 
            justifyContent="center" 
            alignItems="center" 
            spacing={1}
          >
            <ButtonGroup variant="outlined" size="medium">
              <Button 
                onClick={reduceQuantity} 
                sx={{ 
                  backgroundColor: '#76B900',
                  color: '#000',
                  '&:hover': { backgroundColor: '#A4D17A' },
                  transition: 'transform 0.2s',
                  '&:hover': { 
                    backgroundColor: '#A4D17A',
                    transform: 'scale(1.05)',
                  },
                }}
              >
                -
              </Button>
              <Button 
                disabled 
                sx={{ 
                  backgroundColor: '#E1E1E1',
                  color: '#000 !important',
                  minWidth: 40, 
                }}
              >
                {cart.quantity}
              </Button>
              <Button 
                onClick={increaseQuantity} 
                sx={{ 
                  backgroundColor: '#76B900',
                  color: '#000',
                  '&:hover': { backgroundColor: '#A4D17A' },
                  transition: 'transform 0.2s',
                  '&:hover': { 
                    backgroundColor: '#A4D17A',
                    transform: 'scale(1.05)',
                  },
                }}
              >
                +
              </Button>
            </ButtonGroup>
            <Typography 
              variant={isMobile ? "body1" : "h6"} 
              fontWeight="bold" 
              color="#FFD700"
            >
              ${cartProduct.total.toFixed(2)}
            </Typography>
          </Stack>
        </Grid>
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ color: '#76B900' }}>
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Do you want to remove this product from your cart?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: '#76B900' }}>
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmDelete} 
            sx={{ color: '#FF5252' }} 
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
