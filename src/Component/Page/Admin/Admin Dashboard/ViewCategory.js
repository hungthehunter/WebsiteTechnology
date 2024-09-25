import { Description as DescriptionIcon, LocationOn as LocationOnIcon, Web as WebIcon } from "@mui/icons-material";
import { Avatar, Box, Button, Card, CardContent, CardHeader, Container, Divider, Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getCategoryById } from "./service/AdminService"; // Assuming you have a service function to get category details

function AdminViewCategory({ id, setActiveComponent, showAlert }) {
  const [category, setCategory] = useState({});
  
  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    try {
      const response = await getCategoryById(id);
      setCategory(response.data);
    } catch (error) {
      console.error("Error fetching category:", error);
      showAlert("Failed to fetch category details.", "error");
    }
  };

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
                  src={category.imageCloud?.url || ''}
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
                  {category.imageCloud?.url ? (
                    <img
                      src={category.imageCloud.url}
                      alt="Category"
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
                  {category.name}
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
                    secondary={category.description || 'N/A'}
                    primaryTypographyProps={{ variant: "h6" }}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <WebIcon sx={{ mr: 2 }} />
                  <ListItemText
                    primary="Promotion"
                    secondary={category.promotion || 'N/A'}
                    primaryTypographyProps={{ variant: "h6" }}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <LocationOnIcon sx={{ mr: 2 }} />
                  <ListItemText
                    primary="Location"
                    secondary={category.product || 'N/A'}
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
