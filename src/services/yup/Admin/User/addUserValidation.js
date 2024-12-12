// Separate Yup validation schema
import * as Yup from "yup";

export const customerValidationSchema = Yup.object().shape({
  fullname: Yup.string()
    .required("Full Name is required")
    .min(2, "Full Name must be at least 2 characters"),
  mobile: Yup.string()
    .required("Mobile is required")
    .matches(/^\d{10,11}$/, "Mobile must be 10-11 digits"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  salary: Yup.number()
    .min(0, "Salary must be a positive number or zero")
    .required("Salary is required"),
  dateOfBirth: Yup.date()
    .required("Date of Birth is required")
    .max(new Date(), "Date of Birth cannot be in the future"),
  decentralization: Yup.object().required("Access is required"),
  addresses: Yup.array()
    .of(
      Yup.object().shape({
        houseNumber: Yup.string().required("House Number is required"),
        street: Yup.string().required("Street is required"),
        ward: Yup.string().required("Ward is required"),
        district: Yup.string().required("District is required"),
        city: Yup.string().required("City is required"),
        country: Yup.string().required("Country is required"),
      })
    )
    .min(1, "At least one address is required"),
});
