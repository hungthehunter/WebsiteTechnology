import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { formatOrderStatus } from "./AdminOrderUtils";

function AdminOrderTable({ orders, setActiveComponent, setSelectedId, setOpenDialog }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Total Price</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order?.id}</TableCell>
              <TableCell>{order?.user?.fullname}</TableCell>
              <TableCell>${order?.total_price?.toFixed(2)}</TableCell>
              <TableCell>{order?.order_date}</TableCell>
              <TableCell>{order?.address?.city}</TableCell>
              <TableCell>
                <span className={`status ${order.order_status.toLowerCase()}`}>
                  {formatOrderStatus(order.order_status)}
                </span>
              </TableCell>
              <TableCell>
                <Button onClick={() => setActiveComponent({ name: "AdminViewOrder", props: { id: order.id } })}>
                  View
                </Button>
                <Button onClick={() => setActiveComponent({ name: "AdminEditOrder", props: { id: order.id } })}>
                  Edit
                </Button>
                <Button color="error" onClick={() => {
                  setSelectedId(order.id);
                  setOpenDialog(true);
                }}>
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

export default AdminOrderTable;
