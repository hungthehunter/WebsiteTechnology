import { Email as EmailIcon, LocationOn as LocationOnIcon, Phone as PhoneIcon, Web as WebIcon } from "@mui/icons-material";
import { Avatar, Box, Button, Card, CardContent, CardHeader, Container, Divider, Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllProduct } from "../../../Serivce/ApiService";
import { getManufacturerById } from "./service/AdminService";

function AdminViewManufacturer({ id, setActiveComponent, showAlert }) {
  const [manufacturer, setManufacturer] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getManufacturer();
    getAllProducts();
  }, []);

  const getManufacturer = async () => {
    try {
      const response = await getManufacturerById(id);
      setManufacturer(response.data);
    } catch (error) {
      console.error("Error fetching manufacturer:", error);
      showAlert("Failed to fetch manufacturer details.", "error");
    }
  };

  const getAllProducts = async () => {
    try {
      const response = await getAllProduct()
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to get products:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Card sx={{ mt: 4 }}>
        <CardHeader
          title="Manufacturer Information"
          sx={{ bgcolor: "primary.main", color: "white", textAlign: "center" }}
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Avatar
                  src={manufacturer.imageCloud?.url || ''}
                  sx={{
                    width: 100,
                    height: 100,
                    bgcolor: 'grey.300',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  {manufacturer.imageCloud?.url ? (
                    <img
                      src={manufacturer.imageCloud.url}
                      alt="Manufacturer"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>N/A</Typography>
                  )}
                </Avatar>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  {manufacturer.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Manufacturer ID: {id}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <List>
                <ListItem>
                  <WebIcon sx={{ mr: 2 }} />
                  <ListItemText
                    primary="Website"
                    secondary={
                      manufacturer.website ? (
                        <a href={manufacturer.website} target="_blank" rel="noopener noreferrer">
                          {manufacturer.website}
                        </a>
                      ) : 'N/A'
                    }
                    primaryTypographyProps={{ variant: "h6" }}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <EmailIcon sx={{ mr: 2 }} />
                  <ListItemText
                    primary="Email"
                    secondary={manufacturer.email || 'N/A'}
                    primaryTypographyProps={{ variant: "h6" }}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <PhoneIcon sx={{ mr: 2 }} />
                  <ListItemText
                    primary="Phone"
                    secondary={manufacturer.phone || 'N/A'}
                    primaryTypographyProps={{ variant: "h6" }}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <LocationOnIcon sx={{ mr: 2 }} />
                  <ListItemText
                    primary="Address"
                    secondary={manufacturer.address || 'N/A'}
                    primaryTypographyProps={{ variant: "h6" }}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Products"
                    secondary={
                      manufacturer.products && manufacturer.products.length > 0 ? (
                        <Box>
                          {manufacturer.products.map(product => (
                            <Typography key={product.id} variant="body1">
                              {products.find(p => p.id === product.id)?.productName || 'Unknown Product'}
                            </Typography>
                          ))}
                        </Box>
                      ) : 'No products associated'
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
              onClick={() => setActiveComponent({ name: "AdminManufacturer" })}
            >
              Return to Manufacturer List
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default AdminViewManufacturer;
