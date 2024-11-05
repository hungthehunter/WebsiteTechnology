import {
  Description as DescriptionIcon,
  Laptop as LaptopChromebook,
  Web as WebIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryThunk } from "../../../../services/redux/thunks/thunk";

function AdminViewCategory({ id, setActiveComponent }) {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (state) => state.category.selectedCategory
  );

  useEffect(() => {
    dispatch(categoryThunk.getCategoryById(id));
  }, [dispatch, id]);

  return (
    <Container maxWidth="md">
      <Card sx={{ mt: 4 }}>
        <CardHeader
          title="Category Information"
          sx={{ bgcolor: "primary.main", color: "white", textAlign: "center" }}
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Avatar
                  src={selectedCategory?.imageCloud?.url || ""}
                  sx={{
                    width: 100,
                    height: 100,
                    bgcolor: "grey.300",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    borderRadius: 0,
                  }}
                >
                  {selectedCategory?.imageCloud?.url ? (
                    <img
                      src={selectedCategory?.imageCloud.url}
                      alt="Category"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <Typography
                      variant="body1"
                      sx={{ color: "text.secondary" }}
                    >
                      N/A
                    </Typography>
                  )}
                </Avatar>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  {selectedCategory?.name || "N/A"}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Category ID: {id}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <List>
                <ListItem>
                  <DescriptionIcon sx={{ mr: 2 }} />
                  <ListItemText
                    primary="Description"
                    secondary={selectedCategory?.description || "N/A"}
                    primaryTypographyProps={{ variant: "h6" }}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <WebIcon sx={{ mr: 2 }} />
                  <ListItemText
                    primary="Promotion"
                    secondary={
                      selectedCategory?.promotion
                        ? selectedCategory?.promotion?.name
                        : "N/A"
                    }
                    primaryTypographyProps={{ variant: "h6" }}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <LaptopChromebook sx={{ mr: 2 }} />
                  <ListItemText
                    primary="Products"
                    secondary={
                      Array.isArray(selectedCategory?.products) &&
                      selectedCategory?.products.length > 0
                        ? selectedCategory?.products
                            .map((product) => product.productName)
                            .join(", ")
                        : "N/A"
                    }
                    primaryTypographyProps={{ variant: "h6" }}
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setActiveComponent({ name: "AdminCategory" })}
            >
              Return to Category List
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default AdminViewCategory;
