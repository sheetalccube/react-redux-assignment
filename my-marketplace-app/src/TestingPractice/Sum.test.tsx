import Sum, {addition} from "./sum";
import {fireEvent, render, screen} from "@testing-library/react";

beforeAll(() => {
  console.log("before all ");
});
beforeEach(() => {
  console.log("before each");
});
afterAll(() => {
  console.log("after all");
});
afterEach(() => {
  console.log("after each ");
});

// these hooks are used for cleaning db and initial setup and all these kind of things
test("test app", () => {
  render(<Sum />);
  const text = screen.getByText(/sum/i);
  expect(text).toBeInTheDocument();
  let checkInput = screen.getByRole("textbox");
  let placeholder = screen.getByPlaceholderText("Enter user name");
  expect(checkInput).toBeInTheDocument();
  expect(placeholder).toBeInTheDocument();
  expect(checkInput).toHaveAttribute("name", "userName");
  expect(checkInput).toHaveAttribute("id", "userId");
});

test("addition returns correct sum", () => {
  let a = 10;
  let b = 20;
  let c = 30;
  expect(addition(a, b)).toBe(c);
});
test("onchange Event Testing ", () => {
  render(<Sum />);
  const Input = screen.getByRole("textbox") as HTMLInputElement;
  fireEvent.change(Input, {target: {value: "a"}});
  expect(Input.value).toBe("a" + "test");
});

describe("ui test group", () => {
  test("test app rendering ", () => {
    render(<Sum />);

    const text = screen.getByText(/hello/i);
    expect(text).toBeInTheDocument();
  });
  test("button click", () => {
    render(<Sum />);
    const btn = screen.getByRole("button");
    fireEvent.click(btn);
    expect(screen.getByText("updated message")).toBeInTheDocument();
  });
});
// only and skip  for skipping
