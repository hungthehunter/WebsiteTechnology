import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decentralizationThunk } from "../../../../../services/redux/thunks/thunk";
import { editAccessValidationSchema } from "../../../../../services/yup/Admin/Access/editAccessValidation";
import LoadingOverlay from "../overlay/LoadingOverlay";

function AdminEditAccess({ setActiveComponent, id, showAlert }) {
  const isLoading = useSelector((state) => state.decentralization.isLoading);
  const [roleName, setRoleName] = useState("");
  const [roleNameError, setRoleNameError] = useState("");
  const [checkboxError, setCheckboxError] = useState(""); // New state for checkbox error
  const dispatch = useDispatch();

  const selectedDecentralization = useSelector(
    (state) => state.decentralization.selectedDecentralization
  );
  const listFunction = useSelector((state) => state.function.listFunction);
  const [checkedState, setCheckedState] = useState([]);

  useEffect(() => {
    dispatch(decentralizationThunk.getDecentralizationById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedDecentralization && listFunction.length > 0) {
      const newCheckedState = listFunction.map((func) =>
        selectedDecentralization.functionIds.some((f) => f.id === func.id)
      );
      setCheckedState(newCheckedState);
      setRoleName(selectedDecentralization.access.roleName);
    }
  }, [selectedDecentralization, listFunction]);

  const handleCheckboxChange = (index) => {
    const updatedCheckedState = checkedState.map((item, i) =>
      i === index ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  const handleRoleNameChange = (e) => {
    const newRoleName = e.target.value;
    setRoleName(newRoleName);
    setRoleNameError(""); // Clear error when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form with yup
    try {
      await editAccessValidationSchema.validate({
        roleName,
        selectedFunctions: checkedState.filter((checked) => checked), // Selected functions
      });

      // Proceed with submission if validation passes
      const selectedFunctions = listFunction
        .filter((_, index) => checkedState[index])
        .map((func) => ({ functionName: func.functionName }));

      const decentralizationData = {
        access: { roleName },
        functionIds: selectedFunctions,
      };
      
      try {
        await dispatch(
          decentralizationThunk.updateDecentralization({
            id: id,
            decentralizationData: decentralizationData,
          })
        );
        showAlert("Decentralization updated successfully.", "success");
        setTimeout(() => setActiveComponent({ name: "AdminAccess" }), 1000);
      } catch (error) {
        showAlert(
          "Failed to update the decentralization. Please try again.",
          "error"
        );
      }
    } catch (error) {
      // Handle validation errors
      if (error.path === "roleName") {
        setRoleNameError(error.message);
      } else if (error.path === "selectedFunctions") {
        setCheckboxError(error.message);
      }
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      {isLoading && (
        <LoadingOverlay isLoading={isLoading} message="Please wait..." />
      )}
      <Box className="details_table">
        <Box className="table recentOrders">
          <Box className="cardHeader">
            <Typography variant="h4">Chỉnh sửa Quyền</Typography>
          </Box>

          <form className="form-account" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <FormHelperText
                sx={{ fontSize: "18px", fontWeight: "bold", color: "black" }}
              >
                Role Name
              </FormHelperText>
              <TextField
                placeholder="Example: Assignment"
                value={roleName}
                onChange={handleRoleNameChange}
                error={Boolean(roleNameError)}
                helperText={roleNameError}
                fullWidth
                sx={{ marginBottom: 3 }}
              />

              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <FormHelperText sx={{ fontSize: "18px", fontWeight: "bold" }}>
                  Allowance Access
                </FormHelperText>

                <Grid container spacing={2}>
                  {listFunction.map((func, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={func.id}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={checkedState[index] || false}
                            onChange={() => handleCheckboxChange(index)}
                            sx={{
                              "& .MuiSvgIcon-root": { fontSize: 28 },
                            }}
                          />
                        }
                        label={func.functionName}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>

              {checkboxError && (
                <FormHelperText error>{checkboxError}</FormHelperText>
              )}

              <Grid item xs={12}>
                <Button type="submit" variant="contained">
                  Update
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setActiveComponent({ name: "AdminAccess" })}
                  sx={{ marginTop: 0, marginLeft: 2 }}
                >
                  Return to Access
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default AdminEditAccess;
