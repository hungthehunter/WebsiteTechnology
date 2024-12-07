import * as yup from "yup";

export const addManufacturerValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters long"),
  country: yup.string().required("Country is required"),
  website: yup
    .string()
    .url("Must be a valid URL")
    .required("Website is required"),
  description: yup
    .string()
    .max(500, "Description must not exceed 500 characters"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone number is required"),
  address: yup.string().required("Address is required"),
  imageFile: yup
    .mixed()
    .required("Image file is required")
    .test("fileType", "Only image files are allowed", (value) =>
      value
        ? ["image/jpeg", "image/png", "image/gif"].includes(value.type)
        : false
    ),
  selectedProduct: yup.array().of(yup.number().nullable()).nullable(),

  createdAt: yup
    .date()
    .required("Created At is required")
    .test(
      "not-in-past",
      "Created At cannot be in the past",
      (value) => value && value >= new Date()
    ),

  updatedAt: yup
    .date()
    .required("Updated At is required")
    .test(
      "not-in-past",
      "Updated At cannot be in the past",
      (value) => value && value >= new Date()
    )
    .test(
      "after-created-at",
      "Updated At must be after Created At",
      function (value) {
        const { createdAt } = this.parent;
        return createdAt && value && value >= createdAt;
      }
    ),
});
