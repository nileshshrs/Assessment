import { useState } from "react";
import { column, Tasks } from "../types";
import Column from "./Column";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

// Generate a unique ID (only for new tasks/columns)
export const generateId = () => Math.random().toString(36).substring(2, 11); // 9-character ID

const KanbanBoard = () => {
  const [columns, setColumns] = useLocalStorageState<column[]>("kanban-columns", []);

  // Create a new column with a generated ID
  const createColumn = () => {
    const columnToAdd: column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
      tasks: [],
    };
    const updatedColumns = [...columns, columnToAdd];
    setColumns(updatedColumns);
  };

  // Update column title by column ID (no ID generation here)
  const updateColumnTitle = (id: string | number, newTitle: string) => {
    const updatedColumns = columns.map((column) =>
      column.id === id ? { ...column, title: newTitle } : column
    );
    setColumns(updatedColumns);
  };

  // Delete a column by column ID (no ID generation here)
  const deleteColumn = (id: string | number) => {
    const updatedColumns = columns.filter((column) => column.id !== id);
    setColumns(updatedColumns);
  };

  // Add a new task to a column with a generated ID
  const addTaskToColumn = (columnId: string | number, newTask: Tasks) => {
    const updatedColumns = columns.map((column) =>
      column.id === columnId
        ? { ...column, tasks: [...column.tasks, newTask] }
        : column
    );
    setColumns(updatedColumns);
  };

  // Delete a task from a column
  const deleteTaskFromColumn = (columnId: string | number, taskId: string | number) => {
    const updatedColumns = columns.map((column) =>
      column.id === columnId
        ? { ...column, tasks: column.tasks.filter((task) => task.id !== taskId) }
        : column
    );
    setColumns(updatedColumns);
  };

  // Update task content
  const updateTaskContent = (columnId: string | number, taskId: string | number, newContent: string) => {
    const updatedColumns = columns.map((column) =>
      column.id === columnId
        ? {
            ...column,
            tasks: column.tasks.map((task) =>
              task.id === taskId ? { ...task, content: newContent } : task
            ),
          }
        : column
    );
    setColumns(updatedColumns);
  };

  // Handle drag-and-drop events
  const handleOnDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    // If dropped outside the list
    if (!destination) return;

    // If the item is dropped in the same position
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceColumn = columns.find((column) => column.id === source.droppableId);
    const destinationColumn = columns.find((column) => column.id === destination.droppableId);

    if (!sourceColumn || !destinationColumn) return;

    const draggedTask = sourceColumn.tasks.find((task) => task.id === draggableId);

    if (!draggedTask) return;

    // Remove the task from the source column
    const sourceTasks = Array.from(sourceColumn.tasks);
    const destinationTasks = Array.from(destinationColumn.tasks);

    sourceTasks.splice(source.index, 1);
    destinationTasks.splice(destination.index, 0, draggedTask);

    // Update the columns with the new tasks order
    const updatedColumns = columns.map((column) => {
      if (column.id === sourceColumn.id) {
        return { ...column, tasks: sourceTasks };
      }
      if (column.id === destinationColumn.id) {
        return { ...column, tasks: destinationTasks };
      }
      return column;
    });

    // Save the updated columns to local storage
    setColumns(updatedColumns);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <div className="m-4">
        <button onClick={createColumn} className="min-w-[350px] h-[60px] p-4 ring-rose-500 cursor-pointer rounded-lg bg-bg-color border-2 border-bg-column">
          Add Column
        </button>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="w-[90%] max-w-[1500px] h-[80vh] overflow-x-auto overflow-y-hidden border rounded-lg bg-white shadow">
          <div className="flex gap-5 min-w-max p-4 h-full items-center justify-center">
            {columns.map((column) => (
              <Column
                key={column.id}
                column={column}
                onUpdateTitle={updateColumnTitle}
                deleteColumn={deleteColumn}
                addTaskToColumn={addTaskToColumn}
                deleteTaskFromColumn={deleteTaskFromColumn}
                updateTaskContent={updateTaskContent}
              />
            ))}
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
