import * as Yup from "yup";

// Custom validations
const phoneNumberRegex = /^\d{10}$/; // Regex for 10-digit phone number
const minAge = 18; // Minimum age

export const signUpValidationSchema = Yup.object().shape({
  fullname: Yup.string()
    .max(30, "Full Name must be 30 characters or less")
    .required("Full Name is required"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  password: Yup.string()
    .min(5, "Password must be at least 5 characters")
    .max(30, "Password must be 30 characters or less")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),

  mobile: Yup.string()
    .matches(phoneNumberRegex, "Phone number must be 10 digits")
    .required("Phone number is required"),

  dateofbirth: Yup.date()
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
});
