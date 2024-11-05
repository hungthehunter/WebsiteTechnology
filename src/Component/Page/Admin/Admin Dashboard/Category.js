import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { categoryThunk } from '../../../../services/redux/thunks/thunk';
import "./assets/css/style.scss";
function AdminCategory({ setActiveComponent, showAlert }) {
  /*------- Page function -------*/
  const [activeIndex, setActiveIndex] = useState(null);
  const [menuActive, setMenuActive] = useState(false);
  const dispatch = useDispatch();
  const listProduct = useSelector((state) => state.product.listProduct);
  const listCategory = useSelector((state) => state.category.listCategory);

  const handleMouseOver = (index) => {
    setActiveIndex(index);
  };

  const toggleMenu = () => {
    setMenuActive((prev) => !prev); // Correctly toggle the state
  };

  const checkCategoryNameExists = (name) => {
    return listProduct.some(
      (product) =>
        product.category.categoryName.toLowerCase() === name.toLowerCase()
    );
  };

  // DELETE: Delete User by id from Database
  const handleDelete = async (id, name) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      if (checkCategoryNameExists(name)) {
        alert(
          "This manufacturer is associated with existing products. Cannot delete."
        );
        setActiveComponent({
          name: "AdminProduct",
        });
      } else {
        try {
          dispatch(categoryThunk.deleteCategory(id));
          dispatch(categoryThunk.getAllCategories());
          showAlert("Delete category successfully", "success");
          
        } catch (error) {
          showAlert("Failed to delete category successfully", "error");
          console.error("Error deleting category:", error);
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
            Recent Category
          </Typography>
          <Button variant="contained" color="primary" onClick={() => setActiveComponent({ name: "AdminAddCategory" })}>
            + Add New Category
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: "start" , fontSize: '1.5rem'}}>Id</TableCell>
                <TableCell style={{ textAlign: "start", fontSize: '1.5rem' }}>Category Image</TableCell>
                <TableCell style={{ textAlign: "start", fontSize: '1.5rem' }}>Category Name</TableCell>
                <TableCell style={{ textAlign: "end", fontSize: '1.5rem' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listCategory.map((category, index) => (
                <TableRow key={index}>
                  <TableCell style={{ textAlign: "start" , fontSize: '1.3rem'}}>{category.id}</TableCell>
                  <TableCell style={{ textAlign: "start", fontSize: '1.3rem' }}>
                    <img src={category.imageCloud.url} alt={category.name} width="50" style={{ objectFit: "cover" }} />
                  </TableCell>
                  <TableCell style={{ textAlign: "start", fontSize: '1.3rem' }}>{category.name}</TableCell>
                  <TableCell style={{ textAlign: "end", fontSize: '1.3rem' }}>
                    <Button variant="outlined" onClick={() => setActiveComponent({ name: "AdminViewCategory", props: { id: category.id } })}>View</Button>
                    <Button variant="outlined" onClick={() => setActiveComponent({ name: "AdminEditCategory", props: { id: category.id } })}>Edit</Button>
                    <Button variant="outlined" color="error" onClick={() => handleDelete(category.id, category.categoryName)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
              {listCategory.length === 0 && (
                <TableRow className="nouser">
                  <TableCell colSpan={4} className="inform" style={{ textAlign: "center", paddingTop: 100 }}>
                    No category found
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

export default AdminCategory;