import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { ModalForm } from "./ModalForm";
import userEvent from "@testing-library/user-event";


// mock fetch API
// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: "success" })
  })
);

describe("ModalForm", () => {

  // test that modal form renders correctly when open prop is true
  test("renders correctly when open", () => {
    render(
      <ModalForm open={true} setOpen={() => {
      }} />
    );
    expect(screen.getByText("Create a new book")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Author")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Review")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  // test that modal form does not render when open prop is false
  test("does not render when closed", () => {
    const { queryByText } = render(<ModalForm open={false} setOpen={() => {
    }} />);
    expect(queryByText("Create a new book")).not.toBeInTheDocument();
  });

  test("closes on cancel button click", async () => {
    const user = userEvent.setup();
    const mockSetOpen = jest.fn();
    const { getByText } = render(
      <ModalForm open={true} setOpen={mockSetOpen} />
    );
    await user.click(getByText("Cancel"));
    await waitFor(() => expect(mockSetOpen).toHaveBeenCalledTimes(1));
  });

  //test for form submission
  test("submits form", async () => {
      const mockSetOpen = jest.fn();
      const user = userEvent.setup();

      render(
        <ModalForm open={true} setOpen={mockSetOpen} />
      );
      await user.type(screen.getByPlaceholderText("Name"), "test book");
      await user.type(screen.getByPlaceholderText("Author"), "test author");
      await user.type(screen.getByPlaceholderText("Review"), "test review");
      await user.click(screen.getByText("Save"));
      await waitFor(() => expect(mockSetOpen).toHaveBeenCalledTimes(1));

    }
  );

});