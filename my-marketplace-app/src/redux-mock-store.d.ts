declare module "redux-mock-store" {
  import { AnyAction, Middleware, Store } from "redux";

  interface MockStore<TState = unknown> extends Store<TState> {
    getActions(): AnyAction[];
    clearActions(): void;
  }

  function configureStore<TState = unknown>(
    middlewares?: Middleware[],
  ): (initialState?: TState) => MockStore<TState>;

  export default configureStore;
}
