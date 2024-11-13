import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Divider,
  List,
  ListItem,
  Paper,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { orderThunk } from '../../../../services/redux/thunks/thunk';
export default function AdminViewOrder({ id, setActiveComponent }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.order.isLoading);

  // Tìm order cụ thể theo id
  const order = useSelector((state) => state.order.selectedOrder);

  useEffect(() => {
    const fetchOrder = async () => {
    await dispatch(orderThunk.getOrderById(id));
    };
    fetchOrder();
  }, [dispatch, id]);


  if (isLoading) {
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: 'black',
        zIndex: 9999
      }}>
        <CircularProgress size={60} thickness={4}  sx={{ color: '#4CAF50' }}  />
        <Typography variant="h6" sx={{ mt: 2, color: '#4CAF50' }}>
          PLEASE WAIT...
        </Typography>
      </Box>
    );
  }

  return (
    <Container>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => 
            setActiveComponent({
                name: "AdminOrder",
              })
        }
        sx={{ marginBottom: 3, backgroundColor: '#1976d2', color: 'white', '&:hover': { backgroundColor: '#1565c0' } }}
      >
        Back to Orders
      </Button>

      <Paper elevation={4} sx={{ padding: 4, marginTop: 2, borderRadius: 2, backgroundColor: '#f5f5f5' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333', marginBottom: 2 }}>
          Order Details
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginBottom: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
              <strong>Order ID:</strong> {order.id}
            </Typography>
            <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
              <strong>Order Date:</strong> {new Date(order.order_date).toLocaleString()}
            </Typography>
            <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
              <strong>Total Price:</strong> ${order.total_price.toFixed(2)}
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
              <strong>Status:</strong> <span style={{ color: order.status ? 'green' : 'red' }}>{order.status ? 'Active' : 'Inactive'}</span>
            </Typography>
            <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
              <strong>Order Status:</strong> {order.order_status}
            </Typography>
            <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
              <strong>Note:</strong> {order.note || 'N/A'}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ marginY: 2 }} />

        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2', marginBottom: 1 }}>
          Customer Information
        </Typography>
        <Typography variant="subtitle1">
          <strong>Name:</strong> {order.user.fullname}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Email:</strong> {order.user.email}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Mobile:</strong> {order.user.mobile}
        </Typography>

        <Divider sx={{ marginY: 2 }} />

        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2', marginBottom: 1 }}>
          Shipping Address
        </Typography>
        <Typography variant="body1" sx={{ padding: 1, backgroundColor: '#e0f7fa', borderRadius: 1 }}>
          {`${order.address.houseNumber}, ${order.address.street}, ${order.address.ward}, ${order.address.district}, ${order.address.city}, ${order.address.country}`}
        </Typography>

        <Divider sx={{ marginY: 2 }} />

        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2', marginBottom: 1 }}>
          Order Items
        </Typography>
        <List>
          {order.orderItem.map((item) => (
            <ListItem key={item.id} sx={{ padding: 0, marginBottom: 2 }}>
              <Card sx={{ display: 'flex', width: '100%', borderRadius: 2, overflow: 'hidden' }}>
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={item.product.product_image.find((img) => img.mainImage)?.url || ''}
                  alt={item.product.productName}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, padding: 2 }}>
                  <CardContent sx={{ padding: 0 }}>
                    <Typography variant="h6" sx={{ color: '#424242', fontWeight: 'bold' }}>{item.product.productName}</Typography>
                    <Typography variant="body2" sx={{ marginTop: 1 }}>
                      <strong>Quantity:</strong> {item.quantity}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Total Price:</strong> ${item.totalPrice.toFixed(2)}
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ marginY: 2 }} />

        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2', marginBottom: 1 }}>
          Payment Information
        </Typography>
        <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
          <strong>Payment Date:</strong> {new Date(order.payment.payment_date).toLocaleString()}
        </Typography>
        <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
          <strong>Payment Method:</strong> {order.payment.payment_method}
        </Typography>
        <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
          <strong>Payment Status:</strong> {order.payment.payment_status}
        </Typography>
      </Paper>
    </Container>
  );
}
