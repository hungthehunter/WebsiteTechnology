import { ExpandLess, ExpandMore, StarBorder as StarBorderIcon } from '@mui/icons-material';
import {
    Box,
    Button,
    Grid,
    IconButton,
    LinearProgress,
    Paper,
    Rating,
    ThemeProvider,
    Typography,
    createTheme,
} from '@mui/material';
import React, { useState } from 'react';
// Định nghĩa theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50', // Xanh lá
    },
    secondary: {
      main: '#FFC107', // Vàng cho các ngôi sao
    },
    background: {
      default: '#000000', // Đen
      paper: '#1C1C1C', // Đen nhạt hơn cho các phần tử Paper
    },
    text: {
      primary: '#FFFFFF', // Trắng cho text chính
      secondary: '#B0B0B0', // Xám nhạt cho text phụ
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1.2rem',
    },
    body2: {
      fontSize: '1.1rem',
    },
  },
});

// Dữ liệu mẫu
const sampleReviews = {
  average: 4.3,
  total: 1287,
  distribution: [
    723,  // 5 sao
    412,  // 4 sao
    97,   // 3 sao
    38,   // 2 sao
    17    // 1 sao
  ],
  recentReviews: [
    {
      id: 1,
      username: "John Doe",
      rating: 5,
      date: "2023-05-15",
      comment: "Sản phẩm tuyệt vời! Hiệu năng vượt trội so với mong đợi của tôi."
    },
    {
      id: 2,
      username: "Alice Smith",
      rating: 4,
      date: "2023-05-14",
      comment: "Card đồ họa rất tốt cho công việc thiết kế của tôi. Chỉ tiếc là hơi ồn khi hoạt động ở công suất cao."
    },
    {
      id: 3,
      username: "Bob Johnson",
      rating: 3,
      date: "2023-05-12",
      comment: "Sản phẩm ổn, nhưng giá hơi cao so với các sản phẩm cùng phân khúc."
    },
    {
      id: 4,
      username: "Emma Wilson",
      rating: 5,
      date: "2023-05-10",
      comment: "Tuyệt vời cho gaming! FPS cao và ổn định trong mọi tựa game tôi đã thử."
    },
    {
      id: 5,
      username: "David Brown",
      rating: 4,
      date: "2023-05-08",
      comment: "Chất lượng xây dựng tốt, nhưng hướng dẫn cài đặt có thể được cải thiện."
    }
  ]
};

function ProductReview() {
    const [showReviews, setShowReviews] = useState(false);
    const [visibleReviews, setVisibleReviews] = useState(3);
    const reviews = sampleReviews;  // Sử dụng dữ liệu mẫu

    const toggleReviews = () => {
        setShowReviews(!showReviews);
        if (!showReviews) {
            setVisibleReviews(3); // Reset số lượng đánh giá hiển thị khi mở lại
        }
    };

    const loadMoreReviews = () => {
        setVisibleReviews(prevVisible => prevVisible + 3);
    };
  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={3} sx={{ p: 3, backgroundColor: 'background.paper' }}>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ textAlign: 'left', color: 'text.primary' }}>
            Review & Comment
          </Typography>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Typography variant="h4" color="primary">{reviews.average.toFixed(1)}/5</Typography>
                <Rating value={reviews.average} readOnly size="large" sx={{ color: 'secondary.main', fontSize: '2rem' }} />
                <Typography variant="body2" color="text.secondary">{reviews.total} đánh giá và nhận xét</Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {[5, 4, 3, 2, 1].map((star) => (
                  <Box key={star} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating value={star} readOnly size="small" sx={{ mr: 1, color: 'secondary.main', fontSize: '1.5rem' }} />
                    <LinearProgress 
                      variant="determinate" 
                      value={(reviews.distribution[5-star] / reviews.total) * 100 || 0} 
                      sx={{ 
                        flexGrow: 1, 
                        mr: 1, 
                        height: 10, 
                        backgroundColor: 'grey.700',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: 'primary.main',
                        }
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {[5, 4, 3, 2, 1].map((star) => (
                  <Box key={star} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      {reviews.distribution[5-star]} đánh giá
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h6" color="text.primary" sx={{ mr: 1 }}>
                                Recent Reviews
                            </Typography>
                            <IconButton onClick={toggleReviews} sx={{ color: 'text.primary', p: 0 }}>
                                {showReviews ? <ExpandLess /> : <ExpandMore />}
                            </IconButton>
                        </Box>
                        {showReviews && (
                            <>
                                {reviews.recentReviews.slice(0, visibleReviews).map((review) => (
                                    <Box key={review.id} sx={{ mb: 2 }}>
                                        <Typography variant="body1" color="text.primary">{review.username}</Typography>
                                        <Rating value={review.rating} readOnly size="small" sx={{ color: 'secondary.main' }} />
                                        <Typography variant="body2" color="text.secondary">{review.date}</Typography>
                                        <Typography variant="body2" color="text.primary">{review.comment}</Typography>
                                    </Box>
                                ))}
                                {visibleReviews < reviews.recentReviews.length && (
                                    <Button 
                                        onClick={loadMoreReviews}
                                        sx={{ mt: 2, color: 'text.primary' }}
                                    >
                                        Xem thêm đánh giá
                                    </Button>
                                )}
                            </>
                        )}
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2 }}>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            startIcon={<StarBorderIcon sx={{ fontSize: '1.5rem' }} />}
                            sx={{ 
                                textTransform: 'none',
                                fontSize: '1.2rem',
                                padding: '10px 20px',
                            }}
                        >
                            Submit your review
                        </Button>
                    </Box>
                </Box>
      </Paper>
    </ThemeProvider>
  );
}

export default ProductReview;