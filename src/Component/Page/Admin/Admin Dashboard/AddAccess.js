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
import { createDecentralization, getAllFunction, getRoles } from "../../../Serivce/ApiService";

function AdminAddAccess({ setActiveComponent , showAlert}) {
  const [roleName, setRoleName] = useState("");
  const [functionList, setFunctionList] = useState([]);
  const [checkedState, setCheckedState] = useState([]);
  const [roleNameError, setRoleNameError] = useState("");

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    loadFunctions();
    loadRoles();

  }, []);

  const loadFunctions = async () => {
    try {
      const response = await getAllFunction();
      setFunctionList(response.data);
      setCheckedState(new Array(response.data.length).fill(false));
    } catch (error) {
      alert("Lỗi tải quyền vai trò");
    }
  };

  const loadRoles = async () => {
    try {
      const response = await getRoles();
      setRoles(response.data);
    } catch (error) {
      console.error("Failed to load roles:", error);
    }
  };

  const checkRoleNameExists = (name) => {
    const roleExists = roles.some(
      (role) => role.roleName.toLowerCase() === name.toLowerCase()
    );
    setRoleNameError(
      roleExists ? "Tên vai trò đã tồn tại, vui lòng nhập tên khác." : ""
    );
  };

  const handleCheckboxChange = (index) => {
    const updatedCheckedState = checkedState.map((item, i) =>
      i === index ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  const handleRoleNameChange = (e) => {
    const newRoleName = e.target.value;
    setRoleName(newRoleName);

    // Kiểm tra tên vai trò khi người dùng nhập
    if (newRoleName) {
      checkRoleNameExists(newRoleName);
    } else {
      setRoleNameError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (roleNameError || !roleName) {
      return; 
    }

    const selectedFunctions = functionList
      .filter((_, index) => checkedState[index])
      .map((func) => ({ functionName: func.functionName }));

    const decentralizationData = {
      access: { roleName },
      functionIds: selectedFunctions,
    };


    console.log("Decentralization created:", decentralizationData.functionIds);
    try {
      const response = await createDecentralization(decentralizationData);
      console.log("Decentralization created:", response.data);
      showAlert("Add decentralization successfully.","success")
      // Reset form hoặc chuyển hướng nếu cần
      setRoleName("");
      setCheckedState(new Array(functionList.length).fill(false));
      setActiveComponent({
        name: "AdminAccess"
      })
    } catch (error) {
      showAlert("Failed to add decentralization.","error");
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
    <Box 
      sx={{ 
        width: '100%', 
        boxShadow: 3, 
        borderRadius: 2, 
        padding: 3, 
        backgroundColor: 'white', 
        margin: '0 auto', 
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
          sx={{ marginTop:2 , marginBottom:2  }}
        />

        <FormHelperText sx={{ fontSize: "18px", fontWeight: "bold" }}>
          Allowance Access
        </FormHelperText>

        <Grid container spacing={2}>
          {functionList.map((func, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={func.id}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedState[index]}
                    onChange={() => handleCheckboxChange(index)}
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 28 },
        "&.Mui-checked": {
          color: "green", 
        },
        "&.Mui-checked + .MuiFormControlLabel-label": {
          color: "green", 
        }, }}
                  />
                }
                label={func.functionName}
              />
            </Grid>
          ))}
        </Grid>

        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ marginTop: 3 }}
        >
          Lưu thay đổi
        </Button>
      </form>
    </Box>
  </Box>
);
}

export default AdminAddAccess;