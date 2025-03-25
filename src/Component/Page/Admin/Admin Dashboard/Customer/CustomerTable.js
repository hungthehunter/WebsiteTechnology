import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";

function CustomerTable({ users, onView, onEdit, onDelete }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Mobile</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
                <TableRow>
                <TableCell style={{ textAlign: "start", fontSize: "1.3rem" }}>{user.id}</TableCell>
                <TableCell style={{ textAlign: "start", fontSize: "1.3rem" }}>{user.fullname}</TableCell>
                <TableCell style={{ textAlign: "end", fontSize: "1.3rem" }}>{user.mobile}</TableCell>
                <TableCell style={{ textAlign: "end", fontSize: "1.3rem" }}>{user.email}</TableCell>
                <TableCell style={{ textAlign: "end", fontSize: "1.3rem" }}>
                  {user.addresses.length > 0 ? (
                    <Box>
                      {user.addresses
                        .filter((address) => address.status === true)
                        .map((address, index) => (
                          <Typography key={index} variant="body1" sx={{ mb: 1 }}>
                            {`${address.houseNumber}, ${address.street}, ${address.ward}, ${address.district}, ${address.city}, ${address.country}`}
                          </Typography>
                        ))}
                    </Box>
                  ) : (
                    "No addresses available"
                  )}
                </TableCell>
                <TableCell style={{ textAlign: "end", fontSize: "1.3rem" }}>
                  <span className={`status ${user.role.toLowerCase()}`}>{user.role}</span>
                </TableCell>
                <TableCell style={{ textAlign: "end", fontSize: "1.3rem" }}>
                  <Button variant="outlined" onClick={() => onView(user.id)}>View</Button>
                  <Button variant="outlined" onClick={() => onEdit(user.id)}>Edit</Button>
                  <Button variant="outlined" color="error" onClick={() => onDelete(user.id)}>Delete</Button>
                </TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CustomerTable;
