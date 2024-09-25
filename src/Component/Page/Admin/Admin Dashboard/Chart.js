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
import axios from "axios";
import React, { useEffect, useState } from "react";

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
  const [productSales, setProductSales] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);
  const [userBuyTheMost, setUserBuyTheMost] = useState([]);
  const [selectedChart, setSelectedChart] = useState("Product Sales");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [inventoryLevels, setInventoryLevels] = useState([]);
  const [revenueSales, setRevenueSales] = useState([]);
  const [performanceKPI, setPerFormanceKPI] = useState([]);

  // Product sales pie chart data processing (1 function: dataProductSales)
  const dataProductSales = Object.values(
    productSales.reduce((acc, item) => {
      const productName = item.products[0].productName;
      if (!acc[productName]) {
        acc[productName] = {
          id: item.id,
          value: item.totalQuantity,
          label: productName,
        };
      } else {
        acc[productName].value += item.totalQuantity;
      }
      return acc;
    }, {})
  );

  // Order status bar chart data processing (2 function: monthlyOrderStatus , dataForBarChart)
  const monthlyOrderStatus = orderStatus.reduce((acc, item) => {
    const month = new Date(item.order_date).getMonth() + 1;
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

  // Inventory levels bar chart data processing (1 function: dataInventoryLevels)
  const dataInventoryLevels = inventoryLevels.map((inventory, index) => ({
    productName: inventory.productName,
    unitInStock: inventory.unitInStock,
    color: productColors[index % productColors.length],
  }));

  // Processing KPI Data for Performance Chart (1 function dataForPerformanceKPI)
  const dataForPerformanceKPI = [
    {
      label: "Revenue",
      value: performanceKPI.reduce(
        (acc, item) => acc + item.carts[0].totalPrice,
        0
      ),
    },
    {
      label: "Profit",
      value: performanceKPI.reduce(
        (acc, item) => acc + item.carts[0].totalPrice * 0.2,
        0
      ),
    }, // Assuming 20% profit margin
    {
      label: "Remaining Inventory",
      value: inventoryLevels.reduce((acc, item) => acc + item.unitInStock, 0),
    },
    { label: "Total Orders", value: orderStatus.length },
  ];

  // User Buy the Most (1 function: dataUserBuyTheMost)
  const dataUserBuyTheMost = Object.values(
    userBuyTheMost.reduce((acc, user) => {
      const userName = user.fullname; // Assuming `fullname` is the user's name

      // Sum up the total number of carts purchased by this user
      const totalCarts = user.purchase_history.reduce((sum, history) => {
        return sum + history.carts.length; // Assuming each `carts` array item represents a cart
      }, 0);

      if (!acc[userName]) {
        acc[userName] = {
          id: user.id,
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
  // GET : Get Data from database
  const fetchData = async () => {
    try {
      const [
        cartsResponse,
        ordersResponse,
        inventoryResponse,
        revenueResponse,
        PerformanceKPIResponse,
        usersResponse,
      ] = await Promise.all([
        axios.get("http://localhost:8080/api/carts/handle"),
        axios.get("http://localhost:8080/api/orders"),
        axios.get("http://localhost:8080/api/products"),
        axios.get("http://localhost:8080/api/purchaseHistories"),
        axios.get("http://localhost:8080/api/purchaseHistories"),
        axios.get("http://localhost:8080/api/v1/admin/listUsers"),
      ]);

      setProductSales(cartsResponse.data);
      setOrderStatus(ordersResponse.data);
      setInventoryLevels(inventoryResponse.data);
      setRevenueSales(revenueResponse.data);
      setPerFormanceKPI(PerformanceKPIResponse.data);
      setUserBuyTheMost(usersResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // GET : Handle chart selection and month selection
  const handleChartSelection = (event) => setSelectedChart(event.target.value);
  const handleMonthSelection = (event) => setSelectedMonth(event.target.value);

  return (
    <div className="details_table details">
      <div className="table recentOrders">
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
          width="100%"
          textAlign="center"
          spacing={2}
          flexWrap="wrap"
          justifyContent="center"
        >
          {selectedChart === "Product Sales" && (
            <Box flexGrow={2} minWidth={300} marginBottom={2}>
              <Typography sx={{ marginTop: 2 }}>Product Sales</Typography>
              <PieChart
                colors={productSalesColor}
                series={[
                  {
                    data: dataProductSales,
                    highlightScope: { fade: "global", highlight: "item" },
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: "gray",
                    },
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
                {dataProductSales.map((item, index) => (
                  <Stack
                    direction="row"
                    alignItems="center"
                    key={item.id}
                    spacing={1}
                  >
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        backgroundColor:
                          productSalesColor[index % productSalesColor.length],
                        borderRadius: "50%",
                      }}
                    />
                    <Typography>{item.label}</Typography>
                  </Stack>
                ))}
              </Stack>

              {/* Table for Product Sales */}
              <Box
                sx={{
                  overflowY: "auto", // Thêm thanh cuộn dọc nếu nội dung vượt quá chiều cao
                  maxHeight: "50vh",
                  width: "50%", // Đặt chiều cao tối đa của bảng là 50% chiều cao của viewport
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product Name</TableCell>
                      <TableCell>Total Quantity</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataProductSales.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.label}</TableCell>
                        <TableCell
                          sx={{
                            display: "flex",
                            alignContent: "flex-start",
                          }}
                        >
                          {item.value}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Box>
          )}

          {selectedChart === "Order Status by Month" && (
            <Box flexGrow={2} minWidth={300} marginBottom={2}>
              <Typography sx={{ marginTop: 2 }}>
                Order Status by Month
              </Typography>
              <PieChart
                colors={orderStatusColor}
                series={[
                  {
                    data: [
                      {
                        value: orderStatus.reduce(
                          (acc, item) =>
                            acc + (item.order_status === "Pending" ? 1 : 0),
                          0
                        ),
                        label: "Pending",
                      },
                      {
                        value: orderStatus.reduce(
                          (acc, item) =>
                            acc + (item.order_status === "Return" ? 1 : 0),
                          0
                        ),
                        label: "Return",
                      },
                      {
                        value: orderStatus.reduce(
                          (acc, item) =>
                            acc + (item.order_status === "Shipped" ? 1 : 0),
                          0
                        ),
                        label: "Shipped",
                      },
                      {
                        value: orderStatus.reduce(
                          (acc, item) =>
                            acc + (item.order_status === "inProgress" ? 1 : 0),
                          0
                        ),
                        label: "In Progress",
                      },
                    ],
                    highlightScope: { fade: "global", highlight: "item" },
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: "gray",
                    },
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
                {["Pending", "Return", "Shipped", "In Progress"].map(
                  (status, idx) => (
                    <Stack
                      direction="row"
                      alignItems="center"
                      key={status}
                      spacing={1}
                    >
                      <Box
                        width={16}
                        height={16}
                        bgcolor={orderStatusColor[idx]}
                        borderRadius="50%"
                      />
                      <Typography>{status}</Typography>
                    </Stack>
                  )
                )}
              </Stack>

              {/* Table for Order Status by Month */}
              <Box
                sx={{
                  width: "50%", // Adjust table width to 50% of the container
                  overflowX: "auto", // Add horizontal scroll if needed
                  marginTop: 2,
                }}
              >
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

          {selectedChart === "User Buy the Most" && (
            <Box flexGrow={2} minWidth={300} marginBottom={2}>
              <Typography sx={{ marginTop: 2 }}>User Buy the Most</Typography>
              <PieChart
                colors={productColors} // Use the defined colors
                series={[
                  {
                    data: dataUserBuyTheMost.map((user) => ({
                      value: user.value,
                      label: user.label,
                    })),
                    highlightScope: { fade: "global", highlight: "item" },
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: "gray",
                    },
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
              <Box
                sx={{
                  width: "50%", // Adjust table width to 50% of the container
                  overflowX: "auto", // Add horizontal scroll if needed
                  marginTop: 2,
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>User Name</TableCell>
                      <TableCell>Total Carts</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataUserBuyTheMost.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.label}</TableCell>
                        <TableCell
                          sx={{
                            display: "flex",
                            alignContent: "flex-start",
                          }}
                        >
                          {user.value}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Box>
          )}

          {selectedChart === "Performance KPI" && (
            <Box flexGrow={2} minWidth={300} marginBottom={2}>
              <Typography sx={{ marginTop: 2 }}>Performance KPI</Typography>
              <PieChart
                colors={["#FFA07A", "#20B2AA", "#778899", "#BDB76B"]}
                series={[
                  {
                    data: dataForPerformanceKPI.map((kpi) => ({
                      value: kpi.value,
                      label: kpi.label,
                    })),
                    highlightScope: { fade: "global", highlight: "item" },
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: "gray",
                    },
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
                {dataForPerformanceKPI.map((kpi, index) => (
                  <Stack
                    direction="row"
                    alignItems="center"
                    key={kpi.label}
                    spacing={1}
                  >
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        backgroundColor: [
                          "#FFA07A",
                          "#20B2AA",
                          "#778899",
                          "#BDB76B",
                        ][index],
                        borderRadius: "50%",
                      }}
                    />
                    <Typography>{kpi.label}</Typography>
                  </Stack>
                ))}
              </Stack>

              {/* Table for Performance KPI */}
              <Box
                sx={{
                  width: "50%", // Adjust table width to 50% of the container
                  overflowX: "auto", // Add horizontal scroll if needed
                  marginTop: 2,
                }}
              >
                <Box
                  sx={{
                    width: "50%", // Adjust table width to 50% of the container
                    overflowX: "auto", // Add horizontal scroll if needed
                    marginTop: 2,
                  }}
                >
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>KPI</TableCell>
                        <TableCell>Value</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dataForPerformanceKPI.map((kpi) => (
                        <TableRow key={kpi.label}>
                          <TableCell>{kpi.label}</TableCell>
                          <TableCell
                            sx={{
                              display: "flex",
                              alignContent: "flex-start",
                            }}
                          >
                            {kpi.value}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Box>
            </Box>
          )}

          {selectedChart === "Inventory Levels" && (
            <Box flexGrow={2} minWidth={300} marginBottom={2}>
              <Typography sx={{ marginTop: 2 }}>Inventory Levels</Typography>
              <PieChart
                colors={productColors}
                series={[
                  {
                    data: dataInventoryLevels.map((inventory) => ({
                      value: inventory.unitInStock,
                      label: inventory.productName,
                    })),
                    highlightScope: { fade: "global", highlight: "item" },
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: "gray",
                    },
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
                {dataInventoryLevels.map((inventory, index) => (
                  <Stack
                    direction="row"
                    alignItems="center"
                    key={inventory.productName}
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
                    <Typography>{inventory.productName}</Typography>
                  </Stack>
                ))}
              </Stack>

              {/* Table for Inventory Levels */}
              <Box
                sx={{
                  width: "50%", // Adjust table width to 50% of the container
                  overflowX: "auto", // Add horizontal scroll if needed
                  marginTop: 2,
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product Name</TableCell>
                      <TableCell>Units in Stock</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataInventoryLevels.map((inventory) => (
                      <TableRow key={inventory.productName}>
                        <TableCell>{inventory.productName}</TableCell>
                        <TableCell
                          sx={{
                            display: "flex",
                            alignContent: "flex-start",
                          }}
                        >
                          {inventory.unitInStock}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Box>
          )}
        </Stack>
      </div>
    </div>
  );
};

export default AdminChart;
