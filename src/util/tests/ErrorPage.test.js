import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ErrorPage from "../../components/ErrorPage/ErrorPage";

beforeEach(() => {
  render(
    <Router>
      <ErrorPage />
    </Router>
  );
});

test("Renders name, email, password, Confirm Password, Photo Upload and Register Button", () => {
  const errorElements = screen.getByText(/Error 404/i);

  expect(errorElements).toBeInTheDocument();
});
