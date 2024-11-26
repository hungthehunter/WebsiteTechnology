// PaymentConfirmation.js
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
} from '@mui/material';

import PICTURE from "../../../Assests/PICTURE";

const PaymentConfirmation = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle fontSize={20}>Xác nhận thanh toán</DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom fontSize={15}>
          Vui lòng xác nhận thông tin thanh toán của bạn trước khi tiếp tục.
        </Typography>
        <Grid container spacing={2}>
          {/* Phần địa chỉ thanh toán */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom fontSize={14}>
              Địa chỉ thanh toán
            </Typography>
            <TextField
              label="Họ và tên"
              
              margin="dense"
              style={{ marginBottom: '20px' }}
              InputProps={{style: {fontSize: "16px"}}}
              InputLabelProps={{style: {fontSize: "16px"}}}
              fullWidth
            />
            <TextField
              label="Email"
              
              margin="dense"
              style={{ marginBottom: '20px' }}
              InputProps={{style: {fontSize: "16px"}}}
              InputLabelProps={{style: {fontSize: "16px"}}}
              fullWidth
            />
            <TextField
              label="Địa chỉ"
              
              margin="dense"
              style={{ marginBottom: '20px' }}
              InputProps={{style: {fontSize: "16px"}}}
              InputLabelProps={{style: {fontSize: "16px"}}}
              fullWidth
            />
            <TextField
              label="Thành phố"
              
              margin="dense"
              style={{ marginBottom: '20px' }}
              InputProps={{style: {fontSize: "16px"}}}
              InputLabelProps={{style: {fontSize: "16px"}}}
              fullWidth
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Quốc gia"
                  
                  margin="dense"
                  style={{ marginBottom: '20px' }}
                  InputProps={{style: {fontSize: "16px"}}}
                  InputLabelProps={{style: {fontSize: "16px"}}}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Mã bưu điện"
                  
                  margin="dense"
                  InputProps={{style: {fontSize: "16px"}}}
                  InputLabelProps={{style: {fontSize: "16px"}}}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Phần thông tin thanh toán */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom fontSize={14}>
              Thông tin thanh toán
            </Typography>
            <Box 
                margin= "dense"
                sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', mb: 2, marginBottom: '34px' }}>
              <Typography variant="body1" sx={{ mr: 2 }}>
                Thẻ được chấp nhận:
              </Typography>
              <img src={PICTURE.cards_accepted} alt="Cards" height="34" />
            </Box>
            <TextField
              label="Tên trên thẻ"
              
              margin="dense"
              InputProps={{style: {fontSize: "16px"}}}
              InputLabelProps={{style: {fontSize: "16px"}}}
              fullWidth
              style={{ marginBottom: '20px' }}
            />
            <TextField
              label="Số thẻ tín dụng"
              
              InputProps={{style: {fontSize: "16px"}}}
              InputLabelProps={{style: {fontSize: "16px"}}}
              margin="dense"
              fullWidth
              style={{ marginBottom: '20px' }}
            />
            <TextField
              label="Tháng hết hạn"
              
              InputProps={{style: {fontSize: "16px"}}}
              InputLabelProps={{style: {fontSize: "16px"}}}
              margin="dense"
              fullWidth
              style={{ marginBottom: '20px' }}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Năm hết hạn"
                  
                  margin="dense"
                  InputProps={{style: {fontSize: "16px"}}}
                  InputLabelProps={{style: {fontSize: "16px"}}}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="CVV"
                  
                  InputProps={{style: {fontSize: "16px"}}}
                  InputLabelProps={{style: {fontSize: "16px"}}}
                  margin="dense"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Hủy
        </Button>
        <Button onClick={handleClose} variant="contained" color="primary">
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentConfirmation;
