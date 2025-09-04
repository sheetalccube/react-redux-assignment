import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "@/Services/AuthSlice";
import useLoginStyle from "./LoginStyle";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const style = useLoginStyle();

  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters")
      .matches(
        /^[a-zA-Z0-9]+$/,
        "Username should only contain letters and numbers"
      ),
    password: Yup.string()
      .required("Password is required")
      .min(4, "Password must be at least 4 characters"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (values.username === "admin" && values.password === "1234") {
        const token = "dummy-token-1234567890";
        localStorage.setItem("token", token);
        dispatch(
          login({ user: { name: values.username, isAdmin: true }, token })
        );
        navigate("/");
      } else if (values.username === "sheetal" && values.password === "1234") {
        const token = "dummy-token-1234567890";
        localStorage.setItem("token", token);
        dispatch(login({ user: { name: values.username }, token }));
        navigate("/");
      } else {
        setError("Invalid username or password.");
      }
    },
  });

  return (
    <Box sx={style.container}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom align="center">
            Login
          </Typography>

          {error && (
            <Alert severity="error" sx={style.errorAlert}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              variant="outlined"
              required
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              sx={style.inputField}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              required
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              sx={style.inputField}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              sx={style.submitButton}
              disabled={!formik.isValid || !formik.dirty}
            >
              Login
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
