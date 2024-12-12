import * as yup from "yup";

const phoneNumberRegex = /^\d{10}$/; // Regex for 10-digit phone number
const minAge = 18; // Minimum age

// Define the validation schema
export const editUserValidationSchema = yup.object().shape({
  fullname: yup
    .string()
    .trim()
    .required("Full name is required.")
    .min(3, "Full name must be at least 3 characters."),
  mobile: yup
    .string()
    .matches(phoneNumberRegex, "Mobile number must contain only digits.")
    .required("Mobile number is required."),
  email: yup
    .string()
    .email("Invalid email format.")
    .required("Email is required."),
  password: yup
    .string()
    .min(5, "Password must be at least 6 characters.")
    .notRequired(),
  role: yup
    .string()
    .oneOf(["User", "Admin"], "Invalid role selected.")
    .required("Role is required."),
  dateofbirth: yup.date()
  .required("Date of birth is required")
  .max(new Date(), "Date of birth must be in the past")
  .test("age", "You must be at least 18 years old", (value) => {
    if (!value) return false;
    const today = new Date();
    const birthDate = new Date(value);
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1 >= minAge;
    }
    return age >= minAge;
  }),
  decentralization: yup.object().required("Access is required."),
  addresses: yup
    .array()
    .of(
      yup.object().shape({
        houseNumber: yup.string().trim().required("House number is required."),
        street: yup.string().trim().required("Street is required."),
        ward: yup.string().trim().required("Ward is required."),
        district: yup.string().trim().required("District is required."),
        city: yup.string().trim().required("City is required."),
        country: yup.string().trim().required("Country is required."),
      })
    )
    .max(5, "You cannot add more than 5 addresses.")
    .required("Addresses are required."),
});
