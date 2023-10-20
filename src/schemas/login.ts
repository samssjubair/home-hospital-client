import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .min(6)
    .max(32)
    .required("Password is required")
    .test(
      "password",
      "Password must contain at least one uppercase letter, one special character, and one number",
      (value) => {
        const uppercaseRegex = /[A-Z]/;
        const specialCharRegex = /[!@#$%^&*]/; // Add more special characters as needed
        const numberRegex = /[0-9]/;

        return (
          uppercaseRegex.test(value) &&
          specialCharRegex.test(value) &&
          numberRegex.test(value)
        );
      }
    ),
});
