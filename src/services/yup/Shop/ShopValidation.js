import * as Yup from "yup";

// Define Yup validation schema
export const productValidation = Yup.object().shape({
    id: Yup.number().required(),
    productName: Yup.string().required(),
    unitInStock: Yup.number().moreThan(0, 'Out of stock').required(),
    unitPrice: Yup.number().required(),
    product_image: Yup.array().of(
      Yup.object().shape({
        mainImage: Yup.boolean(),
        url: Yup.string().url().required(),
      })
    ),
    specification: Yup.array().of(
      Yup.object().shape({
        specificationName: Yup.string().required(),
        specificationData: Yup.string().required(),
      })
    ),
    manufacturer: Yup.object().shape({
      name: Yup.string().required(),
    }),
  });