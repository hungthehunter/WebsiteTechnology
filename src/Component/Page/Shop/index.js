import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Grid, 
  Typography, 
  Button, 
  Checkbox, 
  FormControlLabel, 
  TextField, 
  Container, 
  Paper, 
  Box, 
  Divider 
} from "@mui/material";
import PICTURE from "../../Assests/PICTURE";
import Shop_Fake from "./Shop_Product";

function Shop() {
  const [inputValue, setInputValue] = useState("");
  const [isGridView, setGridView] = useState(true);
  const [searchItem, setSearchItem] = useState("");
  const [placeholder, setPlaceholder] = useState("Example: Geforce RTX");
  const [categoryFilters, setCategoryFilters] = useState({
    gpu: false,
    laptop: false,
    RTX4090: false,
    RTX4080: false,
    RTX4070: false,
    RTX4050: false,
    NVIDIA: false,
    ACER: false,
    ASUS: false,
    $500: false,
    $1000: false,
    $2000: false,
  });

  const handleCategoryChange = (category) => {
    setCategoryFilters((prevFilters) => ({
      ...prevFilters,
      [category]: !prevFilters[category],
    }));
  };

  const handleResetFilters = () => {
    setCategoryFilters({
      gpu: false,
      laptop: false,
      RTX4090: false,
      RTX4080: false,
      RTX4070: false,
      RTX4050: false,
      NVIDIA: false,
      ACER: false,
      ASUS: false,
      $500: false,
      $1000: false,
      $2000: false,
    });
  };

  const handleClickButton = () => setSearchItem(inputValue);
  const handleFocus = () => setPlaceholder("");
  const handleBlur = () => !inputValue && setPlaceholder("Example: Geforce RTX");

  return (
    <Container
  maxWidth={false}
  sx={{
    height: '100vh',
    width: '100vw',
    bgcolor: 'black',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'auto',
    padding: 0,
    margin: 0,
  }}
>
  <Box
    sx={{
      width: '100%',
      maxWidth: '1200px',
      mx: 'auto',
      px: 2,
    }}
  >
    <Typography
      variant="h3"
      component="h1"
      gutterBottom
      sx={{ color: 'white', fontSize: '2.5rem', mb: 3 }}
    >
      NVIDIA STORE
    </Typography>

    <Grid container spacing={2} sx={{ height: 'calc(100vh - 160px)' }}>
      {/* Sidebar */}
      <Grid item xs={12} md={3}>
        <Paper sx={{ p: 2, backgroundColor: '#1c1c1c', height: '100%' }}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleResetFilters}
            sx={{
              mb: 2,
              backgroundColor: '#4caf50',
              color: 'white',
              fontSize: '1.5rem',
              '&:hover': { backgroundColor: '#45a049' },
            }}
          >
            RESET FILTERS
          </Button>

          <Typography
            variant="h5"
            gutterBottom
            sx={{ color: 'white', fontWeight: 'bold', textTransform: 'uppercase' }}
          >
            Product Category
          </Typography>
          <Divider sx={{ backgroundColor: '#4caf50', mb: 1 }} />
          <FormControlLabel
            control={
              <Checkbox
                checked={categoryFilters.laptop}
                onChange={() => handleCategoryChange('laptop')}
                sx={{
                  color: '#4caf50',
                  '&.Mui-checked': { color: '#4caf50' },
                }}
              />
            }
            label="Laptop"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.7rem',
              display: 'block', // Đặt xuống hàng
              mb: 2,
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={categoryFilters.gpu}
                onChange={() => handleCategoryChange('gpu')}
                sx={{
                  color: '#4caf50',
                  '&.Mui-checked': { color: '#4caf50' },
                }}
              />
            }
            label="GPU"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.7rem',
              display: 'block', // Đặt xuống hàng
              mb: 2,
            }}
          />

          <Typography
            variant="h5"
            sx={{ mt: 2, color: 'white', fontWeight: 'bold', textTransform: 'uppercase' }}
            gutterBottom
          >
            GPU Models
          </Typography>
          <Divider sx={{ backgroundColor: '#4caf50', mb: 1 }} />
          {["RTX4090", "RTX4080", "RTX4070", "RTX4050"].map((model) => (
            <FormControlLabel
              key={model}
              control={
                <Checkbox
                  checked={categoryFilters[model]}
                  onChange={() => handleCategoryChange(model)}
                  sx={{
                    color: '#4caf50',
                    '&.Mui-checked': { color: '#4caf50' },
                  }}
                />
              }
              label={model}
              sx={{
                color: 'white',
                fontSize: '1.7rem',
                display: 'block', // Đặt xuống hàng
                mb: 2,
              }}
            />
          ))}

          <Typography
            variant="h5"
            sx={{ mt: 2, color: 'white', fontWeight: 'bold', textTransform: 'uppercase' }}
            gutterBottom
          >
            Manufacturer
          </Typography>
          <Divider sx={{ backgroundColor: '#4caf50', mb: 1 }} />
          {["NVIDIA", "ACER", "ASUS"].map((brand) => (
            <FormControlLabel
              key={brand}
              control={
                <Checkbox
                  checked={categoryFilters[brand]}
                  onChange={() => handleCategoryChange(brand)}
                  sx={{
                    color: '#4caf50',
                    '&.Mui-checked': { color: '#4caf50' },
                  }}
                />
              }
              label={brand}
              sx={{
                color: 'white',
                fontSize: '1.7rem',
                display: 'block', // Đặt xuống hàng
                mb: 2,
              }}
            />
          ))}

          <Typography
            variant="h5"
            sx={{ mt: 2, color: 'white', fontWeight: 'bold', textTransform: 'uppercase' }}
            gutterBottom
          >
            Price Range
          </Typography>
          <Divider sx={{ backgroundColor: '#4caf50', mb: 1 }} />
          {["$500", "$1000", "$2000"].map((price) => (
            <FormControlLabel
              key={price}
              control={
                <Checkbox
                  checked={categoryFilters[price]}
                  onChange={() => handleCategoryChange(price)}
                  sx={{
                    color: '#4caf50',
                    '&.Mui-checked': { color: '#4caf50' },
                  }}
                />
              }
              label={`Above ${price}`}
              sx={{
                color: 'white',
                fontSize: '1.3rem',
                display: 'block', // Đặt xuống hàng
                mb: 2,
              }}
            />
          ))}
        </Paper>
      </Grid>

      {/* Main Content */}
      <Grid item xs={12} md={9}>
        <Paper sx={{ p: 3, backgroundColor: '#1c1c1c', height: '100%' }}>
          <Typography variant="h4" sx={{ mt: 4, color: 'white', fontSize: '2rem' }}>
            New Product
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} md={4}>
              <img
                src={PICTURE.GeForce_RTX4080}
                alt="RTX 4080"
                style={{ width: '100%', borderRadius: '8px' }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h5" sx={{ color: 'white', mb: 2, fontSize: '1.5rem' }}>
                NVIDIA GeForce RTX 4080
              </Typography>
              <ul style={{ color: 'white', fontSize: '1.3rem' }}>
                <li>Cooling System: Fan</li>
                <li>Boost Clock Speed: 2.52GHz</li>
              </ul>
              <Typography variant="h5" sx={{ mt: 2, color: '#4caf50', fontSize: '1.5rem' }}>
                $17,899.00
              </Typography>
              <Button
                variant="contained"
                color="success"
                sx={{ mt: 2, fontSize: '1.3rem' }}
                component={Link}
                to="/websiteDoAn/Products_gtx_4090"
              >
                ADD TO CART
              </Button>
              <Button
                variant="outlined"
                sx={{
                  mt: 2,
                  ml: 2,
                  borderColor: '#4caf50',
                  color: '#4caf50',
                  fontSize: '1.3rem',
                }}
              >
                COMPARE
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  </Box>
</Container>


  );
}

const getFilters = (section) => {
  switch (section) {
    case "Product Category":
      return ["laptop", "gpu"];
    case "GPU Models":
      return ["RTX4090", "RTX4080", "RTX4070", "RTX4050"];
    case "Manufacturer":
      return ["NVIDIA", "ACER", "ASUS"];
    case "Price Range":
      return ["$500", "$1000", "$2000"];
    default:
      return [];
  }
};

export default Shop;
