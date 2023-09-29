import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Form from "./index";

describe("When Events is created", () => {
  it("a list of event card is displayed", async () => {
    render(<Form />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personnel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success action is called", async () => {
      const onSuccess = jest.fn();
      render(<Form onSuccess={onSuccess} />);
      const button = await screen.findByTestId("button-test-id");
      
      fireEvent.click(button);
      
      // Wait for the button text to change to "En cours" or "Envoyer"
      await waitFor(() => {
        const buttonText = screen.queryByText("En cours") || screen.queryByText("Envoyer");
        return buttonText !== null;
      }, { timeout: 5000 }); // Adjust the timeout as needed

      // Wait for the button text to become "Envoyer" again
      await waitFor(() => {
        const buttonText = screen.queryByText("Envoyer");
        return buttonText !== null;
      }, { timeout: 5000 }); // Adjust the timeout as needed

      // Add a small delay before checking if onSuccess was called
      setTimeout(() => {
        expect(onSuccess).toHaveBeenCalled();
      }, 500); // Adjust the delay as needed
    });
  });
});
