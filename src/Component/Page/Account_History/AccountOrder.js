import { TabPanel } from "@mui/lab";
import TabContext from "@mui/lab/TabContext";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import Box from "@mui/material/Box";
import { styled } from '@mui/material/styles';
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { orderThunk } from "../../../services/redux/thunks/thunk";

// Styled components
const StyledPaper = styled(Paper)({
  padding: '24px',
  marginBottom: '24px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
});

const StyledTitle = styled(Typography)({
  fontWeight: 700,
  fontSize: '24px',
  marginBottom: '16px',
  color: '#3f51b5',
});

const StyledTableContainer = styled(TableContainer)({
  marginTop: '16px',
  borderRadius: '8px',
  overflow: 'hidden',
  '& .MuiTableCell-head': {
    backgroundColor: '#f5f5f5',
    color: '#2c3e50',
    fontWeight: 700,
    fontSize: '18px',
  },
  '& .MuiTableCell-root': {
    fontSize: '16px',
    padding: '16px',
  },
});

const StatusButton = styled(Button)(({ theme, status }) => ({
  backgroundColor: status === 'return' ? theme.palette.error.main : theme.palette.primary.main,
  color: 'white',
  fontWeight: 600,
  fontSize: '14px',
  '&:hover': {
    backgroundColor: status === 'return' ? theme.palette.error.dark : theme.palette.primary.dark,
  },
}));

const AccountOrder = ({ setActiveComponent }) => {
  const [value, setValue] = useState("1");
  const dispatch = useDispatch();

  const userCurrentLogged = useSelector((state) => state.user.userCurrentLogged);
  const listOrder = useSelector((state) => state.order.listOrder);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleUpdate = async (id, currentStatus) => {
    if (!id || isNaN(id)) {
      console.error("Invalid ID:", id);
      alert("Invalid order ID. Please try again.");
      return;
    }
  
    const updatedOrder = {
      order_status: currentStatus === "Pending" ? "InProgress" :
                    currentStatus === "InProgress" ? "Canceled" : "Pending",
    };
  
    const formData = new FormData();
    formData.append("order", new Blob([JSON.stringify(updatedOrder)], { type: "application/json" }));
  
    try {
      await dispatch(orderThunk.updateOrder({ id: id, orderData: formData }));
      await dispatch(orderThunk.getAllOrders());
      toast.success(`${updatedOrder.order_status} product successfully`);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error(`Failed to update product status`);
    }
  };
  
  const renderProductTable = (title, statusFilter) => {
    const filteredOrders = listOrder?.filter(
      (order) =>
        order?.user?.id === userCurrentLogged?.id &&
        (!statusFilter || order?.order_status?.toLowerCase() === statusFilter)
    );
  
    return (
      <StyledPaper elevation={3}>
        <StyledTitle variant="h6">{title}</StyledTitle>
        <StyledTableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Id</TableCell>
                <TableCell align="left">Consignee Name</TableCell>
                <TableCell align="right">Delivery Date</TableCell>
                <TableCell align="right">Note</TableCell>
                <TableCell align="right">Consignee Email</TableCell>
                <TableCell align="right">Consignee Mobile</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, index) => (
                  <TableRow key={index}>
                    <TableCell align="left">{order.id}</TableCell>
                    <TableCell align="left">{userCurrentLogged.fullname}</TableCell>
                    <TableCell align="right">{order.delivery_date}</TableCell>
                    <TableCell align="right">{order.note}</TableCell>
                    <TableCell align="right">{userCurrentLogged.email}</TableCell>
                    <TableCell align="right">{userCurrentLogged.mobile}</TableCell>
                    <TableCell align="right">
                      <StatusButton
                        variant="contained"
                        size="small"
                        status={order.order_status.toLowerCase()}
                      >
                        {order.order_status}
                      </StatusButton>
                    </TableCell>
                    <TableCell align="right">
                      {order.order_status.toLowerCase() === "completed" ? (
                        <Button variant="contained" color="warning" disabled size="small">
                          Canceled
                        </Button>
                      ) : order.order_status.toLowerCase() === "pending" ? (
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => handleUpdate(order.id, "Pending")}
                        >
                          Confirm
                        </Button>
                      ) : order.order_status.toLowerCase() === "canceled" ? (
                        <Button
                          variant="contained"
                          color="secondary"
                          size="small"
                          onClick={() => handleUpdate(order.id, "Canceled")}
                        >
                          Restore
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => handleUpdate(order.id, "InProgress")}
                        >
                          Cancel
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    <Typography variant="body1" fontSize="16px" fontStyle="italic" color="textSecondary">
                      No product was found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </StyledPaper>
    );
  };
  

  return (
    <div>
      <div className="details_table details">
        <div className="table recentOrders">
          <Box sx={{ width: "100%" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  variant="fullWidth"
                  value={value}
                  onChange={handleChange}
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                >
                  <Tab label="ALL" className="tab-title" value="1" />
                  <Tab label="In Progress" className="tab-title" value="2" />
                  <Tab label="Canceled" className="tab-title" value="3" />
                  <Tab label="Completed" className="tab-title" value="4" />
                </Tabs>
              </Box>
              <TabPanel value="1">{renderProductTable("All Orders")}</TabPanel>
              <TabPanel value="2">
                {renderProductTable("In Progress Orders", "inprogress")}
              </TabPanel>
              <TabPanel value="3">
                {renderProductTable("Canceled Orders", "canceled")}
              </TabPanel>
              <TabPanel value="4">
                {renderProductTable("Completed Orders", "completed")}
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </div>
    </div>
  );
};


export default AccountOrder;
