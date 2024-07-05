import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface DayTasks {
  day: number;
  tasks: Task[];
}

interface TasksState {
  MonthTasks: DayTasks[];
}

const initialState: TasksState = {
  MonthTasks: [],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ day: number; task: Task }>) => {
      const { day, task } = action.payload;
      const dayTasks = state.MonthTasks.find((d) => d.day === day);

      if (dayTasks) {
        dayTasks.tasks.push(task);
      } else {
        state.MonthTasks.push({ day, tasks: [task] });
      }
    },
    toggleTaskCompletion: (
      state,
      action: PayloadAction<{ day: number; taskId: number }>
    ) => {
      const { day, taskId } = action.payload;
      const dayTasks = state.MonthTasks.find((d) => d.day === day);

      if (dayTasks) {
        const task = dayTasks.tasks.find((t) => t.id === taskId);
        if (task) {
          task.completed = !task.completed;
        }
      }
    },
    deleteTask: (state, action: PayloadAction<{ day: number; taskId: number }>) => {
      const { day, taskId } = action.payload;
      const dayTasks = state.MonthTasks.find((d) => d.day === day);

      if (dayTasks) {
        dayTasks.tasks = dayTasks.tasks.filter((t) => t.id !== taskId);
      }
    },
  },
});

export const { addTask, toggleTaskCompletion, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;
