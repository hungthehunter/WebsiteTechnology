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

function AdminExport({ setActiveComponent, showAlert }) {
  const exportList = useSelector((state) => state.export.listExport);

  // State cho tìm kiếm
  const [searchCustomer, setSearchCustomer] = useState("");

  // Lọc danh sách xuất khẩu dựa trên tìm kiếm
  const filteredExports = exportList.filter((exportModel) =>
    exportModel.customer.fullname
      .toLowerCase()
      .includes(searchCustomer.toLowerCase())
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
            Recent Export
          </Typography>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <TextField
              placeholder="Search by Customer"
              variant="outlined"
              size="small"
              value={searchCustomer}
              onChange={(e) => setSearchCustomer(e.target.value)}
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
              onClick={() => setActiveComponent({ name: "AdminAddExport" })}
            >
              + Add New Export
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
                  Customer
                </TableCell>
                <TableCell style={{ textAlign: "end", fontSize: "1.5rem" }}>
                  Date Export
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
              {filteredExports.map((exportModel) => (
                <TableRow key={exportModel.id}>
                  <TableCell
                    style={{ textAlign: "start", fontSize: "1.3rem" }}
                  >
                    {exportModel.id}
                  </TableCell>
                  <TableCell
                    style={{ textAlign: "start", fontSize: "1.3rem" }}
                  >
                    {exportModel.customer.fullname}
                  </TableCell>
                  <TableCell style={{ textAlign: "end", fontSize: "1.3rem" }}>
                    {exportModel.dateExport.split("T")[0]}
                  </TableCell>
                  <TableCell style={{ textAlign: "end", fontSize: "1.3rem" }}>
                    ${exportModel.total}
                  </TableCell>
                  <TableCell style={{ textAlign: "end", fontSize: "1.3rem" }}>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        setActiveComponent({
                          name: "AdminViewExport",
                          props: { id: exportModel.id },
                        })
                      }
                    >
                      View
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        setActiveComponent({
                          name: "AdminEditExport",
                          props: { id: exportModel.id },
                        })
                      }
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredExports.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    style={{ textAlign: "center", paddingTop: 100 }}
                  >
                    No export found
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

export default AdminExport;
