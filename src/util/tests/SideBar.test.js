import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";

beforeEach(() => {
  render(
    <Router>
      <SideBar
        conversations={[
          {
            id: 1,
            name: "Adish",
            image_url: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/48.jpg",
          },
          {
            id: 2,
            name: "Test",
            image_url:
              "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1105.jpg",
          },
        ]}
      />
    </Router>
  );
});

test("Renders peoples names and photos", () => {
  const nameAdish = screen.getByText(/adish/i);
  const nameTest = screen.getByText(/test/i);

  expect(nameAdish).toBeInTheDocument();
  expect(nameTest).toBeInTheDocument();
});
