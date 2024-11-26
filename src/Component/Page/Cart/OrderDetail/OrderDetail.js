import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  LinearProgress,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCcAmex,
  faCcDiscover,
  faCcMastercard,
  faCcPaypal,
  faCcVisa,
} from '@fortawesome/free-brands-svg-icons';
import { keyframes } from '@emotion/react';
import PaymentConfirmation from './PaymentConfirmation'; // Import PaymentConfirmation

const dummyData = { totalPrice: 1500 };

// Thêm keyframes cho hiệu ứng fade-in
const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export default function OrderDetail() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [progress, setProgress] = useState(0);
  const [totalPrice] = useState(dummyData.totalPrice);
  const [open, setOpen] = useState(false); // State để mở/đóng PaymentConfirmation

  useEffect(() => {
    const value = totalPrice / 20;
    setProgress(value);
  }, [totalPrice]);

  const handleOpen = () => setOpen(true); // Hàm mở Dialog
  const handleClose = () => setOpen(false); // Hàm đóng Dialog

  return (
    <Paper
      elevation={3}
      sx={{
        height: '100%',
        width: '100%',
        borderRadius: 4,
        backgroundColor: '#0F0F0F',
        color: '#FFF',
        padding: isMobile ? 2 : 4,
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: '0 0 15px 5px rgba(118, 185, 0, 0.3)',
        },
      }}
    >
      <Stack spacing={3}>
        <Typography
          variant={isMobile ? 'h6' : 'h4'}
          sx={{
            backgroundColor: '#76B900',
            color: '#000',
            fontWeight: 'bold',
            textAlign: 'center',
            textTransform: 'uppercase',
            borderRadius: 2,
            p: 1,
            animation: `${fadeInDown} 1s ease-out`,
          }}
        >
          Order Detail
        </Typography>

        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" sx={{ color: '#76B900', fontWeight: 'bold' }}>
              Total:
            </Typography>
            <Typography variant="h6" sx={{ color: '#FFD700', fontWeight: 'bold' }}>
              ${totalPrice.toLocaleString()}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" sx={{ color: '#76B900', fontWeight: 'bold' }}>
              Shipping:
            </Typography>
            <Typography variant="body1" sx={{ color: '#A5D6A7' }}>
              Shipping & taxes calculated at checkout
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ fontWeight: 500, color: '#90CAF9', mb: 1 }}>
              {progress >= 100
                ? "CONGRATULATIONS! YOU'VE GOT FREE SHIPPING!"
                : `SPEND $${(2000 - totalPrice).toFixed(2)} FOR FREE SHIPPING`}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 10,
                borderRadius: 5,
                backgroundColor: '#333',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#76B900',
                },
              }}
            />
            <Typography variant="body2" sx={{ mt: 1 }}>
              Free shipping for any orders above{' '}
              <span style={{ color: '#76B900', fontWeight: 'bold' }}>$2000</span>
            </Typography>
          </Box>
        </Box>

        <Stack spacing={2}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Add a note to your order:
          </Typography>
          <TextField
            multiline
            rows={4}
            placeholder="Your note"
            variant="outlined"
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#FFF',
                '& fieldset': { borderColor: '#76B900' },
                '&:hover fieldset': { borderColor: '#A4D17A' },
              },
            }}
          />

          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              p: 2,
              borderRadius: 2,
            }}
          >
            {[faCcVisa, faCcMastercard, faCcPaypal, faCcAmex, faCcDiscover].map((icon, index) => (
              <FontAwesomeIcon
                key={index}
                icon={icon}
                size={isMobile ? '2x' : '3x'}
                style={{ transition: 'transform 0.3s, color 0.3s' }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.2)';
                  e.currentTarget.style.color = '#76B900';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.color = '';
                }}
              />
            ))}
          </Stack>
        </Stack>

        <Button
          variant="contained"
          fullWidth
          sx={{
            textTransform: 'uppercase',
            backgroundColor: '#76B900',
            color: '#000',
            fontSize: isMobile ? '1.1rem' : '1.3rem',
            padding: '12px 24px',
            borderRadius: 2,
            transition: 'background-color 0.3s, box-shadow 0.3s',
            '&:hover': {
              backgroundColor: '#A4D17A',
              boxShadow: '0 0 10px 2px rgba(118, 185, 0, 0.5)',
            },
          }}
          onClick={handleOpen} // Gắn sự kiện mở Dialog
        >
          Confirm Order
        </Button>
      </Stack>

      {/* Payment Confirmation Dialog */}
      <PaymentConfirmation open={open} handleClose={handleClose} />
    </Paper>
  );
}
