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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from "yup";
import useStyle from "@/Pages/Todo/TodosStyle";
import {useSelector, useDispatch} from "react-redux";
import type {AppDispatch, RootState} from "@/Store/Store";
import {
  addTodo,
  deleteTodo,
  setEditingTodo,
  updateTodo,
} from "@/Services/TodoSlice";
import {useState} from "react";

function Todos() {
  const styles = useStyle();
  const dispatch = useDispatch<AppDispatch>();
  const {items: todos, editingTodo} = useSelector(
    (state: RootState) => state.todos
  );
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [todoIdToDelete, setTodoIdToDelete] = useState<number | null>(null);

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

  const formik = useFormik({
    initialValues: {name: "", description: ""},
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values, {resetForm}) => {
      if (editingTodo) {
        dispatch(updateTodo({id: editingTodo.id, ...values}));
      } else {
        dispatch(addTodo(values));
      }
      resetForm();
    },
  });

  function handleDeleteClick(id: number) {
    setTodoIdToDelete(id);
    setOpenDialog(true);
  }

  function handleConfirmDelete() {
    if (todoIdToDelete !== null) {
      dispatch(deleteTodo(todoIdToDelete));
    }
    setOpenDialog(false);
    setTodoIdToDelete(null);
  }

  function handleCancelDelete() {
    setOpenDialog(false);
    setTodoIdToDelete(null);
  }

  function handleEdit(todo: {id: number; name: string; description: string}) {
    dispatch(setEditingTodo(todo));
    formik.setValues({
      name: todo.name,
      description: todo.description,
    });
  }

  return (
    <div>
      {/* Form */}
      <Box component="form" onSubmit={formik.handleSubmit} sx={styles.formBox}>
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
                        onClick={() => handleDeleteClick(todo.id)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  }
                >
                  <ListItemText
                    primary={`${todo.id}. ${todo.name}`}
                    primaryTypographyProps={{sx: styles.listItemTextPrimary}}
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

      <Dialog open={openDialog} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this todo? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Todos;
