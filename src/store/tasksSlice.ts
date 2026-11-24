import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { tasks as initial } from "../data/tasks";
import type { Task } from "../types";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: initial as Task[],
  reducers: {
    addTask: (s, a: PayloadAction<Task>) => { s.push(a.payload); },
    removeTask: (s, a: PayloadAction<number>) => s.filter(t => t.id !== a.payload),
    setStatus: (s, a: PayloadAction<{ id: number; status: Task["status"] }>) => {
      const t = s.find(x => x.id === a.payload.id);
      if (t) t.status = a.payload.status;
    },
  },
});

export const { addTask, removeTask, setStatus } = tasksSlice.actions;
export default tasksSlice.reducer;