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
import { orderThunk } from '../../../../../services/redux/thunks/thunk';
export default function AdminViewOrder({ id, setActiveComponent }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.order.isLoading);
  const order = useSelector((state) => state.order.selectedOrder);

  useEffect(() => {
    dispatch(orderThunk.getOrderById(id));
  }, [id]);

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
      <Typography sx={{ fontWeight: 'bold', color: '#1976d2', marginBottom: 1, fontSize: 18 }}>
        Customer Information
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Typography component="span" sx={{ fontWeight: 'bold', minWidth: '120px', fontSize: 16 }}>
            Name:
          </Typography>
          <Typography component="span" sx={{ fontSize: 14 }}>
            {order.user.fullname}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Typography component="span" sx={{ fontWeight: 'bold', minWidth: '120px', fontSize: 16 }}>
            Email:
          </Typography>
          <Typography component="span" sx={{ fontSize: 14 }}>
            {order.user.email}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Typography component="span" sx={{ fontWeight: 'bold', minWidth: '120px', fontSize: 16 }}>
            Mobile:
          </Typography>
          <Typography component="span" sx={{ fontSize: 14 }}>
            {order.user.mobile}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Typography component="span" sx={{ fontWeight: 'bold', minWidth: '120px', fontSize: 16 }}>
            Shipping Address:
          </Typography>
          <Typography component="span" sx={{ fontSize: 14 }}>
            {`${order.address.houseNumber}, ${order.address.street}, ${order.address.ward}, ${order.address.district}, ${order.address.city}, ${order.address.country}`}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ marginY: 2 }} />

      <Typography sx={{ fontWeight: 'bold', color: '#1976d2', marginBottom: 1, fontSize: 18 }}>
        Order Details
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginBottom: 3, flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, marginBottom: 3 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography component="span" sx={{ fontWeight: 'bold', minWidth: '120px', fontSize: 16 }}>
              Order ID:
            </Typography>
            <Typography component="span" sx={{ fontSize: 14 }}>
              {order.id}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography component="span" sx={{ fontWeight: 'bold', minWidth: '120px', fontSize: 16 }}>
              Order Date:
            </Typography>
            <Typography component="span" sx={{ fontSize: 14 }}>
              {new Date(order.order_date).toLocaleString()}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography component="span" sx={{ fontWeight: 'bold', minWidth: '120px', fontSize: 16 }}>
              Total Price:
            </Typography>
            <Typography component="span" sx={{ fontSize: 14 }}>
              ${order.total_price.toFixed(2)}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography component="span" sx={{ fontWeight: 'bold', minWidth: '120px', fontSize: 16 }}>
              Status:
            </Typography>
            <Typography component="span" sx={{ fontSize: 14 }}>
              {order.status ? 'Active' : 'Inactive'}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography component="span" sx={{ fontWeight: 'bold', minWidth: '120px', fontSize: 16 }}>
              Order Status:
            </Typography>
            <Typography component="span" sx={{ fontSize: 14 }}>
              {order.order_status}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography component="span" sx={{ fontWeight: 'bold', minWidth: '120px', fontSize: 16 }}>
              Note:
            </Typography>
            <Typography component="span" sx={{ fontSize: 14 }}>
              {order.note || 'N/A'}
            </Typography>
          </Box>

          <Typography component="span" sx={{ fontWeight: 'bold', fontSize: 16, marginTop: 2 }}>
            Order Items
          </Typography>

          <List>
            {order?.orderItem?.map((item) => (
              <ListItem key={item.id} sx={{ padding: 0, marginBottom: 2 }}>
                <Card sx={{ display: 'flex', flexDirection: 'column', borderRadius: 2, overflow: 'hidden' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ 
                      flex: '0 0 auto',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 2
                    }}>
                      <CardMedia
                        component="img"
                        sx={{ width: 250, height: 150 }}
                        image={item?.product?.product_image.find((img) => img.mainImage)?.url || ''}
                        alt={item?.product?.productName}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, padding: 2 }}>
                      <CardContent sx={{ padding: 0 }}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Typography component="span" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                            Name product:
                          </Typography>
                          <Typography sx={{ fontSize: 14 }}>
                            {item?.product?.productName}
                          </Typography>
                        </Box>
                      </CardContent>
                      <CardContent sx={{ padding: 0, marginTop: 2 }}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Typography component="span" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                            Quantity:
                          </Typography>
                          <Typography sx={{ fontSize: 14 }}>
                            {item?.quantity}
                          </Typography>
                        </Box>
                      </CardContent>
                      <CardContent sx={{ padding: 0, marginTop: 2 }}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Typography component="span" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                            Total Price:
                          </Typography>
                          <Typography sx={{ fontSize: 14 }}>
                            ${item?.totalPrice?.toFixed(2)}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Box>
                  </Box>
                </Card>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>

      <Divider sx={{ marginY: 2 }} />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography sx={{ fontWeight: 'bold', color: '#1976d2', marginBottom: 2, fontSize: 18 }}>
          Payment Information
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Typography component="span" sx={{ fontWeight: 'bold', minWidth: '120px', fontSize: 16 }}>
            Payment Date:
          </Typography>
          <Typography component="span" sx={{ fontSize: 14 }}>
            {new Date(order?.payment?.payment_date).toLocaleString()}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Typography component="span" sx={{ fontWeight: 'bold', minWidth: '120px', fontSize: 16 }}>
            Payment Method:
          </Typography>
          <Typography component="span" sx={{ fontSize: 14 }}>
            {order?.payment?.payment_method}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Typography component="span" sx={{ fontWeight: 'bold', minWidth: '120px', fontSize: 16 }}>
            Payment Status:
          </Typography>
          <Typography component="span" sx={{ fontSize: 14 }}>
            {order?.payment?.payment_status}
          </Typography>
        </Box>
      </Box>
    </Paper>
  </Container>
  );
}
