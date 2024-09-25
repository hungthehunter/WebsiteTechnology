import {
  faCcAmex,
  faCcDiscover,
  faCcMastercard,
  faCcPaypal,
  faCcVisa
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Box,
  Button,
  LinearProgress,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import React, { useEffect, useState } from 'react';

// Dữ liệu mẫu
const dummyData = {
  totalPrice: 1500
};

export default function OrderDetail() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [progress, setProgress] = useState(0);
  const [totalPrice] = useState(dummyData.totalPrice);

  useEffect(() => {
    const value = (totalPrice / 20);
    setProgress(value);
  }, [totalPrice]);

  return (
    <Paper
      elevation={0}
      sx={{
        height: '100%',
        width: '100%', // Sử dụng toàn bộ chiều rộng có sẵn
        border: '1px solid #4CAF50',
        backgroundColor: '#1E1E1E',
        color: '#fff',
      
      }}
    >
            <Stack spacing={2}>
        <Typography
          variant={isMobile ? "h6" : "h5"}
          sx={{
            p: 2,
            bgcolor: '#4CAF50',
            color: '#fff',
            fontWeight: 'bold',
            textAlign: 'center',
            textTransform: 'uppercase',
          }}
        >
          Order Detail
        </Typography>
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant={isMobile ? "h6" : "h5"} sx={{ textTransform: 'uppercase', fontWeight: 'bold' , color: '#4CAF50'}}>
              Total:
            </Typography>
            <Typography variant={isMobile ? "h6" : "h5"} sx={{ textTransform: 'uppercase', fontWeight: 'bold', color: '#FFD54F' }}>
              ${totalPrice.toLocaleString()}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant={isMobile ? "h6" : "h5"} sx={{ textTransform: 'uppercase', fontWeight: 'bold', color: '#4CAF50' }}>
              Shipping:
            </Typography>
            <Typography variant={isMobile ? "body1" : "h6"} sx={{ color: '#A5D6A7' }}>
              Shipping & taxes calculated at checkout
            </Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
          <Typography variant={isMobile ? "body1" : "h6"} color="primary" sx={{ fontWeight: 500, mb: 1 }}>
    {progress >= 100
      ? "CONGRATULATIONS! YOU'VE GOT FREE SHIPPING!"
      : `SPEND $${(2000 - totalPrice).toFixed(2)} FOR FREE SHIPPING`}
  </Typography>
            <LinearProgress variant="determinate" value={progress} color="primary" sx={{ mb: 1, height: 10 }} />
            <Typography variant={isMobile ? "body1" : "h6"} >
              Free shipping for any orders above <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>$2000</span>
            </Typography>
          </Box>
        </Box>

        <Stack sx={{ p: 2 }}>
          <Typography variant={isMobile ? "h6" : "h5"} sx={{ textTransform: 'uppercase', fontWeight: 'bold', mb: 1 }}>
            Add a note to your order:
          </Typography>
          <TextField
          multiline
          rows={4}
          placeholder="Your note"
          variant="outlined"
          fullWidth // Đảm bảo TextField chiếm toàn bộ chiều rộng
          sx={{ 
            mb: 2, 
            '& .MuiOutlinedInput-root': { 
              color: '#fff', 
              '& fieldset': { borderColor: '#4CAF50' },
              fontSize: isMobile ? '1rem' : '1.25rem'
            } 
          }}
        />

<Stack 
          direction="row" 
          spacing={2} 
          justifyContent="space-between" 
          sx={{ 
            mb: 2, 
            p: 2, 
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 1,
            width: '100%',
          }}
        >
          <FontAwesomeIcon icon={faCcVisa} size={isMobile ? "2x" : "3x"} color="#FFD700" />
          <FontAwesomeIcon icon={faCcMastercard} size={isMobile ? "2x" : "3x"} color="#FF4500" />
          <FontAwesomeIcon icon={faCcPaypal} size={isMobile ? "2x" : "3x"} color="#00CED1" />
          <FontAwesomeIcon icon={faCcAmex} size={isMobile ? "2x" : "3x"} color="#4169E1" />
          <FontAwesomeIcon icon={faCcDiscover} size={isMobile ? "2x" : "3x"} color="#FF8C00" />
        </Stack>

        </Stack>

        

          <Button 
            variant="contained" 
            sx={{ 
              textTransform: 'uppercase', 
              backgroundColor: '#2E7D32', 
              color: '#fff', 
              fontSize: isMobile ? '1.1rem' : '1.3rem',
              padding: '12px 24px',
              '&:hover': { backgroundColor: '#45a049' }
            }}
          >
            Confirm Order
          </Button>
        </Stack>
    </Paper>
  );
}