import * as Yup from "yup";

export const editValidationschema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  status: Yup.boolean().required("Status is required"),
  specification: Yup.array().of(
    Yup.object().shape({
      specificationName: Yup.string().required("Specification Name is required"),
      specificationData: Yup.string().required("Specification Data is required"),
    })
  ),
});
