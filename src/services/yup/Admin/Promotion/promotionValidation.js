
import * as Yup from "yup";
// Validation Schema với Yup
export const promotionValidationSchema = Yup.object({
    promotionName: Yup.string().required("Promotion name is required."),
    description: Yup.string(),
    discountPercentage: Yup.number()
      .required("Discount percentage is required.")
      .min(1, "Discount percentage must be between 1 and 100.")
      .max(100, "Discount percentage must be between 1 and 100."),
    startDate: Yup.date().required("Start date is required."),
    endDate: Yup.date()
      .required("End date is required.")
      .min(Yup.ref("startDate"), "End date must be after start date."),
    applicableProducts: Yup.array().min(1, "You must select at least one product."),
    applicableCategories: Yup.array().min(1, "You must select at least one category."),
  });