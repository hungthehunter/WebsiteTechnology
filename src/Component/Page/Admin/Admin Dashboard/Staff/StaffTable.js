// StaffTable.js
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";

function StaffTable({ users, onView, onEdit, onDelete }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Mobile</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
               <TableRow>
               <TableCell>{user.id}</TableCell>
               <TableCell>{user.fullname}</TableCell>
               <TableCell>{user.mobile}</TableCell>
               <TableCell>{user.email}</TableCell>
               <TableCell>
                 <span className={`status ${user.role.toLowerCase()}`}>{user.role}</span>
               </TableCell>
               <TableCell>
                 <Button variant="outlined" onClick={() => onView(user.id)}>
                   View
                 </Button>
                 <Button variant="outlined" onClick={() => onEdit(user.id)}>
                   Edit
                 </Button>
                 <Button variant="outlined" color="error" onClick={() => onDelete(user.id)}>
                   Delete
                 </Button>
               </TableCell>
             </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default StaffTable;
