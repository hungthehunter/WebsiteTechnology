import * as yup from "yup";

export const editAccessValidationSchema = yup.object({
  roleName: yup
    .string()
    .required("Role name is required")
    .min(3, "Role name must be at least 3 characters long")
    .max(50, "Role name cannot exceed 50 characters"),
  selectedFunctions: yup
    .array()
    .min(1, "At least one function must be selected")
    .required("Please select at least one function."),
});
