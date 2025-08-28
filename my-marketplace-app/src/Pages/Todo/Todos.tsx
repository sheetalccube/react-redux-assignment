import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTheme } from "@mui/material/styles";

function Todos() {
  const theme = useTheme();

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
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "0 auto",
          width: "100%",
          p: 2,
        }}
      >
        <h3 style={{ color: theme.palette.text.primary }}>Todo Management</h3>

        <Stack direction="column" spacing={2}>
          <TextField
            onChange={formik.handleChange}
            label="Todo Name"
            value={formik.values.name}
            onBlur={formik.handleBlur}
            sx={{ mb: 2, flex: 1, width: 300 }}
            required
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
            required
            margin="dense"
            label="Description"
            placeholder="Enter Description"
            sx={{ mb: 2, flex: 2, width: 300 }}
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
          sx={{
            display: "block",
            margin: "10px auto 0 auto",
            width: "180px",
          }}
          disabled={!(formik.isValid && formik.dirty)}
          variant="contained"
          type="submit"
          size="large"
        >
          {editingTodo ? "Update Todo" : "Add Todo"}
        </Button>
      </Box>

      {todos.length > 0 && (
        <div style={{ marginTop: "50px" }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  "& th": { color: theme.palette.common.white },
                }}
              >
                <TableRow>
                  <TableCell>
                    <strong>ID</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Description</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Action</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {todos.map((item, index) => (
                  <TableRow
                    key={item.id}
                    sx={{
                      backgroundColor:
                        index % 2 !== 0
                          ? theme.palette.action.hover
                          : theme.palette.background.paper,
                    }}
                  >
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

      {todos.length === 0 && (
        <p style={{ color: theme.palette.text.secondary }}>
          No todos added yet. Add one above.
        </p>
      )}
    </div>
  );
}

export default Todos;
