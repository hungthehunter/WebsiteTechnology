import { Box, Button, Typography } from "@mui/material";
import React from "react";

const NotAllowedPage = ({setActiveComponent}) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center", // Căn giữa theo chiều ngang
        alignItems: "center", // Căn giữa theo chiều dọc
        padding: 2,
      }}
    >
      {/* Phần nội dung chính */}
      <Box
        sx={{
          width: "100%", // Chiếm toàn bộ chiều rộng màn hình
          maxWidth: "1200px", // Giới hạn độ rộng tối đa
          textAlign: "center",
          padding: 4,
        }}
      >
        {/* Hình ảnh */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 3,
          }}
        >
          <img
            src="https://i.imgur.com/oCkEbrA.png"
            alt="Not allowed illustration"
            style={{
              width: "100%",
              maxWidth: "400px", // Đặt giới hạn tối đa cho hình ảnh
              height: "auto",
            }}
          />
        </Box>

        {/* Tiêu đề */}
        <Typography variant="h4" color="error" gutterBottom>
          Access Denied
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Sorry, you do not have permission to view this page.
        </Typography>

        {/* Nút quay về */}
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            setActiveComponent({
              name: "AdminDashboard",
            })
          }
          sx={{ marginTop: 2 }}
        >
          Go to Dashboard
        </Button>
      </Box>
    </Box>
  );
};

export default NotAllowedPage;
