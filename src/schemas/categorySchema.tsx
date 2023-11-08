import * as yup from "yup";
export const categorySchemaCreated = yup.object().shape({
  name: yup.string().required("category name is required"),
  userId: yup.string().required("userId is required"),
  title: yup.string().required("title is required"),
  image: yup.string().required("image is required"),
});
