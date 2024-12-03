import * as Yup from "yup";

export const accountAddAddressValidation = Yup.object().shape({
  houseNumber: Yup.string()
    .min(1, "House Number must be at least 1 character")
    .max(50, "House Number must be less than 50 characters")
    .required("House Number is required"),
  street: Yup.string()
    .min(1, "Street must be at least 1 character")
    .max(50, "Street must be less than 50 characters")
    .required("Street is required"),
  ward: Yup.string()
    .min(1, "Ward must be at least 1 character")
    .max(50, "Ward must be less than 50 characters")
    .required("Ward is required"),
  district: Yup.string()
    .min(1, "District must be at least 1 character")
    .max(50, "District must be less than 50 characters")
    .required("District is required"),
  city: Yup.string()
    .min(1, "City must be at least 1 character")
    .max(50, "City must be less than 50 characters")
    .required("City is required"),
  country: Yup.string()
    .min(1, "Country must be at least 1 character")
    .max(50, "Country must be less than 50 characters")
    .required("Country is required"),
});

export const accountEditAddressValidation = Yup.object().shape({
    houseNumber: Yup.string()
      .min(1, "House Number must be at least 1 character")
      .max(50, "House Number must be less than 50 characters")
      .required("House Number is required"),
    street: Yup.string()
      .min(1, "Street must be at least 1 character")
      .max(50, "Street must be less than 50 characters")
      .required("Street is required"),
    ward: Yup.string()
      .min(1, "Ward must be at least 1 character")
      .max(50, "Ward must be less than 50 characters")
      .required("Ward is required"),
    district: Yup.string()
      .min(1, "District must be at least 1 character")
      .max(50, "District must be less than 50 characters")
      .required("District is required"),
    city: Yup.string()
      .min(1, "City must be at least 1 character")
      .max(50, "City must be less than 50 characters")
      .required("City is required"),
    country: Yup.string()
      .min(1, "Country must be at least 1 character")
      .max(50, "Country must be less than 50 characters")
      .required("Country is required"),
  });