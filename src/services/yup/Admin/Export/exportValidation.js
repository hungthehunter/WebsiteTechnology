import * as yup from "yup";
export const exportValidationSchema = yup.object().shape({
  dateExport: yup
    .date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .required("Export date is required"),
  order: yup.object().shape({
    id: yup.string().required("Order is required")
  })
});
