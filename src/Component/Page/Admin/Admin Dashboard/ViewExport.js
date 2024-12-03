import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { exportThunk } from "../../../../services/redux/thunks/thunk";
import LoadingOverlay from "./overlay/LoadingOverlay";
function AdminViewExport({ id }) {
  const isLoading = useSelector((state) => state.export.isLoading);
    const dispatch = useDispatch();
    const selectedExport = useSelector((state) => state.export.selectedExport);
  const [formData, setFormData] = useState({
    dateExport: "",
    customer: {
      id: "",
      name: "",
      phone: "",
      email: "",
      address: "",
    },
    exportItems: [],
    total: "0",
  });

  useEffect(() => {
    loadExport(id);
  }, [id]);

  const loadExport = async (id) => {
    try {
      let result = dispatch(exportThunk.getExportById(id));
      setFormData(result.data);
    } catch (error) {
      console.log("Cannot load Export");
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
            {isLoading && (
        <LoadingOverlay isLoading={isLoading} message="Please wait..." />
      )}
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Box>
              <Typography variant="h5" gutterBottom>
                Export Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Export Date"
                    margin="normal"
                    type="date"
                    name="dateExport"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    value={selectedExport?.dateExport}
                    disabled={true}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Customer Name"
                    InputLabelProps={{ shrink: true }}
                    value={selectedExport?.customer?.name}
                    disabled={true}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    InputLabelProps={{ shrink: true }}
                    value={selectedExport?.customer?.phone}
                    disabled={true}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    InputLabelProps={{ shrink: true }}
                    value={selectedExport?.customer?.email}
                    disabled={true}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    InputLabelProps={{ shrink: true }}
                    value={selectedExport?.customer?.address}
                    disabled={true}
                    margin="normal"
                  />
                </Grid>
              </Grid>

              {/* Export Items */}
              {selectedExport?.exportItems?.map((exportItem, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Product"
                      InputLabelProps={{ shrink: true }}
                      value={exportItem.product.productName}
                      disabled={true}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Export Price"
                      value={exportItem.price}
                      disabled={true}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          color: "black !important",
                          "-webkit-text-fill-color": "black !important",
                        },
                      }}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Quantity"
                      type="number"
                      value={exportItem.quantity}
                      disabled={true}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <TextField
                      fullWidth
                      label="Total"
                      value={
                        exportItem.total === "" ? "$0" : `$${exportItem.total}`
                      }
                      disabled={true}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          color: "black !important",
                          "-webkit-text-fill-color": "black !important",
                        },
                      }}
                      margin="normal"
                    />
                  </Grid>
                </Grid>
              ))}

              {/* Total Amount */}
              <Grid item xs={12} md={12}>
                <Typography variant="h5" gutterBottom>
                  Total
                </Typography>
                <TextField
                  fullWidth
                  value={selectedExport?.total === "" ? "$0" : `$${selectedExport?.total}`}
                  disabled={true}
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: "black !important",
                      "-webkit-text-fill-color": "black !important",
                    },
                  }}
                  margin="normal"
                />
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default AdminViewExport;
