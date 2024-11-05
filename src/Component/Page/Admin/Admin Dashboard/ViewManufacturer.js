import { Email as EmailIcon, LocationOn as LocationOnIcon, Phone as PhoneIcon, Web as WebIcon } from "@mui/icons-material";
import { Avatar, Box, Button, Card, CardContent, CardHeader, Container, Divider, Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { manufacturerThunk } from "../../../../services/redux/thunks/thunk";

function AdminViewManufacturer({ id, setActiveComponent, showAlert }) {
  const listProduct = useSelector((state) => state.product.listProduct);
  const dispatch = useDispatch();
  useEffect(()=>{
  dispatch(manufacturerThunk.getManufacturerById(id));
  },[dispatch ,id ]);

  const selectedManufacturer = useSelector((state) => state.manufacturer.selectedManufacturer);

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
                  src={selectedManufacturer?.imageCloud?.url || ''}
                  sx={{
                    width: 250,
                    height: 150,
                    bgcolor: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    borderRadius: 0
                  }}
                >
                  {selectedManufacturer?.imageCloud?.url ? (
                    <img
                      src={selectedManufacturer?.imageCloud?.url}
                      alt="Manufacturer"
                      style={{
                        width: '100%',
                        height: '100%',
                        maxWidth: '100px',
                        maxHeight: '100px',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>N/A</Typography>
                  )}
                </Avatar>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  {selectedManufacturer?.name}
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
                      selectedManufacturer?.website ? (
                        <a href={selectedManufacturer?.website} target="_blank" rel="noopener noreferrer">
                          {selectedManufacturer?.website}
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
                    secondary={selectedManufacturer?.email || 'N/A'}
                    primaryTypographyProps={{ variant: "h6" }}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <PhoneIcon sx={{ mr: 2 }} />
                  <ListItemText
                    primary="Phone"
                    secondary={selectedManufacturer?.phone || 'N/A'}
                    primaryTypographyProps={{ variant: "h6" }}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <LocationOnIcon sx={{ mr: 2 }} />
                  <ListItemText
                    primary="Address"
                    secondary={selectedManufacturer?.address || 'N/A'}
                    primaryTypographyProps={{ variant: "h6" }}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Products"
                    secondary={
                      selectedManufacturer?.products && selectedManufacturer?.products.length > 0 ? (
                        <Box>
                          {selectedManufacturer?.products.map(product => (
                            <Typography key={product.id} variant="body1">
                              {listProduct.find(p => p.id === product.id)?.productName || 'Unknown Product'}
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
