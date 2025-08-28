import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useStyle from "./TodosStyle";

function Todos() {
  const styles = useStyle();

  interface TodoItem {
    id: number;
    name: string;
    description: string;
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .matches(/^[a-zA-Z ]+$/, "Name should only contain letters and spaces"),
    description: Yup.string()
      .trim()
      .required("Description is required")
      .min(5, "Description must be at least 5 characters"),
  });

  const [todos, setTodos] = useState<TodoItem[]>([
    { id: 1, name: "Buy groceries", description: "Milk, Bread, Eggs, Fruits" },
    { id: 2, name: "Workout", description: "Morning gym session at 7 AM" },
    {
      id: 3,
      name: "Meeting with client",
      description: "Project update call at 11 AM",
    },
    {
      id: 4,
      name: "Read a book",
      description: 'Read 30 pages of "Atomic Habits"',
    },
    {
      id: 5,
      name: "Call plumber",
      description: "Fix the kitchen sink leakage",
    },
  ]);

  const [editingTodo, setEditingTodo] = useState<TodoItem | null>(null);

  const formik = useFormik({
    initialValues: { name: "", description: "" },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      if (editingTodo) {
        setTodos((prev) =>
          prev.map((todo) =>
            todo.id === editingTodo.id
              ? {
                  ...todo,
                  name: values.name.trim(),
                  description: values.description.trim(),
                }
              : todo
          )
        );
        setEditingTodo(null);
      } else {
        const newTodo: TodoItem = {
          id: todos.length + 1,
          name: values.name.trim(),
          description: values.description.trim(),
        };
        setTodos([...todos, newTodo]);
      }
      resetForm();
    },
  });

  function handleDelete(id: number) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function handleEdit(todo: TodoItem) {
    setEditingTodo(todo);
    formik.setValues({
      name: todo.name,
      description: todo.description,
    });
  }

  return (
    <div>
      {/* Form */}
      <Box component="form" onSubmit={formik.handleSubmit} sx={styles.formBox}>
        {/* <Typography variant="h3" sx={styles.title}>
          Todo Management
        </Typography> */}

        <Stack direction="column" spacing={2}>
          <TextField
            onChange={formik.handleChange}
            label="Todo Name"
            value={formik.values.name}
            onBlur={formik.handleBlur}
            sx={styles.textField}
            margin="dense"
            placeholder="Enter name"
            variant="outlined"
            size="medium"
            name="name"
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          <TextField
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            label="Description"
            placeholder="Enter Description"
            sx={styles.textField}
            margin="dense"
            variant="outlined"
            size="medium"
            name="description"
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
        </Stack>

        <Button
          sx={styles.button}
          disabled={!(formik.isValid && formik.dirty)}
          variant="contained"
          type="submit"
          size="large"
        >
          {editingTodo ? "Update Todo" : "Add Todo"}
        </Button>
      </Box>
      {/* List View */}
      {todos.length > 0 ? (
        <Box sx={styles.listContainer}>
          <Paper sx={styles.listPaper}>
            <List>
              {todos.map((todo, index) => (
                <ListItem
                  key={todo.id}
                  divider
                  sx={styles.listItem(index)}
                  secondaryAction={
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleEdit(todo)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(todo.id)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  }
                >
                  <ListItemText
                    primary={`${todo.id}. ${todo.name}`}
                    primaryTypographyProps={{ sx: styles.listItemTextPrimary }}
                    secondary={todo.description}
                    secondaryTypographyProps={{
                      sx: styles.listItemTextSecondary,
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      ) : (
        <Typography sx={styles.emptyText}>
          No todos added yet. Add one above.
        </Typography>
      )}
    </div>
  );
}

export default Todos;
