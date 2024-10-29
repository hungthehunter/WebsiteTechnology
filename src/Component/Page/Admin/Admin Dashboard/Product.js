import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from "react";
import { deleteProductById, getAllProduct } from "../../../Serivce/ApiService";
import "./assets/css/style.scss";
function AdminProduct({ setActiveComponent ,showAlert}) {
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
    loadUsers();
  }, []);

  // Customer: Handle search bar

  const handleInputSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    const filteredUsers = products.filter((product) =>
      product.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filteredUsers);
  };

  /*------- Database function -------*/
  // Set element User

  const [products, setProducts] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // GET: Get Product by id from Database

  const loadUsers = async () => {
    try {
      const result = await getAllProduct();
      setProducts(result.data);
      setFilteredUsers(result.data);
    } catch (error) {
      console.error("Failed to load users:", error);
    }
  };

  // DELETE: Delete User by id from Database
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const result = await deleteProductById(id);
        showAlert("Delete product successfully.", "success");
        // Cập nhật danh sách sản phẩm sau khi xóa
      loadUsers();
      } catch (error) {
        console.error("Error deleting product:", error);
        showAlert("Failed to delete product.", "error");
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
            Recent Product
          </Typography>
          <Button variant="contained" color="primary" onClick={() => setActiveComponent({ name: "AdminAddProduct" })}>
            + Add New Product
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: "start",fontSize: '1.5rem' }}>Id</TableCell>
                <TableCell style={{ textAlign: "start",fontSize: '1.5rem' }}>Name</TableCell>
                <TableCell style={{ textAlign: "end",fontSize: '1.5rem' }}>Price</TableCell>
                <TableCell style={{ textAlign: "end",fontSize: '1.5rem' }}>Quantity</TableCell>
                <TableCell style={{ textAlign: "end",fontSize: '1.5rem' }}>Status</TableCell>
                <TableCell style={{ textAlign: "end",fontSize: '1.5rem' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((product) => (
                <TableRow key={product.id}>
                  <TableCell style={{ textAlign: "start",fontSize: '1.3rem' }}>{product.id}</TableCell>
                  <TableCell style={{ textAlign: "start",fontSize: '1.3rem' }}>{product.productName}</TableCell>
                  <TableCell style={{ textAlign: "end",fontSize: '1.3rem' }}>${product.unitPrice}</TableCell>
                  <TableCell style={{ textAlign: "end",fontSize: '1.3rem' }}>{product.unitInStock}</TableCell>
                  <TableCell style={{ textAlign: "end",fontSize: '1.3rem' }}>
                    <span className={`status ${product.unitInStock > 0 ? "inprogress" : "deleting"}`}>
                      {product.unitInStock > 0 ? "In stock" : "Out of stock"}
                    </span>
                  </TableCell>
                  <TableCell style={{ textAlign: "end" ,fontSize: '1.3rem'}}>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        setActiveComponent({
                          name: "AdminViewProduct",
                          props: { id: product.id },
                        })
                      }
                    >
                      View
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        setActiveComponent({
                          name: "AdminEditProduct",
                          props: { id: product.id },
                        })
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredUsers.length === 0 && (
                <TableRow className="nouser">
                  <TableCell colSpan={6} className="inform" style={{ textAlign: "center", paddingTop: 100 }}>
                    No products found
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

export default AdminProduct;