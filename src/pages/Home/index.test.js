import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personnel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await waitFor(() => {
        expect(screen.getByText("Message envoyé !")).toBeInTheDocument();
      }, { timeout: 5000 });
    });
  });
});


describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    render(<Home />);
    screen.getByTestId("realisations")
  });

  it("a list a people is displayed", () => {
    render(<Home />);
    screen.getByTestId("equipe")
  });

  it("a footer is displayed", () => {
    render(<Home />);
    const footerElement = screen.getByRole("contentinfo");
    expect(footerElement).toBeInTheDocument();

  });

  it("an event card, with the last event, is displayed", async () => {
    render(<Home />);
    await screen.findByText("Notre dernière prestation");
  });
});
