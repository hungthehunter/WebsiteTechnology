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
import { importThunk } from "../../../../services/redux/thunks/thunk";
import LoadingOverlay from "./overlay/LoadingOverlay";
function AdminViewImport({ id }) {
  const isLoading = useSelector((state) => state.import.isLoading);
  const dispatch = useDispatch();
  const selectedImport = useSelector((state) => state.import.selectedImport);
  const [formData, setFormData] = useState({
    dateImport: "",
    manufacturer: {
      id: "",
      name: "",
    },
    importItems: [],
    total: "0",
  });

  useEffect(() => {
    loadImport(id);
  }, [id]);

  const loadImport = async (id) => {
    try {
      let result = dispatch(importThunk.getImportById(id));
      setFormData(result);
      console.log(formData);
    } catch (error) {
      console.log("Cannot load Import");
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
                Import Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Import Date"
                    margin="normal"
                    type="date"
                    name="dateImport"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    value={selectedImport?.dateImport}
                    disabled={true}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Manufacturer"
                    InputLabelProps={{ shrink: true }}
                    value={selectedImport?.manufacturer?.name}
                    disabled={true}
                    margin="normal"
                  />
                </Grid>
              </Grid>

              {/* Import Items */}
              {selectedImport?.importItems?.map((importItem, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Product"
                      InputLabelProps={{ shrink: true }}
                      value={importItem?.product?.productName}
                      disabled={true}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Import Price"
                      value={importItem?.price}
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
                      value={importItem?.quantity}
                      disabled={true}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <TextField
                      fullWidth
                      label="Total"
                      value={
                        importItem?.total === ""
                          ? "$0"
                          : `$${importItem?.total}`
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
                  value={
                    selectedImport?.total === ""
                      ? "$0"
                      : `$${selectedImport?.total}`
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
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default AdminViewImport;
