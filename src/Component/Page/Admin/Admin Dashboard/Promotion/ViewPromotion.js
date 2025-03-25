import {
  CalendarToday as CalendarIcon,
  Discount as DiscountIcon,
  BrokenImage as NoImageIcon
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { promotionThunk } from "../../../../../services/redux/thunks/thunk";
import LoadingOverlay from "../overlay/LoadingOverlay";

function AdminViewPromotion({ id, setActiveComponent }) {
  const isLoading = useSelector((state) => state.promotion.isLoading);
  const dispatch = useDispatch();
  const selectedPromotion = useSelector(
    (state) => state.promotion.selectedPromotion
  );

  useEffect(() => {
    dispatch(promotionThunk.getPromotionById(id));
  }, [dispatch, id]);

  return (
    <Container maxWidth="md">
      {isLoading && (
        <LoadingOverlay isLoading={isLoading} message="Please wait..." />
      )}
      <Card sx={{ mt: 4 }}>
        <CardHeader
          title="Promotion Information"
          sx={{ bgcolor: "primary.main", color: "white", textAlign: "center" }}
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box display="flex" flexDirection="column" alignItems="center">
                {selectedPromotion?.imageCloud?.url ? (
                  <CardMedia
                    component="img"
                    image={selectedPromotion.imageCloud.url}
                    alt="Promotion Banner"
                    sx={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                      maxHeight: "200px", // Giới hạn chiều cao ảnh
                      borderRadius: 2,
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      height: "200px", // Giới hạn chiều cao
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "grey.300",
                      borderRadius: 2,
                    }}
                  >
                    <NoImageIcon fontSize="large" />
                  </Box>
                )}
                <Typography variant="h6" sx={{ mt: 2 }}>
                  {selectedPromotion?.name || "N/A"}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Promotion ID: {id}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <List>
                <ListItem>
                  <DiscountIcon sx={{ mr: 2 }} />
                  <ListItemText
                    primary="Discount Percentage"
                    secondary={
                      selectedPromotion?.discountPercentage
                        ? `${selectedPromotion.discountPercentage}%`
                        : "N/A"
                    }
                    primaryTypographyProps={{ variant: "h6" }}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <CalendarIcon sx={{ mr: 2 }} />
                  <ListItemText
                    primary="Start Date"
                    secondary={
                      selectedPromotion?.startDate
                        ? new Date(selectedPromotion.startDate).toLocaleString()
                        : "N/A"
                    }
                    primaryTypographyProps={{ variant: "h6" }}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <CalendarIcon sx={{ mr: 2 }} />
                  <ListItemText
                    primary="End Date"
                    secondary={
                      selectedPromotion?.endDate
                        ? new Date(selectedPromotion.endDate).toLocaleString()
                        : "N/A"
                    }
                    primaryTypographyProps={{ variant: "h6" }}
                  />
                </ListItem>
                <Divider />
                {/* <ListItem>
                  <CategoryIcon sx={{ mr: 2 }} />
                  <ListItemText
                    primary="Applicable Categories"
                    secondary={
                      selectedPromotion?.applicableCategories?.length
                        ? selectedPromotion.applicableCategories
                            .map((category) => category.name)
                            .join(", ")
                        : "No categories"
                    }
                    primaryTypographyProps={{ variant: "h6" }}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ProductIcon sx={{ mr: 2 }} />
                  <ListItemText
                    primary="Applicable Products"
                    secondary={
                      selectedPromotion?.applicableProducts?.length
                        ? selectedPromotion.applicableProducts
                            .map((product) => product.productName)
                            .join(", ")
                        : "No products"
                    }
                    primaryTypographyProps={{ variant: "h6" }}
                  />
                </ListItem> */}
              </List>
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setActiveComponent({ name: "AdminPromotion" })}
            >
              Return to Promotion List
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default AdminViewPromotion;
