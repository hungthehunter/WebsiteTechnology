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

export default function CartItem({ maxWidth }) {
  const [open, setOpen] = useState(false);
  const [cartProduct, setCartProduct] = useState(dummyCartProduct);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const increaseQuantity = () => {
    setCartProduct(prev => ({
      ...prev,
      quantity: prev.quantity + 1,
      total: (prev.quantity + 1) * prev.price
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
      total: (prev.quantity - 1) * prev.price
    }));
  };

  const handleClose = () => setOpen(false);
  const handleConfirmDelete = () => {
    toast.success('Product removed from cart successfully!');
    setOpen(false);
    // Add logic to remove product from cart
  };

  return (
    <Box className="wrapper" sx={{ 
      backgroundColor: '#1E1E1E', 
      p: 1, // Giảm padding xuống 8px (theme.spacing(1))
      borderRadius: 2, 
      mb: 1, // Giảm margin bottom
      position: 'relative',
    }}>
      <Tooltip title="Delete item" placement="top">
        <IconButton 
          size="small" 
          className="deleteBtn" 
          onClick={() => setOpen(true)} 
          sx={{  
            color: '#FF5252',
            position: 'absolute',
            top: 50,
            right: 4,
            zIndex: 1
          }}
        >
          <FontAwesomeIcon icon={faTrash} fontSize={12} />
        </IconButton>
      </Tooltip>
      <Grid container spacing={1} alignItems="center"> {/* Giảm spacing xuống 1 */}
        <Grid item xs={12} sm={8}>
          <Link to={`/detail/${cartProduct.id}`} style={{ textDecoration: 'none' }}>
            <Stack direction="row" spacing={1} alignItems="center"> {/* Giảm spacing xuống 1 */}
              <Box
                component="img"
                src={cartProduct.image}
                sx={{ width: maxWidth * 0.7, height: maxWidth * 0.7, objectFit: 'cover', borderRadius: 1 }} 
              />
              <Stack spacing={0.5} alignItems="flex-start"> {/* Giữ spacing 0.5 cho text */}
                <Typography
                  variant={isMobile ? "body2" : "body1"}
                  color="#4CAF50"
                  className="text"
                  sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}
                >
                  {cartProduct.name}
                </Typography>
                <Typography variant={isMobile ? "caption" : "body2"} color="#FFD54F">
                  ${cartProduct.price}
                </Typography>
                <Typography
                  variant="caption"
                  color="#E0E0E0"
                  className="text"
                  sx={{ textTransform: 'capitalize', maxWidth: 300 }}
                >
                  {cartProduct.shortDescription}
                </Typography>
              </Stack>
            </Stack>
          </Link>
        </Grid>
        <Grid item xs={12} sm={4}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
          <div className="quantity-control">
            <ButtonGroup variant="contained" size="small">
              <Button 
                onClick={reduceQuantity} 
                className="decrease"
              >
                -
              </Button>
              <Button 
                disabled 
                className="quantity"
              >
                {cartProduct.quantity}
              </Button>
              <Button 
                onClick={increaseQuantity} 
                className="increase"
              >
                +
              </Button>
            </ButtonGroup>
          </div>
          <Typography variant={isMobile ? "body2" : "body1"} fontWeight="bold" color="#FFD54F">
            ${cartProduct.total.toLocaleString()}
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
        <DialogTitle id="alert-dialog-title">
          {"Please confirm your action"}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Do you want to remove this product from your cart?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
