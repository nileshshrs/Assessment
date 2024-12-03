import { render, fireEvent, screen } from "@testing-library/react";
import Column from "./Column";
import { MdDelete } from "react-icons/md";

// Mocking generateId function
jest.mock("./KanbanBoard", () => ({
  generateId: jest.fn(() => "mock-id"),
}));

describe("Column Component", () => {
  const mockOnUpdateTitle = jest.fn();
  const mockDeleteColumn = jest.fn();
  const mockAddTaskToColumn = jest.fn();
  const mockDeleteTaskFromColumn = jest.fn();
  const mockUpdateTaskContent = jest.fn();

  const columnMock = {
    id: "1",
    title: "Test Column",
    tasks: [
      { id: "task1", content: "Test Task 1" },
      { id: "task2", content: "Test Task 2" },
    ],
  };

  test("renders the column with title and tasks", () => {
    render(
      <Column
        column={columnMock}
        onUpdateTitle={mockOnUpdateTitle}
        deleteColumn={mockDeleteColumn}
        addTaskToColumn={mockAddTaskToColumn}
        deleteTaskFromColumn={mockDeleteTaskFromColumn}
        updateTaskContent={mockUpdateTaskContent}
      />
    );

    // Test column title
    expect(screen.getByDisplayValue(columnMock.title)).toBeInTheDocument();

    // Test task content
    columnMock.tasks.forEach((task) => {
      expect(screen.getByDisplayValue(task.content)).toBeInTheDocument();
    });
  });

  test("updates the title", () => {
    render(
      <Column
        column={columnMock}
        onUpdateTitle={mockOnUpdateTitle}
        deleteColumn={mockDeleteColumn}
        addTaskToColumn={mockAddTaskToColumn}
        deleteTaskFromColumn={mockDeleteTaskFromColumn}
        updateTaskContent={mockUpdateTaskContent}
      />
    );

    const titleInput = screen.getByDisplayValue(columnMock.title);
    fireEvent.change(titleInput, { target: { value: "Updated Title" } });

    // Test if the mock function is called with the new title
    expect(mockOnUpdateTitle).toHaveBeenCalledWith("1", "Updated Title");
  });

  test("adds a new task", () => {
    render(
      <Column
        column={columnMock}
        onUpdateTitle={mockOnUpdateTitle}
        deleteColumn={mockDeleteColumn}
        addTaskToColumn={mockAddTaskToColumn}
        deleteTaskFromColumn={mockDeleteTaskFromColumn}
        updateTaskContent={mockUpdateTaskContent}
      />
    );

    const addTaskButton = screen.getByText("Add Task");
    fireEvent.click(addTaskButton);

    // Test if the mock function is called to add a new task
    expect(mockAddTaskToColumn).toHaveBeenCalledWith("1", {
      id: "mock-id",
      content: "New Task",
    });
  });

  test("deletes a task", () => {
    render(
      <Column
        column={columnMock}
        onUpdateTitle={mockOnUpdateTitle}
        deleteColumn={mockDeleteColumn}
        addTaskToColumn={mockAddTaskToColumn}
        deleteTaskFromColumn={mockDeleteTaskFromColumn}
        updateTaskContent={mockUpdateTaskContent}
      />
    );

    const deleteButton = screen.getAllByRole("button")[1]; // Deleting first task
    fireEvent.click(deleteButton);

    // Test if the delete task function is called
    expect(mockDeleteTaskFromColumn).toHaveBeenCalledWith("1", "task1");
  });

  test("updates task content", () => {
    render(
      <Column
        column={columnMock}
        onUpdateTitle={mockOnUpdateTitle}
        deleteColumn={mockDeleteColumn}
        addTaskToColumn={mockAddTaskToColumn}
        deleteTaskFromColumn={mockDeleteTaskFromColumn}
        updateTaskContent={mockUpdateTaskContent}
      />
    );

    const taskTextarea = screen.getByDisplayValue("Test Task 1");
    fireEvent.change(taskTextarea, { target: { value: "Updated Content" } });

    // Test if the update task content function is called
    expect(mockUpdateTaskContent).toHaveBeenCalledWith("1", "task1", "Updated Content");
  });
});
