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
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decentralizationThunk } from "../../../../services/redux/thunks/thunk";

function AdminAddAccess({ setActiveComponent, showAlert }) {
  const [roleName, setRoleName] = useState("");
  const [checkedState, setCheckedState] = useState([]);
  const [roleNameError, setRoleNameError] = useState("");

  const listFunction = useSelector((state) => state.function.listFunction);
  const listUser = useSelector((state) => state.user.listUser);
  const dispatch = useDispatch();

  const checkRoleNameExists = (roleName) =>
    listUser.some(
      (user) => user?.decentralization?.access?.roleName.toLowerCase() === roleName.toLowerCase()
    );

  const handleCheckboxChange = (index) => {
    const updatedCheckedState = checkedState.map((item, i) =>
      i === index ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  const handleRoleNameChange = (e) => {
    const newRoleName = e.target.value;
    setRoleName(newRoleName);
    setRoleNameError(newRoleName && checkRoleNameExists(newRoleName) ? "Role name already exists" : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (roleNameError || !roleName) return;

    const selectedFunctions = listFunction
      .filter((_, index) => checkedState[index])
      .map((func) => ({ functionName: func.functionName }));

    const decentralizationData = {
      access: { roleName },
      functionIds: selectedFunctions,
    };

    try {
      const result = await dispatch(decentralizationThunk.createDecentralization(decentralizationData));
      showAlert("Add decentralization successfully.", "success");
      setRoleName("");
      setCheckedState(new Array(listFunction.length).fill(false));
      setActiveComponent({ name: "AdminAccess" });
    } catch (error) {
      showAlert("Failed to add decentralization.", "error");
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box
        sx={{
          width: "100%",
          boxShadow: 3,
          borderRadius: 2,
          padding: 3,
          backgroundColor: "white",
          margin: "0 auto",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Add New Access
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormHelperText sx={{ fontSize: "18px", fontWeight: "bold" }}>
            Role Name
          </FormHelperText>
          <TextField
            placeholder="Example: Assignment"
            value={roleName}
            onChange={handleRoleNameChange}
            error={Boolean(roleNameError)}
            helperText={roleNameError}
            fullWidth
            sx={{ marginTop: 2, marginBottom: 2 }}
          />

          <FormHelperText sx={{ fontSize: "18px", fontWeight: "bold" }}>
            Allowance Access
          </FormHelperText>

          <Grid container spacing={2}>
            {listFunction.map((func, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={func.id}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedState[index]}
                      onChange={() => handleCheckboxChange(index)}
                      sx={{
                        "& .MuiSvgIcon-root": { fontSize: 28 },
                        "&.Mui-checked": { color: "green" },
                        "&.Mui-checked + .MuiFormControlLabel-label": { color: "green" },
                      }}
                    />
                  }
                  label={func.functionName}
                />
              </Grid>
            ))}
          </Grid>

          <Button type="submit" variant="contained" size="large" sx={{ marginTop: 3 }}>
            Submit change
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default AdminAddAccess;
