import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';

const SliderContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '50vh',
  overflow: 'hidden',
  border: '0.5px solid gray',
}));

const SliderItem = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  overflow: 'hidden',
  opacity: 0,
  transition: 'opacity 0.5s ease-in-out',
  '&.active': {
    opacity: 1,
  },
}));

const SliderImage = styled('img')({
  height: '100%',
  width: 'auto',
  maxHeight: '100%',
  maxWidth: '100%',
  objectFit: 'cover',
});

const SliderContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '0',
  transform: 'translateY(-50%)',
  textAlign: 'left',
  color: theme.palette.common.white,
  padding: '0 10%',
  width: '100%',
  boxSizing: 'border-box',
}));

const ArrowButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: theme.palette.grey[700],
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.grey[900],
  },
  zIndex: 2,
}));

const ArrowLeft = styled(ArrowButton)({
  left: '10px',
});

const ArrowRight = styled(ArrowButton)({
  right: '10px',
});

const Slider = ({ images, activeSlide, onChangeSlide }) => {
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

  const handlePrev = () => {
    showSlide((currentIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    showSlide((currentIndex + 1) % images.length);
  };

  return (
    <SliderContainer id="slider">
      {images.map((image, index) => (
        <SliderItem key={index} className={index === currentIndex ? 'active' : ''}>
          <SliderImage src={image?.imageCloud?.url} alt={image.alt} />
          <SliderContent>
            <Typography
              variant="h2"
              component="div"
              gutterBottom
              sx={{ fontWeight: 'bold' }}
            >
              {/* {image?.name} */}
            </Typography>

            {image?.specification?.length > 0 ? (
              image?.specification?.map((specification, index) => (
                <Typography
                  key={index}
                  variant="h3"
                  component="div"
                  gutterBottom
                  sx={{ fontWeight: 'bold', marginBottom: 2 }}
                >
                  {/* {specification?.specificationData} */}
                </Typography>
              ))
            ) : (
              <div></div>
            )}
          </SliderContent>
        </SliderItem>
      ))}

      {/* Navigation Arrows */}
      <ArrowLeft onClick={handlePrev}>
        <ArrowBackIosNewIcon />
      </ArrowLeft>
      <ArrowRight onClick={handleNext}>
        <ArrowForwardIosIcon />
      </ArrowRight>
    </SliderContainer>
  );
};

export default Slider;
