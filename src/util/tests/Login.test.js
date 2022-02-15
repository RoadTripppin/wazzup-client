import { render, screen } from "@testing-library/react";
import Login from "../../components/Login/Login";
import { BrowserRouter as Router } from "react-router-dom";
beforeEach(() => {
  render(
    <Router>
      <Login />
    </Router>
  );
});

test("Renders email, password, and Login Button", () => {
  const loginElements = screen.getAllByText(/Login/i);
  const loginText = loginElements[0];
  const emailElement = screen.getByLabelText(/Email Address/);
  const passwordElement = screen.getByLabelText(/Password/);
  const loginButton = screen.getByRole("button", { name: /login/i });
  const alertComponent = screen.queryByRole("div", { role: /alert/i });

  expect(loginText).toBeInTheDocument();
  expect(emailElement).toBeInTheDocument();
  expect(passwordElement).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
  expect(alertComponent).not.toBeInTheDocument();
});
