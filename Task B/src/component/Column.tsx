import { Droppable, Draggable } from "react-beautiful-dnd";
import { column, Tasks } from "../types";
import { generateId } from "./KanbanBoard";
import { MdDelete } from "react-icons/md";

interface Props {
  column: column;
  onUpdateTitle: (id: string | number, newTitle: string) => void;
  deleteColumn: (id: string | number) => void;
  addTaskToColumn: (columnId: string | number, newTask: Tasks) => void;
  deleteTaskFromColumn: (columnId: string | number, taskId: string | number) => void;
  updateTaskContent: (columnId: string | number, taskId: string | number, newContent: string) => void;
}

const Column = ({
  column,
  onUpdateTitle,
  deleteColumn,
  addTaskToColumn,
  deleteTaskFromColumn,
  updateTaskContent,
}: Props) => {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateTitle(column.id, e.target.value);
  };

  const handleAddTask = () => {
    const newTask: Tasks = {
      id: generateId(),
      content: "New Task",
    };
    addTaskToColumn(column.id, newTask);
  };

  const handleTaskContentChange = (taskId: string | number, e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateTaskContent(column.id, taskId, e.target.value);
  };

  const handleTaskDelete = (taskId: string | number) => {
    deleteTaskFromColumn(column.id, taskId);
  };

  return (
    <div className="bg-column min-w-[350px] h-full w-[350px] rounded-md flex flex-col overflow-scroll justify-between">
      <div className="bg-bg-color text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-4 border-column flex items-center justify-between">
        <input
          type="text"
          value={column.title}
          onChange={handleTitleChange}
          className="bg-transparent border-b focus:outline-none focus:border-rose-500 px-1 w-full"
        />
        <button onClick={() => deleteColumn(column.id)} className="">
          <MdDelete className="text-2xl" />
        </button>
      </div>

      {/* Wrap Droppable here for the column */}
      <Droppable droppableId={column.id.toString()} type="task">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="p-5 h-full flex-1 flex flex-col gap-5 overflow-y-scroll"
          >
            {column.tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="bg-gray-200 p-2 rounded-md relative min-h-[100px]"
                  >
                    <textarea
                      value={task.content}
                      onChange={(e) => handleTaskContentChange(task.id, e)}
                      className="bg-transparent border-none w-full min-h-[60px] resize-none"
                      placeholder="Task content here"
                    />
                    <button
                      onClick={() => handleTaskDelete(task.id)}
                      className="absolute top-2 right-2 text-red-500"
                    >
                      <MdDelete className="text-2xl" />
                    </button>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <div className="p-4 flex-shrink">
        <button
          onClick={handleAddTask}
          className="mt-2 p-2 bg-green-500 text-white rounded-md w-full"
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default Column;
