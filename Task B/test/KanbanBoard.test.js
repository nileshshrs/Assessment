import { render, screen, fireEvent, within } from "@testing-library/react";
import Column from "./Column";
import { MdDelete } from "react-icons/md";

jest.mock("react-icons/md", () => ({
  MdDelete: jest.fn(() => <div>Delete Icon</div>),
}));

describe("Column Component", () => {
  const mockColumn = {
    id: "1",
    title: "Test Column",
    tasks: [
      { id: "1", content: "Test Task 1" },
      { id: "2", content: "Test Task 2" },
    ],
  };

  const mockUpdateTitle = jest.fn();
  const mockDeleteColumn = jest.fn();
  const mockAddTaskToColumn = jest.fn();
  const mockDeleteTaskFromColumn = jest.fn();
  const mockUpdateTaskContent = jest.fn();

  beforeEach(() => {
    render(
      <Column
        column={mockColumn}
        onUpdateTitle={mockUpdateTitle}
        deleteColumn={mockDeleteColumn}
        addTaskToColumn={mockAddTaskToColumn}
        deleteTaskFromColumn={mockDeleteTaskFromColumn}
        updateTaskContent={mockUpdateTaskContent}
      />
    );
  });

  test("renders column with title and tasks", () => {
    expect(screen.getByText(mockColumn.title)).toBeInTheDocument();
    expect(screen.getByText("Test Task 1")).toBeInTheDocument();
    expect(screen.getByText("Test Task 2")).toBeInTheDocument();
  });

  test("updates column title", () => {
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Updated Column Title" } });

    expect(mockUpdateTitle).toHaveBeenCalledWith(mockColumn.id, "Updated Column Title");
  });

  test("adds a new task", () => {
    const addButton = screen.getByText("Add Task");
    fireEvent.click(addButton);

    expect(mockAddTaskToColumn).toHaveBeenCalled();
  });

  test("deletes a task", () => {
    const deleteButton = within(screen.getByText("Test Task 1")).getByText("Delete Icon");
    fireEvent.click(deleteButton);

    expect(mockDeleteTaskFromColumn).toHaveBeenCalledWith(mockColumn.id, "1");
  });

  test("deletes the column", () => {
    const deleteColumnButton = screen.getByText("Delete Icon");
    fireEvent.click(deleteColumnButton);

    expect(mockDeleteColumn).toHaveBeenCalledWith(mockColumn.id);
  });
});
