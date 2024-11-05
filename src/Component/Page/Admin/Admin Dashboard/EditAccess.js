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
import { decentralizationThunk } from "../../../../services/redux/thunks/thunk";

function AdminEditAccess({ setActiveComponent, id, showAlert }) {
  const [roleName, setRoleName] = useState("");
  const [roleNameError, setRoleNameError] = useState("");
  const dispatch = useDispatch();

  const selectedDecentralization = useSelector(
    (state) => state.decentralization.selectedDecentralization
  );
  const listFunction = useSelector((state) => state.function.listFunction);
  const listAccess = useSelector((state) => state.access.listAccess);

  const [checkedState, setCheckedState] = useState([]);

  useEffect(() => {
    dispatch(decentralizationThunk.getDecentralizationById(id));
  }, [dispatch, id]);

  // Cập nhật checkedState dựa trên selectedDecentralization
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

    if (newRoleName) {
      checkRoleNameExists(newRoleName);
    } else {
      setRoleNameError("");
    }
  };

  const checkRoleNameExists = (name) => {
    const roleExists = listAccess.some(
      (role) =>
        role.roleName.toLowerCase() === name.toLowerCase() &&
        role.roleName.toLowerCase() !==
          selectedDecentralization.access.roleName.toLowerCase()
    );
    setRoleNameError(
      roleExists ? "Tên vai trò đã tồn tại, vui lòng nhập tên khác." : ""
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (roleNameError || !roleName) {
      return;
    }

    const selectedFunctions = listFunction
      .filter((_, index) => checkedState[index])
      .map((func) => ({ functionName: func.functionName }));

    const decentralizationData = {
      access: { roleName },
      functionIds: selectedFunctions,
    };

    console.log("decentralization ", decentralizationData)
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
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Box className="details_table">
        <Box className="table recentOrders">
          <Box className="cardHeader">
            <Typography variant="h4">Chỉnh sửa Quyền</Typography>
          </Box>

          <form className="form-account" onSubmit={handleSubmit}>
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
                          checked={checkedState[index] || false} // Sử dụng `|| false` để tránh lỗi undefined
                          onChange={() => handleCheckboxChange(index)}
                          sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                        />
                      }
                      label={func.functionName}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Box sx={{ marginTop: 3 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                className="button"
              >
                Cập nhật
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default AdminEditAccess;
