import  yup from "yup"

export const loginSchema = yup.object().shape({
  email: yup.string().required("email  is required"),
  password: yup.string().min(6).max(32).required(),
});
