import * as yup from "yup";

export const productValidationSchema = yup.object().shape({
  productName: yup.string().required("Product Name is required"),
  unitPrice: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .required("Unit Price is required")
    .positive("Unit Price must be positive"),
  unitInStock: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .required("Unit In Stock is required")
    .min(0, "Unit In Stock cannot be negative"),
  unitInOrder: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .required("Unit In Order is required")
    .min(0, "Unit In Order cannot be negative"),
  category: yup.object().shape({
    id: yup.string().nullable().required("Category is required"),
  }),
  manufacturer: yup.object().shape({
    id: yup.string().required("Manufacturer is required"),
  }),
  promotion: yup.object().shape({
    id: yup.string().nullable(),
  }),
  specification: yup.array().of(
    yup.object().shape({
      specificationName: yup
        .string()
        .required("Specification Name is required"),
      specificationData: yup
        .string()
        .required("Specification Data is required"),
    })
  ),
});

export const productImageValidationSchema = yup.object().shape({
  mainImage: yup.mixed().required("Main Image is required"),
  additionalImage: yup.array().min(1, "Additional Image is Required")
})