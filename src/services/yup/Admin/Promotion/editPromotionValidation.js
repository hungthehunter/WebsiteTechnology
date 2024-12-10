import * as Yup from "yup";

export const editValidationschema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    discountPercentage: Yup.number()
      .min(0, "Discount percentage cannot be negative")
      .max(100, "Discount percentage cannot exceed 100")
      .required("Discount percentage is required"),
    startDate: Yup.date()
      .required("Start date is required")
      .typeError("Start date must be a valid date"),
    endDate: Yup.date()
      .required("End date is required")
      .min(Yup.ref("startDate"), "End date cannot be earlier than start date")
      .typeError("End date must be a valid date"),
  });