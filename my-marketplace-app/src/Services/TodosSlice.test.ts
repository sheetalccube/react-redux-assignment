import todosReducer, {
  addTodo,
  updateTodo,
  deleteTodo,
  setEditingTodo,
  type TodosState,
  type TodoItem,
} from "./TodoSlice";

describe("todosSlice", () => {
  let initialState: TodosState;

  beforeEach(() => {
    initialState = {
      items: [
        {
          id: 1,
          name: "Buy groceries",
          description: "Milk, Bread, Eggs, Fruits",
        },
        { id: 2, name: "Workout", description: "Morning gym session at 7 AM" },
      ],
      editingTodo: null,
    };
  });

  it("should add a new todo", () => {
    const action = addTodo({ name: "New Task", description: "Do something" });
    const state = todosReducer(initialState, action);

    expect(state.items).toHaveLength(3);
    expect(state.items[2]).toEqual({
      id: 3,
      name: "New Task",
      description: "Do something",
    });
  });

  it("should update an existing todo", () => {
    const action = updateTodo({
      id: 1,
      name: "Updated Task",
      description: "Updated description",
    });
    const state = todosReducer(initialState, action);

    expect(state.items[0]).toEqual({
      id: 1,
      name: "Updated Task",
      description: "Updated description",
    });
    expect(state.editingTodo).toBeNull();
  });

  it("should delete a todo by id", () => {
    const action = deleteTodo(1);
    const state = todosReducer(initialState, action);

    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe(2);
  });

  it("should set editingTodo", () => {
    const todo: TodoItem = {
      id: 2,
      name: "Workout",
      description: "Morning gym session at 7 AM",
    };
    const action = setEditingTodo(todo);
    const state = todosReducer(initialState, action);

    expect(state.editingTodo).toEqual(todo);
  });

  it("should clear editingTodo when set to null", () => {
    initialState.editingTodo = {
      id: 2,
      name: "Workout",
      description: "Morning gym session at 7 AM",
    };
    const action = setEditingTodo(null);
    const state = todosReducer(initialState, action);

    expect(state.editingTodo).toBeNull();
  });
});
