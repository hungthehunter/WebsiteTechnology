import * as Yup from 'yup';

export const productValidationSchema = Yup.object({
  productName: Yup.string().required('Product Name is required'),
  unitPrice: Yup.number().required('Unit Price is required').positive('Unit Price must be positive'),
  unitInStock: Yup.number().required('Unit In Stock is required').min(0, 'Unit In Stock cannot be negative'),
  unitInOrder: Yup.number().required('Unit In Order is required').min(0, 'Unit In Order cannot be negative'),
  category: Yup.object().shape({
    id: Yup.string().nullable().required('Category is required'),
  }),
  manufacturer: Yup.object().shape({
    id: Yup.string().required('Manufacturer is required'),
  }),
  promotion: Yup.object().shape({
    id: Yup.string().nullable(),
  }),
  specification: Yup.array().of(
    Yup.object({
      specificationName: Yup.string().required('Specification Name is required'),
      specificationData: Yup.string().required('Specification Data is required'),
    })
  ),
});
