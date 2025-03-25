import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
function ManufacturerTable({ manufacturers, onView, onEdit, onDelete }) {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ textAlign: "start", fontSize: "1.5rem" }}>Id</TableCell>
              <TableCell style={{ textAlign: "start", fontSize: "1.5rem" }}>Image</TableCell>
              <TableCell style={{ textAlign: "start", fontSize: "1.5rem" }}>Name</TableCell>
              <TableCell style={{ textAlign: "start", fontSize: "1.5rem" }}>Email</TableCell>
              <TableCell style={{ textAlign: "start", fontSize: "1.5rem" }}>Website</TableCell>
              <TableCell style={{ textAlign: "end", fontSize: "1.5rem" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {manufacturers.map((manufacturer, index) => (
              <TableRow key={index}>
                <TableCell style={{ textAlign: "start", fontSize: "1.3rem" }}>
                  {manufacturer.id}
                </TableCell>
                <TableCell style={{ textAlign: "start", fontSize: "1.3rem" }}>
                  <img
                    src={manufacturer.imageCloud.url}
                    alt={manufacturer.name}
                    width="50"
                    style={{ objectFit: "cover" }}
                  />
                </TableCell>
                <TableCell style={{ textAlign: "start", fontSize: "1.3rem" }}>
                  {manufacturer.name}
                </TableCell>
                <TableCell style={{ textAlign: "start", fontSize: "1.3rem" }}>
                  {manufacturer.email}
                </TableCell>
                <TableCell style={{ textAlign: "start", fontSize: "1.3rem" }}>
                  <a href={manufacturer.website} target="_blank" rel="noopener noreferrer">
                    {manufacturer.website}
                  </a>
                </TableCell>
                <TableCell style={{ textAlign: "end", fontSize: "1.3rem" }}>
                  <Button variant="outlined" onClick={() => onView(manufacturer.id)}>
                    View
                  </Button>
                  <Button variant="outlined" onClick={() => onEdit(manufacturer.id)}>
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => onDelete(manufacturer.id, manufacturer.name)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {manufacturers.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} style={{ textAlign: "center", padding: "50px" }}>
                  No manufacturer found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  export default ManufacturerTable;