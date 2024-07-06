import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  deleteTask,
  toggleTaskCompletion,
} from "../redux/slices/tasksSlice";
import { RootState } from "../redux/store";

interface TaskModalProps {
  day: number;
  onClose: () => void;
}

const TaskModal = ({ day, onClose }: TaskModalProps) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.MonthTasks);
  const [newTask, setNewTask] = useState("");
  const tasksDay = tasks.filter((task) => task.day === day)[0]?.tasks;
  const handleAddTask = () => {
    if (newTask.trim()) {
      dispatch(
        addTask({
          day: day,
          task: { id: Date.now(), text: newTask, completed: false },
        })
      );
      setNewTask("");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl">Day {day}</h2>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="bg-red-500 hover:bg-red-700 font-bold text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
        <div className="mb-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="New Task"
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          >
            Add Task
          </button>
        </div>
        <ul>
          {tasksDay?.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center py-2 border-b"
            >
              <span
                onClick={() =>
                  dispatch(toggleTaskCompletion({ day, taskId: task.id }))
                }
                className={`cursor-pointer hover:underline ${
                  task.completed ? "line-through" : ""
                }`}
              >
                {task.text}
              </span>
              <button
                onClick={() => dispatch(deleteTask({ day, taskId: task.id }))}
                className="text-red-500 border rounded border-red-500 px-2 hover:bg-red-500 hover:text-white"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskModal;
