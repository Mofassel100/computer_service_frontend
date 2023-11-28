import * as yup from "yup";

export const registrationSchema = yup.object().shape({
  body: yup.object().shape({
    name: yup.string().required("Name name is required"),
    password: yup.string().min(6).max(32).required(),
    email: yup.string().email().required("Email is required"),
    phoneNumber: yup.string().email().required("phoneNumber is required"),
    address: yup.string().email().required("address is required"),
    dateOfBirth: yup.string().required("Date of Birth is required"),
  }),
});
