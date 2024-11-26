import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDecentralization, getFunctions, getRoles, updateDecentralization } from "./service/AdminService";

function AdminEditAccess({ setActiveComponent, id , showAlert}) {
  const [roleName, setRoleName] = useState("");
  const [functionList, setFunctionList] = useState([]);
  const [checkedState, setCheckedState] = useState([]);
  const [roleNameError, setRoleNameError] = useState("");
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate(); // Chỉnh sửa từ useNavigate

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load functions và roles song song
        await loadFunctions();
        await loadRoles();

        // Chờ loadFunctions xong mới load decentralization
        if (functionList.length > 0 && id) {
          await loadExistingDecentralization(id);
        }
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    };

    loadData(); // Gọi hàm load data
  }, [id, functionList.length]); // Thêm functionList.length vào dependency array

  const loadFunctions = async () => {
    try {
      const response = await getFunctions();
      setFunctionList(response.data);
      setCheckedState(new Array(response.data.length).fill(false));
    } catch (error) {
      console.log(error);
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

  const loadExistingDecentralization = async (id) => {
    try {
      const response = await getDecentralization(id);
      console.log('Decentralization data:', response.data); // Log dữ liệu để kiểm tra
      const { access, functionIds } = response.data;

      setRoleName(access.roleName);

      // Cập nhật trạng thái checkbox dựa trên so sánh id
      const checkedStateUpdated = functionList.map((func) =>
        functionIds.some((f) => f.id === func.id)
      );

      setCheckedState(checkedStateUpdated);
    } catch (error) {
      console.error("Failed to load decentralization:", error);
    }
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

    if (newRoleName) {
      checkRoleNameExists(newRoleName);
    } else {
      setRoleNameError("");
    }
  };

  const checkRoleNameExists = (name) => {
    const roleExists = roles.some(
      (role) =>
        role.roleName.toLowerCase() === name.toLowerCase() &&
        role.roleName.toLowerCase() !== id.roleName.toLowerCase()
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

    const selectedFunctions = functionList
      .filter((_, index) => checkedState[index])
      .map((func) => ({ functionName: func.functionName }));

    const decentralizationData = {
      access: { roleName },
      functionIds: selectedFunctions,
    };

    try {
      const response = await updateDecentralization(id, decentralizationData);
      showAlert("decentralization updated successfully.", "success");
      setTimeout(() => setActiveComponent({
        name: "AdminAccess"
      }), 1000);

    } catch (error) {
      showAlert("Failed to update the decentralization. Please try again.", "error");
    }
  };

  return (
    <div>
      <div className="details_table details">
        <div className="table recentOrders">
          <div className="cardHeader">
            <h2>Chỉnh sửa Quyền</h2>
          </div>

          <form className="form-account" onSubmit={handleSubmit}>
            <FormHelperText sx={{ fontSize: "18px", fontWeight: "bold", color: "black" }}>
              Role Name
            </FormHelperText>
            <div className="form__line-wrap">
              <TextField
                placeholder="Example: Assignment"
                value={roleName}
                onChange={handleRoleNameChange}
                error={Boolean(roleNameError)}
                helperText={roleNameError}
                fullWidth
              />
            </div>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
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
                          sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                        />
                      }
                      label={func.functionName}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>

            <div className="form__input-wrapper">
              <Button
                type="submit"
                variant="contained"
                size="large"
                className="button"
              >
                Cập nhật
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminEditAccess;
