import React from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  TextField,
  Button,
  List,
  ListItem,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./BMICalculator.module.css";
import type { BMIState } from "@/Types/CommonTypes";

const validationSchema = Yup.object().shape({
  weight: Yup.number()
    .typeError("Weight must be a number")
    .positive("Weight must be positive")
    .required("Weight is required"),
  height: Yup.number()
    .typeError("Height must be a number")
    .positive("Height must be positive")
    .required("Height is required"),
});

const initialValues = {
  weight: "",
  height: "",
};

class BMICalculator extends React.Component<object, BMIState> {
  constructor(props: object) {
    super(props);
    this.state = {
      bmi: null,
      category: "",
    };
  }

  calculateBMI = (values: { weight: string; height: string }) => {
    const { weight, height } = values;
    const weightValue = parseFloat(weight);
    const heightValue = parseFloat(height);

    const heightInMeters = heightValue / 100;
    const bmi = weightValue / (heightInMeters * heightInMeters);
    const roundedBMI = Math.round(bmi * 10) / 10;

    let category = "";
    if (bmi < 18.5) {
      category = "Underweight";
    } else if (bmi >= 18.5 && bmi < 25) {
      category = "Normal weight";
    } else if (bmi >= 25 && bmi < 30) {
      category = "Overweight";
    } else {
      category = "Obese";
    }

    this.setState({ bmi: roundedBMI, category });
  };

  render() {
    const { bmi, category } = this.state;

    return (
      <Container maxWidth="md" className={styles.container}>
        <Paper elevation={3} className={styles.paper}>
          <Typography variant="h4" gutterBottom className={styles.title}>
            BMI Calculator
          </Typography>
          <Typography variant="body1">
            Enter your weight and height to calculate your Body Mass Index
          </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              this.calculateBMI(values);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box className={styles.inputGroup}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Weight (kg)"
                    type="number"
                    name="weight"
                    inputProps={{ min: "0", step: "0.1" }}
                    variant="outlined"
                    margin="normal"
                  />
                  <ErrorMessage name="weight">
                    {(msg) => (
                      <Typography color="error" variant="body2">
                        {msg}
                      </Typography>
                    )}
                  </ErrorMessage>
                </Box>

                <Box className={styles.inputGroup}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Height (cm)"
                    type="number"
                    name="height"
                    inputProps={{ min: "0", step: "0.1" }}
                    variant="outlined"
                    margin="normal"
                  />
                  <ErrorMessage name="height">
                    {(msg) => (
                      <Typography color="error" variant="body2">
                        {msg}
                      </Typography>
                    )}
                  </ErrorMessage>
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  className={styles.button}
                  fullWidth
                >
                  Calculate BMI
                </Button>
              </Form>
            )}
          </Formik>

          {bmi !== null && (
            <Box className={styles.result}>
              <Typography className={styles.bmiValue}>{bmi}</Typography>
              <Typography className={styles.category}>
                Category: {category}
              </Typography>
            </Box>
          )}

          <Box className={styles.infoBox}>
            <Typography className={styles.infoTitle}>
              BMI Categories:
            </Typography>
            <List className={styles.infoList}>
              <ListItem>Underweight: BMI &lt; 18.5</ListItem>
              <ListItem>Normal weight: 18.5 ≤ BMI &lt; 25</ListItem>
              <ListItem>Overweight: 25 ≤ BMI &lt; 30</ListItem>
              <ListItem>Obese: BMI ≥ 30</ListItem>
            </List>
          </Box>
        </Paper>
      </Container>
    );
  }
}

export default BMICalculator;
