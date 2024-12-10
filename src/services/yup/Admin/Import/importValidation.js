import * as yup from "yup";

const importItemSchema = yup.object().shape({
  product: yup.object().shape({
    id: yup.string().required("Product is required"),
  }),
  quantity: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .min(1, "Quantity must be at least 1")
    .required("Quantity is required"),
  price: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .min(1, "Price must be larger than 0")
    .required("Price is required"),
});

export const importValidationSchema = yup.object().shape({
  dateImport: yup
    .date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .required("Import date is required"),
  manufacturer: yup.object().shape({
    id: yup.string().required("Manufacturer is required"),
  }),
  importItems: yup
    .array()
    .of(importItemSchema)
    .min(1, "At least one product is required to import"),
});
