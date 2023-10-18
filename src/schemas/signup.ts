import * as Yup from "yup";

export const signupSchema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().min(6).max(32).required(),
  contactNo: Yup.string(),
  address: Yup.string(),
});

