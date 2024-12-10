import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import "./404.scss"; // Assuming you saved your SCSS file as 404.scss

function ErrorPage() {
  return (
    <Box
      className="main4 main_404"
      sx={{ position: "relative", overflow: "hidden" }}
    >
      <Box className="top-header" />

      {/* Star Effects */}
      <Box>
        <Box className="starsec"></Box>
        <Box className="starthird"></Box>
        <Box className="starfourth"></Box>
        <Box className="starfifth"></Box>
      </Box>

      {/* Lamp */}
      <Box className="lamp__wrap">
        <Box className="lamp">
          <Box className="cable"></Box>
          <Box className="cover"></Box>
          <Box className="in-cover">
            <Box className="bulb"></Box>
          </Box>
          <Box className="light"></Box>
        </Box>
      </Box>

      {/* Error Content */}
      <Box className="error" sx={{ textAlign: "center" }}>
        <Box className="error__content">
          <Box
            className="error__message message"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              height: "10vh", // Chiều cao toàn màn hình để căn giữa theo trục dọc
              width: "100%", // Đảm bảo chiều rộng đủ để căn giữa theo trục ngang
            }}
          >
            <Typography
              variant="h1"
              className="message__title"
              sx={{ color: "#fff", fontSize: "2rem", fontWeight: "bold" }}
            >
              Page Not Found
            </Typography>
            <Typography
              variant="body1"
              className="message__text"
              sx={{ color: "#b0bec5", margin: "1rem 0" }}
            >
              We're sorry, the page you were looking for isn't found here. The
              link you followed may either be broken or no longer exists. Please
              try again, or take a look at our home page.
            </Typography>
          </Box>

          <Box className="error__nav e-nav">
            <Button
              component={Link}
              to="/websiteDoAn/"
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: "#00BCD4",
                color: "#fff",
                "&:hover": { backgroundColor: "#0097a7" },
              }}
            >
              Go to Home
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ErrorPage;
