import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
const CategoryTable = React.memo(({category , onViewCategory , onEditCategory , onDeleteCategory}) => {
    return(
        <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ textAlign: "start", fontSize: "1.5rem" }}>
                Id
              </TableCell>
              <TableCell style={{ textAlign: "start", fontSize: "1.5rem" }}>
                Category Image
              </TableCell>
              <TableCell style={{ textAlign: "start", fontSize: "1.5rem" }}>
                Category Name
              </TableCell>
              <TableCell style={{ textAlign: "end", fontSize: "1.5rem" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category, index) => (
                <TableRow key={index}>
                  <TableCell
                    style={{ textAlign: "start", fontSize: "1.3rem" }}
                  >
                    {category.id}
                  </TableCell>
                  <TableCell
                    style={{ textAlign: "start", fontSize: "1.3rem" }}
                  >
                    <img
                      src={category.imageCloud.url}
                      alt={category.name}
                      width="50"
                      style={{ objectFit: "cover" }}
                    />
                  </TableCell>
                  <TableCell
                    style={{ textAlign: "start", fontSize: "1.3rem" }}
                  >
                    {category.name}
                  </TableCell>
                  <TableCell style={{ textAlign: "end", fontSize: "1.3rem" }}>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        setActiveComponent({
                          name: "AdminEditCategory",
                          props: { id: category.id },
                        })
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleOpenDialog(category.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  style={{
                    textAlign: "center",
                    padding: "50px",
                    fontSize: "1.5rem",
                  }}
                >
                  No categories found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    )
}
) 

export default CategoryTable