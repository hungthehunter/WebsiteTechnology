import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, InputAdornment, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import ImportTable from "./ImportTable";

function AdminImport({ setActiveComponent }) {
  const importList = useSelector((state) => state.import.listImport);
  const [searchManufacturer, setSearchManufacturer] = useState("");

  const filteredImports = importList.filter((importModel) =>
    importModel.manufacturer.name.toLowerCase().includes(searchManufacturer.toLowerCase())
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
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
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
        <ImportTable filteredImports={filteredImports} setActiveComponent={setActiveComponent} />
      </Box>
    </Box>
  );
}

export default AdminImport;
