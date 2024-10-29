import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from "react";
import { deleteManufactuereId, getAllManufacturer, getAllProduct } from "../../../Serivce/ApiService";
import "./assets/css/style.scss";
function AdminManufacturer({ setActiveComponent, showAlert }) {
  /*------- Page function -------*/
  const [activeIndex, setActiveIndex] = useState(null);
  const [menuActive, setMenuActive] = useState(false);

  const handleMouseOver = (index) => {
    setActiveIndex(index);
  };

  const toggleMenu = () => {
    setMenuActive((prev) => !prev); // Correctly toggle the state
  };

  // Customer: Load List of Users when component mounts

  useEffect(() => {
    loadManufacturers();
    loadProducts();
  }, []);

  // Customer: Handle search bar

  const handleInputSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    const filteredUsers = manufacturer.filter((manufacturer) =>
      manufacturer.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filteredUsers);
  };

  //Category: Check manufacturer exist
  const checkManufacturerNameExists = (name) => {
    return products.some(
      (product) =>
        product.manufacturer.name.toLowerCase() === name.toLowerCase()
    );
  };
  /*------- Database function -------*/
  // Set element User

  const [manufacturer, setManufacturer] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);

  // GET: Get User by id from Database

  const loadManufacturers = async () => {
    try {
      const result = await getAllManufacturer()
      setManufacturer(result.data);
      setFilteredUsers(result.data); // Initialize filteredUsers with all manufacturer
    } catch (error) {
      console.error("Failed to load manufacturer:", error);
    }
  };

  // GET: Get list of product from Database
  const loadProducts = async () => {
    try {
      const result = await getAllProduct()
      setProducts(result.data);
    } catch (error) {
      console.error("Failed to load users:", error);
    }
  };

  // DELETE: Delete User by id from Database
  const handleDelete = async (id, name) => {
    if (window.confirm("Are you sure you want to delete this manufacturer?")) {
      if (checkManufacturerNameExists(name)) {
        alert(
          "This manufacturer is associated with existing products. Cannot delete."
        );

        showAlert(
          "This manufacturer is associated with existing products. Cannot delete.",
          "warn"
        );
        setTimeout(() => setActiveComponent({ name: "AdminProduct" }), 1000);
      } else {
        try {
          await deleteManufactuereId(id)
          showAlert("Delete manufacturer successfully", "success");
          setTimeout(() => loadManufacturers(), 1000);
        } catch (error) {
          showAlert("Failed to delete manufacturer successfully", "success");
          console.error("Error deleting image:", error);
        }
      }
    }
  };
  return (
    <Box sx={{ padding: 2 }}>
      <Box 
        sx={{ 
          width: '100%', 
          height: '80vh',
          overflowY: 'auto',
          boxShadow: 3, 
          borderRadius: 2, 
          padding: 3, 
          backgroundColor: 'white', 
          margin: '0 auto', 
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
          <Typography variant="h4" gutterBottom sx={{ fontSize: '2.5rem' }}>
            Recent Manufacturer
          </Typography>
          <Button variant="contained" color="primary" onClick={() => setActiveComponent({ name: "AdminAddManufacturer" })}>
            + Add New Manufacturer
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: "start", fontSize: '1.5rem' }}>Id</TableCell>
                <TableCell style={{ textAlign: "start", fontSize: '1.5rem' }}>Image</TableCell>
                <TableCell style={{ textAlign: "start", fontSize: '1.5rem' }}>Name</TableCell>
                <TableCell style={{ textAlign: "start", fontSize: '1.5rem' }}>Email</TableCell>
                <TableCell style={{ textAlign: "start", fontSize: '1.5rem' }}>Website</TableCell>
                <TableCell style={{ textAlign: "end", fontSize: '1.5rem' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((manufacturer, index) => (
                <TableRow key={index}>
                  <TableCell style={{ textAlign: "start" , fontSize: '1.3rem'}}>{manufacturer.id}</TableCell>
                  <TableCell style={{ textAlign: "start" , fontSize: '1.3rem'}}>
                    <img src={manufacturer.imageCloud.url} alt={manufacturer.name} width="50" style={{ objectFit: "cover" }} />
                  </TableCell>
                  <TableCell style={{ textAlign: "start" , fontSize: '1.3rem'}}>{manufacturer.name}</TableCell>
                  <TableCell style={{ textAlign: "start" , fontSize: '1.3rem'}}>{manufacturer.email}</TableCell>
                  <TableCell style={{ textAlign: "start" , fontSize: '1.3rem'}}>
                    <a href={manufacturer.website} target="_blank" rel="noopener noreferrer">{manufacturer.website}</a>
                  </TableCell>
                  <TableCell style={{ textAlign: "end" , fontSize: '1.3rem'}}>
                    <Button variant="outlined" onClick={() => setActiveComponent({ name: "AdminViewManufacturer", props: { id: manufacturer.id } })}>View</Button>
                    <Button variant="outlined" onClick={() => setActiveComponent({ name: "AdminEditManufacturer", props: { id: manufacturer.id } })}>Edit</Button>
                    <Button variant="outlined" color="error" onClick={() => handleDelete(manufacturer.id, manufacturer.name)}>Delete Manufacturer</Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredUsers.length === 0 && (
                <TableRow className="nouser">
                  <TableCell colSpan={6} className="inform" style={{ textAlign: "center", paddingTop: 100 }}>
                    No manufacturer found
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

export default AdminManufacturer;
