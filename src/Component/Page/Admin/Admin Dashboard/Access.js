import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { accessThunk, decentralizationThunk } from "../../../../services/redux/thunks/thunk";
import "./assets/css/style.scss";

function AdminAccess({ setActiveComponent, showAlert }) {
  const isLoading = useSelector((state) => state.access.isLoading);
  const listFunction = useSelector((state) => state.function.listFunction);
  const listAccess = useSelector((state) => state.access.listAccess);
  const listDecentralization = useSelector((state) => state.decentralization.listDecentralization)
  const dispatch = useDispatch();
  const [showAccessTable, setShowAccessTable] = useState(true);

  const [searchAccess, setSearchAccess] = useState(""); // Tìm kiếm Access
  const [searchFunction, setSearchFunction] = useState(""); // Tìm kiếm Function

  // Lọc danh sách Access hoặc Function dựa trên tìm kiếm
  const filteredAccess = listDecentralization.filter((decentralization) =>
    decentralization?.access?.roleName?.toLowerCase().includes(searchAccess.toLowerCase())
  );

  const filteredFunctions = listFunction.filter((functionItem) =>
    functionItem.functionName.toLowerCase().includes(searchFunction.toLowerCase())
  );

  useEffect(() => {
    const loadAccessList = async () => {
      try {
        await dispatch(accessThunk.getAllAccess());
      } catch (error) {
        console.log("Failed to load access list:", error);
        showAlert("Failed to load access list", "error");
      }
    };
    loadAccessList();
  }, [dispatch]);

  const toggleTable = () => {
    setShowAccessTable((prev) => !prev);
  };

  const handleDelete = (id) => {
    try {
      dispatch(decentralizationThunk.deleteDecentralization(id));
      showAlert("Delete access successfully", "success");
    } catch (error) {
      showAlert("Failed to delete access", "error");
      console.error("Error deleting access:", error);
    }
  }

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
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <TextField
              placeholder={`Search ${showAccessTable ? "Access" : "Function"} by Name`}
              variant="outlined"
              value={showAccessTable ? searchAccess : searchFunction}
              onChange={(e) =>
                showAccessTable
                  ? setSearchAccess(e.target.value)
                  : setSearchFunction(e.target.value)
              }
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: "300px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "30px",
                  paddingRight: "10px",
                },
                "& .MuiOutlinedInput-input": {
                  padding: "12px 10px 12px 0",
                  fontSize: "1rem",
                },
                "& .MuiInputBase-input::placeholder": {
                  fontSize: "1rem",
                },
              }}
            />
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
                    Role Name
                  </TableCell>
                  <TableCell style={{ textAlign: "end", fontSize: "1.5rem" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAccess.map((decentralization, index) => (
                  <TableRow key={index}>
                    <TableCell
                      style={{ textAlign: "start", fontSize: "1.3rem" }}
                    >
                      {decentralization.id}
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "start", fontSize: "1.3rem" }}
                    >
                      {decentralization.access.roleName}
                    </TableCell>
                    <TableCell style={{ textAlign: "end", fontSize: "1.3rem" }}>
                      <Button
                        variant="outlined"
                        onClick={() =>
                          setActiveComponent({
                            name: "AdminEditAccess",
                            props: { id: decentralization.id },
                          })
                        }
                        disabled={isLoading}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(decentralization.id)}
                        disabled={isLoading}
                      >
                        Delete
                      </Button>
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
                    Name
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredFunctions.map((functionItem, index) => (
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
        )}
      </Box>
    </Box>
  );
}

export default AdminAccess;
