import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useDispatch, useSelector } from "react-redux";
import { productThunk } from "../../../../services/redux/thunks/thunk";
import "./assets/css/style.scss";
import LoadingOverlay from "./overlay/LoadingOverlay";
function AdminViewProduct({ id, setActiveComponent }) {
  const isLoading = useSelector((state) => state.product.isLoading);
  const dispatch = useDispatch();
  const [showFullSpecs, setShowFullSpecs] = useState(false);
  const [visibleSpecs, setVisibleSpecs] = useState(5); // Chỉnh số lượng hiển thị ở đây

  useEffect(() => {
    dispatch(productThunk.getProductById(id));
  }, [dispatch]);

  const selectedProduct = useSelector((state) => state.product.selectedProduct);
  if (!selectedProduct) {
    return (
      <LoadingOverlay isLoading={isLoading} message="Please wait..." />
    );
  }

  // Prepare images for Image Gallery
  const images = selectedProduct?.product_image?.map((image) => ({
    original: image.url,
    thumbnail: image.url,
  }));

  // Separate the main image from the rest
  const mainImage = images.find(
    (img) =>
      img.original ===
      selectedProduct?.product_image?.find((img) => img.mainImage)?.url
  );
  const otherImages = images.filter((img) => img !== mainImage);

  return (
    <Container className="no-margin-container" style={{ marginTop: '20px', maxWidth: '100%' }}>
       {isLoading && <LoadingOverlay isLoading={isLoading} message="Please wait..." />}
      <Card>
        <CardHeader title="Product Information" />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <ImageGallery
                items={[mainImage, ...otherImages]}
                showPlayButton={false}
                showThumbnails={true}
                lazyLoad={true}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>
                {selectedProduct?.productName}
              </Typography>
              <Typography variant="h6">
              <strong>Manufacturer:</strong> {selectedProduct?.manufacturer?.name}
              </Typography>
              <Typography variant="h6" >
              <strong>Category:</strong>  {selectedProduct?.category?.name}
              </Typography>
              <Typography variant="h6" >
              <strong>Promotion:</strong>    {selectedProduct?.promotion?.name}
              </Typography>
              
              {/* Bảng mô tả thông số sản phẩm */}
              <Typography variant="h5" gutterBottom color="primary">Product Description</Typography>
              {selectedProduct && selectedProduct?.specification && (
                <>
                  <TableContainer
                    component={Paper}
                    sx={{ border: 1, borderColor: 'primary.main', borderRadius: 2, overflow: 'hidden' }}
                  >
                    <Table>
                      <TableBody>
                        {selectedProduct.specification.slice(0, visibleSpecs).map((spec, index) => (
                          <TableRow
                            key={spec.specificationName}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              sx={{
                                backgroundColor: index % 2 === 0 ? 'rgba(76, 175, 80, 0.1)' : 'background.paper',
                                fontWeight: 'bold',
                                color: 'text.primary',
                              }}
                            >
                              <Typography variant="body1">{spec.specificationName}</Typography>
                            </TableCell>
                            <TableCell
                              sx={{
                                backgroundColor: index % 2 === 0 ? 'rgba(76, 175, 80, 0.1)' : 'background.paper',
                                color: 'text.primary',
                              }}
                            >
                              <Typography variant="body2">{spec.specificationData}</Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Button
                      onClick={() => {
                        setShowFullSpecs(!showFullSpecs);
                        setVisibleSpecs(showFullSpecs ? 5 : selectedProduct.specification.length); // Hiển thị tất cả thông số nếu nhấn
                      }}
                      endIcon={showFullSpecs ? <ExpandLess /> : <ExpandMore />}
                      sx={{ color: 'text.primary', textTransform: 'none' }}
                    >
                      <Typography variant="body1">
                        {showFullSpecs ? 'Thu gọn' : 'Xem thêm'}
                      </Typography>
                    </Button>
                  </Box>
                </>
              )}
              
              <Button
                variant="contained"
                color="primary"
                onClick={() => setActiveComponent({ name: "AdminProduct" })}
                style={{ marginTop: '20px' }}
              >
                Return
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

export default AdminViewProduct;
