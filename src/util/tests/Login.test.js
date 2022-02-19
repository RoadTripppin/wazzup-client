import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "../../components/Login/Login";
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
  const alertComponent = screen.queryByText(/invalid/i);

  expect(loginText).toBeInTheDocument();
  expect(emailElement).toBeInTheDocument();
  expect(passwordElement).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
  expect(alertComponent).not.toBeInTheDocument();
});

test("User can enter email and password", () => {
  const emailElement = screen.getByLabelText(/Email Address/);
  const passwordElement = screen.getByLabelText(/Password/);

  userEvent.type(emailElement, "fakemail@gmail.com");
  userEvent.type(passwordElement, "password");

  expect(emailElement).toHaveValue("fakemail@gmail.com");
  expect(passwordElement).toHaveValue("password");
});

test("Alert is rendered for incorrect email", () => {
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

  userEvent.type(emailElement, "f{selectall}{backspace}fakemail@gmail.com{enter}");
  alertElement = screen.queryByText(/Invalid email/i);
  expect(alertElement).not.toBeInTheDocument();
});

it("Alert is rendered for incorrect credentials", async () => {
  const emailElement = screen.getByLabelText(/Email Address/);
  userEvent.type(emailElement, "fakemail@gmail.com");
  const passwordElement = screen.getByLabelText(/Password/);
  userEvent.type(passwordElement, "THISISDEFNOTAPASSWORD!");

  const loginButton = screen.getByRole("button", { name: /login/i });

  userEvent.click(loginButton);

  await waitFor(() => {
    const alertElement = screen.getByText(/Invalid Credentials/i);
    expect(alertElement).toBeInTheDocument();
  });
});
