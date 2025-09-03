import { type ThemeMode } from "@/Constants/ReusableText";

export interface HeaderProps {
  mode: ThemeMode;
  onToggleTheme: () => void;
}
export interface BMIState {
  bmi: number | null;
  category: string;
}
export interface User {
  name: string;
  age?: number;
  isAdmin?: boolean;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

export interface Product {
  id?: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}
export interface ApiResponse {
  data: Product[];
  first: number;
  prev?: number | null;
  next?: number | null;
  last: number;
  pages: number;
  items: number;
}

export interface TodoItem {
  id: number;
  name: string;
  description: string;
}

export interface TodosState {
  items: TodoItem[];
  editingTodo: TodoItem | null;
}

export interface AppProps {
  mode: ThemeMode; // "dark" | "light"
  onToggleTheme: () => void;
}
