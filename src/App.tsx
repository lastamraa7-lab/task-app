import { Routes, Route } from "react-router";
import User from "./pages/User";
import Dashboard from "./pages/Dashboard";
import Task from "./pages/Task";
import Layout from "./components/Layout";
import MyTasks from "./pages/MyTasks";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<MyTasks />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-tasks" element={<MyTasks />} />
        <Route path="/user" element={<User />} />
        <Route path="/task" element={<Task />} />
      </Route>
    </Routes>
  );
}
