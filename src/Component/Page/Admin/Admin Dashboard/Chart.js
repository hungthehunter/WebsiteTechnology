import {
  Box,
  Button,
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
const orderStatusColor = ["#ffb300", "#f44336", "#4caf50", "#2196f3"]; // Example colors for Pending, Return, Shipped, In Progress
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

const AdminChart = ({setActiveComponent}) => {
  const [selectedChart, setSelectedChart] = useState("Product Sales");
  const [selectedMonth, setSelectedMonth] = useState("");
  const listOrder = useSelector((state) => state.order.listOrder);
  const listProduct = useSelector((state) => state.product.listProduct);
  const listSummary = useSelector((state) => state.summary.listSummary);

  // Product sales pie chart data processing (1 function: dataProductSales)
  const mergedProducts = listOrder.reduce((acc, order) => {
    order.orderItem.forEach((item) => {
      const productName = item.product.productName;
      if (!acc[productName]) {
        acc[productName] = {
          id: item.id,
          label: productName,
          value: item.quantity,
          totalValue: item.totalPrice,
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
    const orderDate = new Date(item.order_date);
    const month = orderDate.getMonth() + 1; // Get month (1-based)
    const year = orderDate.getFullYear(); // Get year
    const status = item.order_status;
    const key = `${year}-${month}`; // Combine year and month to create a unique key

    if (!acc[key]) {
      acc[key] = {
        year,
        month,
        statuses: { Pending: 0, Return: 0, Shipped: 0, inProgress: 0 },
      };
    }
    acc[key].statuses[status] += 1;
    return acc;
  }, {});

  const dataForBarChart = Object.values(monthlyOrderStatus).map((item) => ({
    month: `Tháng ${item.month} - ${item.year}`, // Display both month and year
    Pending: item.statuses.Pending,
    Return: item.statuses.Return,
    Shipped: item.statuses.Shipped,
    inProgress: item.statuses.inProgress,
  }));

  const pieChartData = Object.values(monthlyOrderStatus).map((item) => ({
    label: `Tháng ${item.month} - ${item.year}`, // Label with both month and year
    Pending: item.statuses.Pending,
    Return: item.statuses.Return,
    Shipped: item.statuses.Shipped,
    inProgress: item.statuses.inProgress,
  }));

  const filteredDataForBarChart = selectedMonth
    ? dataForBarChart.filter((item) => {
        const [selectedYear, selectedMonthNumber] = selectedMonth.split("-");
        return (
          item.month.includes(selectedYear) &&
          item.month.includes(selectedMonthNumber)
        );
      })
    : dataForBarChart;

  const filteredPieChartData = selectedMonth
    ? pieChartData.filter((item) => {
        const [selectedYear, selectedMonthNumber] = selectedMonth.split("-");
        return (
          item.label.includes(selectedYear) &&
          item.label.includes(selectedMonthNumber)
        );
      })
    : pieChartData;

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
      value: listSummary.totalRevenue,
    },
    {
      label: "Profit",
      value: listSummary.totalProfit,
    },
    {
      label: "Remaining Inventory",
      value: listSummary.totalInventory,
    },
    { label: "Total Orders", value: listSummary.totalOrderedProducts },
  ];

  // User Buy the Most (1 function: dataUserBuyTheMost)
  const dataUserBuyTheMost = Object.values(
    listOrder.reduce((acc, order) => {
      const userName = order.user.fullname;

      // Sum up the total number of carts purchased by this user
      const totalCarts = order.orderItem.reduce((sum, history) => {
        return sum + history.quantity;
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

            {/* Pie Chart for Order Status */}
            <PieChart
              series={[
                {
                  data: [
                    {
                      label: "Pending",
                      value: listSummary.pendingOrders
                    },
                    {
                      label: "Canceled",
                      value: listSummary.canceledOrders,
                    },
                    {
                      label: "Completed",
                      value: listSummary.completedOrders,
                    },
                    {
                      label: "In Progress",
                      value: listSummary.inProgressOrders,
                    },
                  ],
                },
              ]}
              height={200}
              colors={["#ffb300", "#f44336", "#4caf50", "#2196f3"]} // Màu sắc cho các phần
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
                  {filteredDataForBarChart.map((item) => (
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

        {/* Inventory Levels */}
        {selectedChart === "Inventory Levels" && (
  <Box flexGrow={2} minWidth={300} marginBottom={2}>
    <Typography sx={{ marginTop: 2 }}>
      Inventory Levels by Product
    </Typography>

    {/* Horizontal Bar Chart for Inventory Levels */}
    {/* <Box sx={{ height: 300, marginTop: 2 }}>
      <BarChart
        dataset={dataInventoryLevels}
        yAxis={[{
          scaleType: 'band',
          dataKey: 'productName',  // Dữ liệu trục Y là tên sản phẩm
          axisLabel: {
            style: {
              display: 'none',  // Ẩn nhãn trục Y
            },
          },
        }]}
        xAxis={[{
          label: 'Units in Stock',
        }]}
        series={[
          {
            dataKey: 'unitInStock',  // Dữ liệu giá trị trục X là số lượng sản phẩm
            label: 'Units in Stock',
          },
        ]}
        layout="horizontal"  // Dùng layout ngang cho cột
        grid={{ vertical: true }}  // Hiển thị lưới theo chiều dọc
        height={300}
        margin={{ top: 20, right: 30, left: 40, bottom: 50 }}
      />
    </Box> */}

    {/* Table for Inventory Levels */}
    <Box sx={{ width: "50%", overflowX: "auto", marginTop: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product Name</TableCell>
            <TableCell>Unit in Stock</TableCell>
            <TableCell>Warning</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataInventoryLevels.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.productName}</TableCell>
              <TableCell>{item.unitInStock}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  onClick={() =>
                    setActiveComponent({
                      name: "AdminImport",
                    })
                  }
                  sx={{
                    backgroundColor: item.unitInStock < 10 ? "red" : "gray",
                    color: "white",
                    "&:hover": {
                      backgroundColor: item.unitInStock < 10 ? "darkred" : "darkgray",
                    },
                  }}
                >
                  Warning
                </Button>
              </TableCell>
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
