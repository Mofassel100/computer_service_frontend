import * as yup from "yup";
export const serviceSchemaCreated = yup.object().shape({
  name: yup.string().required("Full  name is required"),
  categoryId: yup.string().required("categoryId is requerd"),
  userId: yup.string().required("userId is required"),
  title: yup.string().required("title is required"),
  description: yup.string().required("description is required"),
  image: yup.string().required("image is required"),
  rating: yup.string().required("rating is required"),
  review: yup.string().required("review is required"),
  price: yup.string().required("price is required"),
  oldPrice: yup.string().required("oldPrice is required"),
  location: yup.string().required("location is required"),
  phoneNumber: yup.string().required("phoneNumber is required"),
});
