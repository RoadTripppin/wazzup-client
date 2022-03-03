import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import Register from "../../components/Register/Register";

beforeEach(() => {
  render(
    <Router>
      <Register />
    </Router>
  );
});

test("Renders name, email, password, Confirm Password, Photo Upload and Register Button", () => {
  const registerElements = screen.getAllByText(/register/i);
  const registerText = registerElements[0];
  const nameElement = screen.getByLabelText(/Name/);
  const emailElement = screen.getByLabelText(/Email Address/);
  const passwordElement = screen.getByLabelText(/^Password/);
  const confirmPasswordElement = screen.getByLabelText(/Confirm Password/);
  const photoButton = screen.getByRole("button", { name: /Upload Profile Picture/i });
  const registerButton = screen.getByRole("button", { name: /Register/i });
  const alertComponent = screen.queryByLabelText(/Invalid/i);

  expect(registerText).toBeInTheDocument();
  expect(nameElement).toBeInTheDocument();
  expect(emailElement).toBeInTheDocument();
  expect(passwordElement).toBeInTheDocument();
  expect(confirmPasswordElement).toBeInTheDocument();
  expect(photoButton).toBeInTheDocument();
  expect(registerButton).toBeInTheDocument();
  expect(alertComponent).not.toBeInTheDocument();
});

test("User can enter name, email, password and confirm password", () => {
  const nameElement = screen.getByLabelText(/Name/);
  const emailElement = screen.getByLabelText(/Email Address/);
  const passwordElement = screen.getByLabelText(/^Password/);
  const confirmPasswordElement = screen.getByLabelText(/Confirm Password/);

  userEvent.type(nameElement, "Fake");
  userEvent.type(emailElement, "fakemail@gmail.com");
  userEvent.type(passwordElement, "password");
  userEvent.type(confirmPasswordElement, "password");

  expect(nameElement).toHaveValue("Fake");
  expect(emailElement).toHaveValue("fakemail@gmail.com");
  expect(passwordElement).toHaveValue("password");
  expect(confirmPasswordElement).toHaveValue("password");
});

test("Alert is rendered for no name", () => {
  const nameElement = screen.getByLabelText(/Name/);

  userEvent.type(nameElement, "{enter}");
  let alertElement = screen.getByText(/Invalid Name/i);
  expect(alertElement).toBeInTheDocument();
});

test("Alert is rendered for wrong email", () => {
  const nameElement = screen.getByLabelText(/Name/);

  userEvent.type(nameElement, "Adish");
  const emailElement = screen.getByLabelText(/Email Address/);

  userEvent.type(emailElement, "fakemail{enter}");
  let alertElement = screen.getByText(/Invalid email/i);
  expect(alertElement).toBeInTheDocument();

  userEvent.type(emailElement, "{selectall}{backspace}@gmail{enter}");
  alertElement = screen.getByText(/Invalid email/i);
  expect(alertElement).toBeInTheDocument();

  userEvent.type(emailElement, "{selectall}{backspace}@gmail.com{enter}");
  alertElement = screen.getByText(/Invalid email/i);
  expect(alertElement).toBeInTheDocument();

  userEvent.type(emailElement, "{selectall}{backspace}fakemail@gmail{enter}");
  alertElement = screen.getByText(/Invalid email/i);
  expect(alertElement).toBeInTheDocument();

  userEvent.type(emailElement, "{selectall}{backspace}fakemail@gmail.com{enter}");
  alertElement = screen.queryByText(/Invalid email/i);
  expect(alertElement).not.toBeInTheDocument();
});

test("Alert is rendered for invalid (empty) password", () => {
  const nameElement = screen.getByLabelText(/Name/);

  userEvent.type(nameElement, "Adish");
  const emailElement = screen.getByLabelText(/Email Address/);
  userEvent.type(emailElement, "{selectall}{backspace}fakemail@gmail.com");

  const passwordElement = screen.getByLabelText(/^Password/);
  userEvent.type(passwordElement, "{enter}");

  let alertElement = screen.getByText(/Invalid Password/i);
  expect(alertElement).toBeInTheDocument();
});

test("Alert is rendered for passwords dont match when password is input", () => {
  const nameElement = screen.getByLabelText(/Name/);

  userEvent.type(nameElement, "Adish");
  const emailElement = screen.getByLabelText(/Email Address/);
  userEvent.type(emailElement, "{selectall}{backspace}fakemail@gmail.com");

  const passwordElement = screen.getByLabelText(/^Password/);
  userEvent.type(passwordElement, "test{enter}");

  let alertElement = screen.getByText(/Invalid, Passwords Don't Match/i);
  expect(alertElement).toBeInTheDocument();
});

test("Alert is rendered for passwords dont match when confirm password is input", () => {
  const nameElement = screen.getByLabelText(/Name/);

  userEvent.type(nameElement, "Adish");
  const emailElement = screen.getByLabelText(/Email Address/);
  userEvent.type(emailElement, "{selectall}{backspace}fakemail@gmail.com");

  const passwordElement = screen.getByLabelText(/Confirm Password/);
  userEvent.type(passwordElement, "test{enter}");

  let alertElement = screen.getByText(/Invalid, Passwords Don't Match/i);
  expect(alertElement).toBeInTheDocument();
});
