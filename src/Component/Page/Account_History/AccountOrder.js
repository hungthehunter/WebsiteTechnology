import { TabPanel } from "@mui/lab";
import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useEffect, useState } from "react";
import { getEmployeeById, getUserLogged, updateOrderById } from "../../Serivce/ApiService";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Container
} from '@mui/material';
import { styled } from '@mui/material/styles';

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

const AccountOrder = () => {
  const [value, setValue] = useState("1");
  const [user, setUser] = useState();
  const [userId, setUserId] = useState("");
  const [historyProducts, setHistoryProducts] = useState([]);

  useEffect(() => {
    const fetchUserId = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return console.error("User not logged in.");
      try {
        const response = await getUserLogged(token);
        setUserId(response.data.id);
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user information:", error);
      }
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) loadUserHistoryProduct();
  }, [userId]);

  const loadUserHistoryProduct = async () => {
    try {
      const result = await getEmployeeById(userId);
      setHistoryProducts(result.data.purchase_history);
    } catch (error) {
      console.error("Failed to load user history:", error);
    }
  };

  const handleUpdate = async (id) => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?");
    if (!isConfirmed) return;

    try {
      const response = await updateOrderById(id, { order_status: "Return" });
      if (response.status === 200) {
        alert("Hủy đơn hàng thành công!");
        loadUserHistoryProduct();
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật đơn hàng:", error);
      alert("Không thể hủy đơn hàng. Vui lòng thử lại sau.");
    }
  };

  const renderProductTable = (title, statusFilter) => {
    const filteredHistoryProducts = historyProducts.filter(
      (historyProduct) =>
        !statusFilter || historyProduct.orders.order_status.toLowerCase() === statusFilter
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
                <TableCell align="right">Receipt Date</TableCell>
                <TableCell align="right">Note</TableCell>
                <TableCell align="right">Consignee Email</TableCell>
                <TableCell align="right">Consignee Mobile</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredHistoryProducts.length > 0 ? (
                filteredHistoryProducts.map((historyProduct, index) => (
                  <TableRow key={index}>
                    <TableCell align="left">{historyProduct.id}</TableCell>
                    <TableCell align="left">{user.fullname}</TableCell>
                    <TableCell align="right">{historyProduct.orders.delivery_date}</TableCell>
                    <TableCell align="right">{historyProduct.orders.receipt_date}</TableCell>
                    <TableCell align="right">{historyProduct.orders.note}</TableCell>
                    <TableCell align="right">{user.email}</TableCell>
                    <TableCell align="right">{user.mobile}</TableCell>
                    <TableCell align="right">
                      <StatusButton
                        variant="contained"
                        size="small"
                        status={historyProduct.orders.order_status.toLowerCase()}
                      >
                        {historyProduct.orders.order_status}
                      </StatusButton>
                    </TableCell>
                    <TableCell align="right">
                      {historyProduct.orders.order_status.toLowerCase() === "return" ? (
                        <Button variant="contained" color="warning" disabled size="small">
                          Canceling
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => handleUpdate(historyProduct.orders.id)}
                        >
                          Delete
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
    <Container maxWidth="xl">
      <StyledPaper>
        <Box sx={{ width: "100%" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                variant="fullWidth"
                value={value}
                onChange={(event, newValue) => setValue(newValue)}
                aria-label="Order Status Tabs"
              >
                <Tab label="ALL" value="1" sx={{ fontSize: '16px', fontWeight: 'bold' }} /> {/* Tăng font */}
                <Tab label="In Progress" value="2" sx={{ fontSize: '16px', fontWeight: 'bold' }} />
                <Tab label="Return" value="3" sx={{ fontSize: '16px', fontWeight: 'bold' }} />
                <Tab label="Shipped" value="4" sx={{ fontSize: '16px', fontWeight: 'bold' }} />
              </Tabs>
            </Box>
            <TabPanel value="1">{renderProductTable("All Orders")}</TabPanel>
            <TabPanel value="2">{renderProductTable("In Progress Orders", "inprogress")}</TabPanel>
            <TabPanel value="3">{renderProductTable("Return Orders", "return")}</TabPanel>
            <TabPanel value="4">{renderProductTable("Shipped Orders", "shipped")}</TabPanel>
          </TabContext>
        </Box>
      </StyledPaper>
    </Container>
  );
};

export default AccountOrder;
