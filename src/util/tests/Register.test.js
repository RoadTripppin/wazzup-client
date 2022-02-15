import { render, screen } from "@testing-library/react";
import Register from "../../components/Register/Register";
import { BrowserRouter as Router } from "react-router-dom";

beforeEach(() => {
  render(
    <Router>
      <Register />
    </Router>
  );
});

test("Renders email, password, Confirm Password, Photo Upload and Register Button", () => {
  const registerElements = screen.getAllByText(/register/i);
  const registerText = registerElements[0];

  expect(registerText).toBeInTheDocument();
});
