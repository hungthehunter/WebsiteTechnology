import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { accessThunk } from "../../../../services/redux/thunks/thunk";
import "./assets/css/style.scss";

function AdminAccess({ setActiveComponent, showAlert }) {
  const listFunction = useSelector((state) => state.function.listFunction);
  const listAccess = useSelector((state) => state.access.listAccess);
  const listDecentralization = useSelector(
    (state) => state.decentralization.listDecentralization
  );
  const listUser = useSelector((state) => state.user.listUser);
  const dispatch = useDispatch();
  const [showAccessTable, setShowAccessTable] = useState(true);

  // Hàm kiểm tra tồn tại Role
  const checkRoleNameExists = (roleName) => {
    return listUser.some(
      (user) =>
        user.decentralization.access.roleName.toLowerCase() ===
        roleName.toLowerCase()
    );
  };

  // Tải lại danh sách access sau khi xóa
  const loadAccessList = async () => {
    try {
      await dispatch(accessThunk.getAllAccess());
    } catch (error) {
      console.log("Failed to load access list:", error);
      showAlert("Failed to load access list", "error");
    }
  };

  // Xóa access theo id và tải lại dữ liệu
  const deleteAccess = async (roleName, id) => {
    if (checkRoleNameExists(roleName)) {
      alert(
        "Please delete or update the user Role before continuing this action"
      );
      setActiveComponent({ name: "AdminStaff" });
    } else {
      try {
        await dispatch(accessThunk.deleteAccess(id));
        await loadAccessList();
        showAlert("Delete access successfully", "success");
      } catch (error) {
        showAlert("Failed to delete access", "error");
      }
    }
  };

  const toggleTable = () => {
    setShowAccessTable((prev) => !prev);
  };

  // Tự động tải danh sách access khi component render
  useEffect(() => {
    loadAccessList();
  }, [dispatch]);

  return (
    <Box sx={{ padding: 2 }}>
      <Box
        sx={{
          width: "100%",
          height: "80vh",
          maxWidth: "100%",
          maxHeight: "80vh",
          overflowY: "auto",
          boxShadow: 3,
          borderRadius: 2,
          padding: 3,
          backgroundColor: "white",
          margin: "0 auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontSize: "2.5rem" }}>
            Recent Access
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setActiveComponent({ name: "AdminAddAccess" })}
            >
              + Add New Access
            </Button>
            <Button variant="outlined" onClick={toggleTable}>
              {showAccessTable ? "Show Roles" : "Show Access"}
            </Button>
          </Box>
        </Box>

        {showAccessTable ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ textAlign: "start", fontSize: "1.5rem" }}>
                    Id
                  </TableCell>
                  <TableCell style={{ textAlign: "start", fontSize: "1.5rem" }}>
                    Name
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listFunction.map((functionItem, index) => (
                  <TableRow key={index}>
                    <TableCell
                      style={{ textAlign: "start", fontSize: "1.3rem" }}
                    >
                      {functionItem.id}
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "start", fontSize: "1.3rem" }}
                    >
                      {functionItem.functionName}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ textAlign: "start", fontSize: "1.5rem" }}>
                    Id
                  </TableCell>
                  <TableCell style={{ textAlign: "start", fontSize: "1.5rem" }}>
                    Role Name
                  </TableCell>
                  <TableCell style={{ textAlign: "end", fontSize: "1.5rem" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listAccess.map((access, index) => (
                  <TableRow key={index}>
                    <TableCell
                      style={{ textAlign: "start", fontSize: "1.3rem" }}
                    >
                      {access.id}
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "start", fontSize: "1.3rem" }}
                    >
                      {access.roleName}
                    </TableCell>

                    <TableCell style={{ textAlign: "end", fontSize: "1.3rem" }}>
                      <Button
                        variant="outlined"
                        onClick={() =>
                          setActiveComponent({
                            name: "AdminEditAccess",
                            props: { id: access.id },
                          })
                        }
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => deleteAccess(access.roleName, access.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
}

export default AdminAccess;
