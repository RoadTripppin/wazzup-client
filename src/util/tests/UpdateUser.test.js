import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import UpdateUser from "../../components/UpdateUser/UpdateUser";

beforeEach(() => {
  render(
    <Router>
      <UpdateUser />
    </Router>
  );
});

test("Renders name, password, confirm password, photo button and update Button", () => {
  const updateElements = screen.getAllByText(/update/i);
  const updateText = updateElements[0];
  const nameElement = screen.getByLabelText(/Name/);
  const passwordElement = screen.getByLabelText(/^Password/);
  const confirmPasswordElement = screen.getByLabelText(/Confirm Password/);
  const photoButton = screen.getByRole("button", { name: /Upload Profile Picture/i });
  const updateButton = screen.getByRole("button", { name: /Update/i });
  const alertComponent = screen.queryByLabelText(/Invalid/i);

  expect(updateText).toBeInTheDocument();
  expect(nameElement).toBeInTheDocument();
  expect(passwordElement).toBeInTheDocument();
  expect(confirmPasswordElement).toBeInTheDocument();
  expect(photoButton).toBeInTheDocument();
  expect(updateButton).toBeInTheDocument();
  expect(alertComponent).not.toBeInTheDocument();
});

test("User can enter name, password and confirm password", () => {
  const emailElement = screen.getByLabelText(/Name/);
  const passwordElement = screen.getByLabelText(/^Password/);
  const confirmPasswordElement = screen.getByLabelText(/Confirm Password/);

  userEvent.type(emailElement, "fake");
  userEvent.type(passwordElement, "password");
  userEvent.type(confirmPasswordElement, "cpassword");

  expect(emailElement).toHaveValue("fake");
  expect(passwordElement).toHaveValue("password");
  expect(confirmPasswordElement).toHaveValue("cpassword");
});

test("Alert is rendered for no information", () => {
  const nameElement = screen.getByLabelText(/Name/);

  userEvent.type(nameElement, "{enter}");
  let alertElement = screen.getByText(/Enter details to be updated!/i);
  expect(alertElement).toBeInTheDocument();
});

test("Alert is rendered for passwords dont match when password is input", () => {
  const passwordElement = screen.getByLabelText(/^Password/);
  userEvent.type(passwordElement, "test{enter}");

  let alertElement = screen.getByText(/Passwords don't match!/i);
  expect(alertElement).toBeInTheDocument();
});

test("Alert is rendered for passwords dont match when confirm password is input", () => {
  const passwordElement = screen.getByLabelText(/Confirm Password/);
  userEvent.type(passwordElement, "test{enter}");

  let alertElement = screen.getByText(/Passwords don't match!/i);
  expect(alertElement).toBeInTheDocument();
});
