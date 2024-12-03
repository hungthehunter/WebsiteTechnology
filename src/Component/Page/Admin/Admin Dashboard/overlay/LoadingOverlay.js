import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import React from 'react';

const LoadingOverlay = ({ isLoading , message  }) => {
  if (!isLoading) return null;

  return (
    <Box
      sx={{
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
      }}
    >
      <CircularProgress size={60} thickness={4} sx={{ color: '#4CAF50' }} />
      <Typography variant="h6" sx={{ mt: 2, color: '#4CAF50' }}>
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingOverlay;
