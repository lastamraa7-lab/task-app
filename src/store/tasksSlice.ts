import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Task } from "../types";

export const fetchTasks = createAsyncThunk("tasks/fetch", async () => {
  const res = await fetch("/api/tasks");
  return (await res.json()) as Task[];
});

export const createTask = createAsyncThunk(
  "tasks/create",
  async (task: Omit<Task, "id">) => {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    return (await res.json()) as Task;
  }
);

export const deleteTask = createAsyncThunk("tasks/delete", async (id: number) => {
  await fetch(`/api/tasks/${id}`, { method: "DELETE" });
  return id;
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState: { items: [] as Task[], loading: false },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchTasks.pending, (s) => { s.loading = true; })
      .addCase(fetchTasks.fulfilled, (s, a) => { s.items = a.payload; s.loading = false; })
      .addCase(createTask.fulfilled, (s, a) => { s.items.push(a.payload); })
      .addCase(deleteTask.fulfilled, (s, a) => {
        s.items = s.items.filter((t) => t.id !== a.payload);
      });
  },
});

export default tasksSlice.reducer;