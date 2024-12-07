import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
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
import { useState } from "react";
import { useSelector } from "react-redux";
import "./assets/css/style.scss";

function AdminImport({ setActiveComponent, showAlert }) {
  const importList = useSelector((state) => state.import.listImport);

  // State cho tìm kiếm
  const [searchManufacturer, setSearchManufacturer] = useState("");

  // Lọc danh sách nhập khẩu dựa trên tìm kiếm
  const filteredImports = importList.filter((importModel) =>
    importModel.manufacturer.name
      .toLowerCase()
      .includes(searchManufacturer.toLowerCase())
  );

  return (
    <Box sx={{ padding: 2 }}>
      <Box
        sx={{
          width: "100%",
          height: "80vh",
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
            Recent Import
          </Typography>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <TextField
              placeholder="Search by Manufacturer"
              variant="outlined"
              size="small"
              value={searchManufacturer}
              onChange={(e) => setSearchManufacturer(e.target.value)}
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
              onClick={() => setActiveComponent({ name: "AdminAddImport" })}
            >
              + Add New Import
            </Button>
          </Box>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: "start", fontSize: "1.5rem" }}>
                  Id
                </TableCell>
                <TableCell style={{ textAlign: "start", fontSize: "1.5rem" }}>
                  Manufacturer
                </TableCell>
                <TableCell style={{ textAlign: "end", fontSize: "1.5rem" }}>
                  Date Import
                </TableCell>
                <TableCell style={{ textAlign: "end", fontSize: "1.5rem" }}>
                  Total
                </TableCell>
                <TableCell style={{ textAlign: "end", fontSize: "1.5rem" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredImports.map((importModel) => (
                <TableRow key={importModel.id}>
                  <TableCell
                    style={{ textAlign: "start", fontSize: "1.3rem" }}
                  >
                    {importModel.id}
                  </TableCell>
                  <TableCell
                    style={{ textAlign: "start", fontSize: "1.3rem" }}
                  >
                    {importModel.manufacturer.name}
                  </TableCell>
                  <TableCell style={{ textAlign: "end", fontSize: "1.3rem" }}>
                    {importModel.dateImport.split("T")[0]}
                  </TableCell>
                  <TableCell style={{ textAlign: "end", fontSize: "1.3rem" }}>
                    ${importModel.total}
                  </TableCell>
                  <TableCell style={{ textAlign: "end", fontSize: "1.3rem" }}>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        setActiveComponent({
                          name: "AdminViewImport",
                          props: { id: importModel.id },
                        })
                      }
                    >
                      View
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        setActiveComponent({
                          name: "AdminEditImport",
                          props: { id: importModel.id },
                        })
                      }
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredImports.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    style={{ textAlign: "center", paddingTop: 100 }}
                  >
                    No import found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default AdminImport;
