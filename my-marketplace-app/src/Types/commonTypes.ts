import { type THEME_MODE } from "@/Constants/ReusableText";

/* ---------- Global App / Layout ---------- */
export interface HeaderProps {
  mode: THEME_MODE;
  onToggleTheme: () => void;
}

export interface AppProps {
  mode: THEME_MODE;
  onToggleTheme: () => void;
}

/* ---------- Auth ---------- */
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

/* ---------- Products ---------- */
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

/* ---------- Todos ---------- */
export interface TodoItem {
  id: number;
  name: string;
  description: string;
}

export interface TodosState {
  items: TodoItem[];
  editingTodo: TodoItem | null;
}

/* ---------- BMI ---------- */
export interface BMIState {
  bmi: number | null;
  category: string;
}

/* ---------- Header Subcomponents ---------- */
export interface DesktopNavProps {
  isAuthenticated: boolean;
  user: User | null;
}

export interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  isLoggedIn: boolean;
  onToggleTheme: () => void;
  mode: THEME_MODE;
  handleLogout: () => void;
}

export interface AuthButtonsProps {
  isAuthenticated: boolean;
  onLogout: () => void;
  navigate: (path: string) => void;
}

export interface UserBadgeProps {
  isAuthenticated: boolean;
  user: User | null;
  onToggleTheme: () => void;
  mode: THEME_MODE;
  navigate: (path: string) => void;
}
