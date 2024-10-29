import {
  Box,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts";
import React, { useState } from "react";
import { useSelector } from "react-redux";

// Define color arrays
const productSalesColor = ["orange", "black", "purple"];
const orderStatusColor = ["blue", "red", "green", "yellow"];
const productColors = [
  "orange",
  "blue",
  "green",
  "purple",
  "red",
  "yellow",
  "cyan",
  "pink",
  "lightgreen",
  "lightblue",
  "brown",
  "gray",
  "lightyellow",
  "indigo",
  "lime",
];

const AdminChart = () => {
  const [selectedChart, setSelectedChart] = useState("Product Sales");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [revenueSales, setRevenueSales] = useState([]);
  const [performanceKPI, setPerFormanceKPI] = useState([]);
  const listOrder = useSelector((state) => state.order.listOrder);
  const listProduct = useSelector((state) => state.product.listProduct);

  // Product sales pie chart data processing (1 function: dataProductSales)
  const mergedProducts = listOrder.reduce((acc, order) => {
    order.orderItem.forEach((item) => {
      const productName = item.product.productName;
      if (!acc[productName]) {
        acc[productName] = {
          id: item.id,
          label: productName,
          value: item.quanitty,
          totalValue: item.price,
        };
      } else {
        acc[productName].quantity += item.quanitty;
        acc[productName].totalValue += item.price;
      }
    });
    return acc;
  }, {});
  const dataProductSales = Object.values(mergedProducts);

  // Order status bar chart data processing (2 function: monthlyOrderStatus , dataForBarChart)
  const monthlyOrderStatus = listOrder.reduce((acc, item) => {
    const month = new Date(item.order_date).getMonth() + 1;
    console.log("month:", month);
    const status = item.order_status;
    if (!acc[month]) {
      acc[month] = {
        month,
        statuses: { Pending: 0, Return: 0, Shipped: 0, inProgress: 0 },
      };
    }
    acc[month].statuses[status] += 1;
    return acc;
  }, {});

  const dataForBarChart = Object.values(monthlyOrderStatus).map((item) => ({
    month: `Tháng ${item.month}`,
    Pending: item.statuses.Pending,
    Return: item.statuses.Return,
    Shipped: item.statuses.Shipped,
    inProgress: item.statuses.inProgress,
  }));

  const orderStatusData = Object.values(monthlyOrderStatus).map((item) => ({
    month: `Tháng ${item.month}`,
    Pending: item.statuses.Pending,
    Return: item.statuses.Return,
    Shipped: item.statuses.Shipped,
    inProgress: item.statuses.inProgress,
  }));

  // Inventory levels bar chart data processing (1 function: dataInventoryLevels)
  const dataInventoryLevels = listProduct.map((inventory, index) => ({
    productName: inventory.productName,
    unitInStock: inventory.unitInStock,
    color: productColors[index % productColors.length],
  }));

  // Processing KPI Data for Performance Chart (1 function dataForPerformanceKPI)
  const dataForPerformanceKPI = [
    {
      label: "Revenue",
      value: listOrder.reduce((acc, order) => acc + order.total_price, 0),
    },
    {
      label: "Profit",
      value: listOrder.reduce((acc, order) => acc + (order.total_price - order.total_price * 0.2), 0),
    }, 
    {
      label: "Remaining Inventory",
      value: listProduct.reduce((acc, product) => acc + product.unitInStock, 0),
    },
    { label: "Total Orders", value: listOrder.length },
  ];

  // User Buy the Most (1 function: dataUserBuyTheMost)
  const dataUserBuyTheMost = Object.values(
    listOrder.reduce((acc, order) => {
      const userName = order.user.fullname;

      // Sum up the total number of carts purchased by this user
      const totalCarts = order.orderItem.reduce((sum, history) => {
        return sum + history.quanitty;
      }, 0);

      if (!acc[userName]) {
        acc[userName] = {
          id: order.user.id,
          value: totalCarts, // Total number of carts
          label: userName,
        };
      } else {
        acc[userName].value += totalCarts; // Add the total carts to the existing count
      }
      return acc;
    }, {})
  );

  /*================================ Database Function ==================================== */

  // GET : Handle chart selection and month selection
  const handleChartSelection = (event) => setSelectedChart(event.target.value);
  const handleMonthSelection = (event) => setSelectedMonth(event.target.value);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Chart
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        marginBottom={2}
      >
        <TextField
          select
          label="Select Chart"
          value={selectedChart}
          onChange={handleChartSelection}
          sx={{ width: "100%", minWidth: 200 }}
        >
          <MenuItem value="Product Sales">Product Sales</MenuItem>
          <MenuItem value="Order Status by Month">
            Order Status by Month
          </MenuItem>
          <MenuItem value="User Buy the Most">User Buy the Most</MenuItem>
          <MenuItem value="Inventory Levels">Inventory Levels</MenuItem>
          <MenuItem value="Performance KPI">Performance KPI</MenuItem>
        </TextField>

        {selectedChart === "Order Status by Month" && (
          <TextField
            label="Select Month"
            type="month"
            value={selectedMonth}
            onChange={handleMonthSelection}
            sx={{ width: "100%", minWidth: 300 }}
          />
        )}
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        flexWrap="wrap"
        justifyContent="center"
      >
        {selectedChart === "Product Sales" && (
          <Box flexGrow={2} minWidth={300} marginBottom={2}>
            <Typography sx={{ marginTop: 2 }}>Product Sales</Typography>
            <PieChart
              colors={productSalesColor}
              series={[{ data: dataProductSales }]}
              height={200}
              sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                  fill: "white",
                  fontWeight: "bold",
                },
              }}
            />
            {/* Table for Product Sales */}
            <Box sx={{ overflowY: "auto", maxHeight: "50vh", width: "50%" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Total Quantity</TableCell>
                    <TableCell>Total Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataProductSales.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.label}</TableCell>
                      <TableCell>{item.value}</TableCell>
                      <TableCell>{item.totalValue}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Box>
        )}

        {selectedChart === "Order Status by Month" && (
          <Box flexGrow={2} minWidth={300} marginBottom={2}>
            <Typography sx={{ marginTop: 2 }}>Order Status by Month</Typography>
            <PieChart
              colors={orderStatusColor}
              series={[{ data: orderStatusData }]}
              height={200}
              sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                  fill: "white",
                  fontWeight: "bold",
                },
              }}
            />
            {/* Table for Order Status by Month */}
            <Box sx={{ width: "50%", overflowX: "auto", marginTop: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Month</TableCell>
                    <TableCell>Pending</TableCell>
                    <TableCell>Return</TableCell>
                    <TableCell>Shipped</TableCell>
                    <TableCell>In Progress</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataForBarChart.map((item) => (
                    <TableRow key={item.month}>
                      <TableCell>{item.month}</TableCell>
                      <TableCell>{item.Pending}</TableCell>
                      <TableCell>{item.Return}</TableCell>
                      <TableCell>{item.Shipped}</TableCell>
                      <TableCell>{item.inProgress}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Box>
        )}

        {selectedChart === "Inventory Levels" && (
          <Box flexGrow={2} minWidth={300} marginBottom={2}>
            <Typography sx={{ marginTop: 2 }}>
              Inventory Levels by Product
            </Typography>
            <PieChart
              colors={dataInventoryLevels.map((item) => item.color)}
              series={[
                {
                  data: dataInventoryLevels.map((item) => ({
                    label: item.productName,
                    value: item.unitInStock,
                  })),
                },
              ]}
              height={200}
              sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                  fill: "white",
                  fontWeight: "bold",
                },
              }}
            />
            <Stack
              direction="row"
              justifyContent="center"
              spacing={2}
              sx={{ marginTop: 2 }}
            >
              {dataInventoryLevels.map((item, index) => (
                <Stack
                  direction="row"
                  alignItems="center"
                  key={index}
                  spacing={1}
                >
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      backgroundColor: item.color,
                      borderRadius: "50%",
                    }}
                  />
                  <Typography>{item.productName}</Typography>
                </Stack>
              ))}
            </Stack>

            {/* Table for Inventory Levels */}
            <Box sx={{ width: "50%", overflowX: "auto", marginTop: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Unit in Stock</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataInventoryLevels.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.productName}</TableCell>
                      <TableCell>{item.unitInStock}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Box>
        )}

        {/* Table for Performance KPI */}
        {selectedChart === "Performance KPI" && (
          <Box flexGrow={2} minWidth={300} marginBottom={2}>
            <Typography sx={{ marginTop: 2 }}>Performance KPI</Typography>
            <PieChart
              series={[
                {
                  label: "Performance KPI",
                  data: dataForPerformanceKPI.map((kpi) => ({
                    id: kpi.label,
                    label: kpi.label,
                    value: kpi.value,
                  })),
                },
              ]}
              colors={["#4CAF50", "#FFC107", "#2196F3", "#FF5722"]}
              height={200}
              sx={{
                [`& .MuiPieArcLabel-root`]: {
                  fill: "white",
                  fontWeight: "bold",
                },
              }}
            />
            <Stack
              direction="row"
              justifyContent="center"
              spacing={2}
              sx={{ marginTop: 2 }}
            >
              {dataForPerformanceKPI.map((kpi, index) => (
                <Stack
                  direction="row"
                  alignItems="center"
                  key={index}
                  spacing={1}
                >
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      backgroundColor: [
                        "#4CAF50",
                        "#FFC107",
                        "#2196F3",
                        "#FF5722",
                      ][index % 4],
                      borderRadius: "50%",
                    }}
                  />
                  <Typography>{kpi.label}</Typography>
                </Stack>
              ))}
            </Stack>
            {/* Table for Performance KPI */}
            <Box sx={{ width: "50%", overflowX: "auto", marginTop: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>KPI</TableCell>
                    <TableCell>Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataForPerformanceKPI.map((kpi, index) => (
                    <TableRow key={index}>
                      <TableCell>{kpi.label}</TableCell>
                      <TableCell>{kpi.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Box>
        )}

        {selectedChart === "User Buy the Most" && (
          <Box flexGrow={2} minWidth={300} marginBottom={2}>
            <Typography sx={{ marginTop: 2 }}>User Buy the Most</Typography>
            <PieChart
              colors={productColors}
              series={[{ data: dataUserBuyTheMost }]}
              height={200}
              sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                  fill: "white",
                  fontWeight: "bold",
                },
              }}
            />
            <Stack
              direction="row"
              justifyContent="center"
              spacing={2}
              sx={{ marginTop: 2 }}
            >
              {dataUserBuyTheMost.map((user, index) => (
                <Stack
                  direction="row"
                  alignItems="center"
                  key={user.id}
                  spacing={1}
                >
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      backgroundColor:
                        productColors[index % productColors.length],
                      borderRadius: "50%",
                    }}
                  />
                  <Typography>{user.label}</Typography>
                </Stack>
              ))}
            </Stack>
            {/* Table for User Buy the Most */}
            <Box sx={{ width: "50%", overflowX: "auto", marginTop: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell>Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataUserBuyTheMost.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.label}</TableCell>
                      <TableCell>{user.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default AdminChart;
