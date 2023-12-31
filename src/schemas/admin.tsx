import * as yup from "yup";

export const adminSchema = yup.object().shape({
  name: yup.string().required("Name name is required"),
  password: yup.string().min(6).max(32).required(),
  email: yup.string().email().required("Email is required"),
  dateOfBirth: yup.string().required("Date of Birth is required"),
  imageURL: yup.string().url().required("imageURL is required"),
  role: yup.string().required("Role is Required"),
  phoneNumber: yup.string().required("phoneNumber is required"),
  address: yup.string().required("address is required"),
});
export const serviceSchema = yup.object().shape({
  body: yup.object().shape({
    name: yup.string().required("Full  name is required"),
    categoryId: yup.string().required("categoryId is requerd"),
    userId: yup.string().required("userId is required"),
    title: yup.string().required("title is required"),
    image: yup.string().required("image is required"),
    rating: yup.string().required("rating is required"),
    review: yup.string().required("review is required"),
  }),
});
