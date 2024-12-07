import * as yup from "yup";

export const addCategoryValidationSchema = yup.object().shape({
  categoryName: yup
    .string()
    .required("Category name is required")
    .min(3, "Category name must be at least 3 characters long")
    .max(50, "Category name must not exceed 50 characters"),
  description: yup
    .string()
    .required("Description is required")
    .max(200, "Description must not exceed 200 characters"),
  imageFile: yup
    .mixed()
    .required("Category image is required")
    .test("fileType", "Only image files are allowed", (value) =>
      value ? ["image/jpeg", "image/png", "image/gif"].includes(value.type) : false
    ),
  selectedPromotions: yup
    .number()
    .nullable()
    .typeError("Invalid promotion value"),
  selectedProduct: yup
    .array()
    .of(yup.number().nullable())
    .nullable(),
});
