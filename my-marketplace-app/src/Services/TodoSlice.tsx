import type { TodoItem, TodosState } from "@/Types/commonTypes";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: TodosState = {
  items: [
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
  ],
  editingTodo: null,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (
      state,
      action: PayloadAction<{ name: string; description: string }>
    ) => {
      const newTodo: TodoItem = {
        id: state.items.length + 1,
        name: action.payload.name,
        description: action.payload.description,
      };
      state.items.push(newTodo);
    },
    updateTodo: (
      state,
      action: PayloadAction<{ id: number; name: string; description: string }>
    ) => {
      const index = state.items.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
      state.editingTodo = null;
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
    setEditingTodo: (state, action: PayloadAction<TodoItem | null>) => {
      state.editingTodo = action.payload;
    },
  },
});

export const { addTodo, updateTodo, deleteTodo, setEditingTodo } =
  todosSlice.actions;
export default todosSlice.reducer;
