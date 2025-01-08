import {
  Box,
  Button,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SliderContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '50vh',
  overflow: 'hidden',
}));

const SliderItem = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex', // Thêm display flex để căn giữa
  overflow: 'hidden', // Ẩn phần thừa
  opacity: 0,
  transition: 'opacity 0.5s ease-in-out',
  '&.active': {
    opacity: 1,
  },
}));

const SliderImage = styled('img')({
  height: '100%', // Đặt chiều cao là 100% để phủ đầy khung
  width: 'auto',
  maxHeight: '100%', // Đặt chiều cao tối đa là 100%
  maxWidth: '100%', // Đặt chiều rộng tối đa là 100%
  objectFit: 'cover', // Sử dụng contain để giữ nguyên tỷ lệ
});

const SliderContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '0',
  transform: 'translateY(-50%)', // Center vertically
  textAlign: 'left', // Align text to the left
  color: theme.palette.common.white,
  padding: '0 10%', // Add padding to avoid content touching the edges
  width: '100%', // Ensure content can use full width
  boxSizing: 'border-box', // Ensure padding does not increase overall size
}));

const SliderDots = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
}));

const SliderDot = styled(Box)(({ theme }) => ({
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  backgroundColor: theme.palette.grey[500],
  margin: '0 5px',
  cursor: 'pointer',
  '&.active': {
    backgroundColor: theme.palette.success.light,
  },
}));

const SliderButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#76b900',
  color: theme.palette.common.black,
  '&:hover': {
    backgroundColor: theme.palette.success.light,
  },
}));

const SLIDER = ({ images, activeSlide, onChangeSlide }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(activeSlide);
  }, [activeSlide]);

  useEffect(() => {
    const interval = setInterval(() => {
      showSlide((currentIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  const showSlide = (index) => {
    setCurrentIndex(index);
    onChangeSlide(index);
  };

  return (
    <SliderContainer id="slider">
       
      {images.map((image, index) => (
        <SliderItem key={index} className={index === currentIndex ? 'active' : ''}>
            <SliderImage src={image?.imageCloud?.url} alt={image.alt} />
          <SliderContent>
            <Typography variant="h2" component="div" gutterBottom sx={{ fontWeight: 'bold' }}>
              {image?.name}
            </Typography>
            <Typography variant="h3" component="div" gutterBottom sx={{ fontWeight: 'bold', marginBottom: 2 }}>
              {image?.description}
            </Typography>
            <SliderButton
              component={Link}
              to={'/websiteDoAn/Shop'}
              variant="contained"
              size="medium"
              sx={{ fontSize: 20, marginTop: 2, textTransform: 'none' , fontWeight: 'normal' }}
            >
              Shop Now 
            </SliderButton>
          </SliderContent>
        </SliderItem>
      ))}
      <SliderDots>
        {images.map((_, index) => (
          <SliderDot
            key={index}
            onClick={() => showSlide(index)}
            className={index === currentIndex ? 'active' : ''}
          />
        ))}
      </SliderDots>
    </SliderContainer>
  );
};

export default SLIDER;