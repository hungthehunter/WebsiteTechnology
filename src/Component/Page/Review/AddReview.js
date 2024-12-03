import {
    Box,
    Button,
    Rating,
    TextField,
    Typography
} from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { reviewThunk } from "../../../services/redux/thunks/thunk";
  
  const AddReview = ({ selectedProduct, currentUser }) => {
    const [isSubmit, setIsSubmit] = useState(false);
    let dispatch = useDispatch();
  
    const [formData, setFormData] = useState({
      rating: 0,
      comment: "",
      product: {
        id: selectedProduct.id,
      },
      user: {
        id: currentUser.id,
      },
      reviewDate: "",
    });
  
    const onPropertyChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const submitReview = (e) => {
      e.preventDefault();
  
      formData.reviewDate = new Date().toISOString().split("T")[0];
      const data = new FormData();
  
      data.append(
        "Review",
        new Blob([JSON.stringify(formData)], { type: "application/json" })
      );
  
      console.log(formData);
  
      try {
        dispatch(reviewThunk.createReview(data));
        setIsSubmit(true);
        toast.success("Submit review successfully");
        setTimeout(() => window.location.reload(), 1000);
      } catch (err) {
        toast.error("Failed to submit your review");
      }
    };
  
    return (
      <Box
        component={"form"}
        onSubmit={submitReview}
        encType="multipart/form-data"
        noValidate
        sx={{ width: "100%" }}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          sx={{ width: "100%", minHeight: "50px", gap: "10px" }}
        >
          <Typography fontSize={"15px"}>Tap to rate:</Typography>
          <Rating
            precision={1}
            name="rating"
            value={formData.rating}
            size="large"
            onChange={(e, newVal) => {
              onPropertyChange(e);
            }}
          ></Rating>
        </Box>
        <Typography fontSize={"15px"}>Write your review</Typography>
        <TextField
          multiline
          name="comment"
          value={formData.comment}
          onChange={onPropertyChange}
          sx={{
            height: "100px !important",
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "white", height: "100px" },
            },
          }}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          sx={{
            marginTop: "10px",
            textTransform: "none",
            fontSize: "1.2rem",
            padding: "10px 20px",
          }}
          type="submit"
          disabled={isSubmit}
        >
          Submit
        </Button>
      </Box>
    );
  };
  
  export default AddReview;
  