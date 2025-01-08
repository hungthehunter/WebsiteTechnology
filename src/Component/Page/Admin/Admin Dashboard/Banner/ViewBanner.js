import {
  CalendarToday as CalendarIcon,
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
import { bannerThunk } from "../../../../../services/redux/thunks/thunk";
import LoadingOverlay from "../overlay/LoadingOverlay";

function AdminViewBanner({ id, setActiveComponent }) {
  const isLoading = useSelector((state) => state.banner.isLoading);
  const dispatch = useDispatch();

  const selectedBanner = useSelector(
    (state) => state.banner.selectedBanner
  );

  useEffect(() => {
    dispatch(bannerThunk.getBannerById(id));
  }, [dispatch, id]);

  return (
    <Container maxWidth="md">
      {isLoading && (
        <LoadingOverlay isLoading={isLoading} message="Please wait..." />
      )}
      <Card sx={{ mt: 4 }}>
        <CardHeader
          title="Banner Information"
          sx={{ bgcolor: "primary.main", color: "white", textAlign: "center" }}
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box display="flex" flexDirection="column" alignItems="center">
                {selectedBanner?.imageCloud?.url ? (
                  <CardMedia
                    component="img"
                    image={selectedBanner.imageCloud.url}
                    alt="Banner Image"
                    sx={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                      maxHeight: "200px",
                      borderRadius: 2,
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      height: "200px",
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
                  {selectedBanner?.name || "N/A"}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Banner ID: {id}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <List>
                <ListItem>
                  <CalendarIcon sx={{ mr: 2 }} />
                  <ListItemText
                    primary="Status"
                    secondary={
                      selectedBanner?.status ? "Active" : "Inactive"
                    }
                    primaryTypographyProps={{ variant: "h6" }}
                  />
                </ListItem>
                <Divider />
                {selectedBanner?.specification?.map((spec) => (
                  <React.Fragment key={spec.id}>
                    <ListItem>
                      <ListItemText
                        primary={spec.specificationName}
                        secondary={spec.specificationData}
                        primaryTypographyProps={{ variant: "h6" }}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setActiveComponent({ name: "AdminBanner" })}
            >
              Return to Banner List
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default AdminViewBanner;
