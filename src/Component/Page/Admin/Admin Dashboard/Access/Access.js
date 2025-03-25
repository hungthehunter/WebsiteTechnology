import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  accessThunk,
  decentralizationThunk,
} from "../../../../../services/redux/thunks/thunk";
import AccessTable from "./AccessTable";
import DeleteDialog from "./DeleteDialog";
import FunctionTable from "./FunctionTable";
import SearchBar from "./SearchBar";

function AdminAccess({ setActiveComponent, showAlert }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.access.isLoading);
  const listFunction = useSelector((state) => state.function.listFunction);
  const listDecentralization = useSelector(
    (state) => state.decentralization.listDecentralization
  );

  const [searchAccess, setSearchAccess] = useState("");
  const [searchFunction, setSearchFunction] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showAccessTable, setShowAccessTable] = useState(true);

  useEffect(() => {
    dispatch(accessThunk.getAllAccess());
  }, [dispatch]);

  const handleDelete = () => {
    dispatch(decentralizationThunk.deleteDecentralization(selectedId));
    showAlert("Deleted successfully", "success");
    setOpenDialog(false);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
        <Typography variant="h4">Recent Access</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <SearchBar
          searchValue={showAccessTable ? searchAccess : searchFunction}
          onSearchChange={showAccessTable ? setSearchAccess : setSearchFunction}
          placeholder={`Search ${
            showAccessTable ? "Access" : "Function"
          } by Name`}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => setActiveComponent({ name: "AdminAddAccess" })}
        >
          + Add New Access
        </Button>
        <Button 
        variant="contained"
        color="inherit"
        onClick={() => setShowAccessTable(!showAccessTable)}>
          Toggle Table
        </Button>
        </Box>
      </Box>

      {showAccessTable ? (
        <AccessTable
          data={listDecentralization}
          onEdit={(id) =>
            setActiveComponent({ name: "AdminEditAccess", props: { id } })
          }
          onDelete={(id) => {
            setSelectedId(id);
            setOpenDialog(true);
          }}
          isLoading={isLoading}
        />
      ) : (
        <FunctionTable data={listFunction} />
      )}

      <DeleteDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleDelete}
      />
    </Box>
  );
}

export default AdminAccess;
