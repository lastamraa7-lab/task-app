import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { createTask, fetchTasks } from "../store/tasksSlice";
import StatCards from "./StatCards";
import TaskTable from "./TaskTable";

export default function TasksPage({ title }: { title: string }) {
  const tasks = useAppSelector((s) => s.tasks.items);
  const dispatch = useAppDispatch();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const visible = useMemo(
    () =>
      tasks.filter(
        (t) =>
          (status === "All" || t.status === status) &&
          (t.title + t.project).toLowerCase().includes(q.toLowerCase())
      ),
    [tasks, q, status]
  );

  const handleCreate = () => {
    const name = window.prompt("Task title?");
    if (!name) return;
    dispatch(
      createTask({
        title: name,
        project: "New Project",
        color: "#2563eb",
        due: new Date().toLocaleDateString("en-GB", {
          day: "2-digit", month: "short", year: "numeric",
        }),
        status: "To Do",
        priority: "Medium",
      })
    );
  };

  return (
    <section className="page">
      <div className="page-head">
        <h1>{title}</h1>
        <button className="btn-primary" onClick={handleCreate}>
          + Create New Task
        </button>
      </div>
      <div className="filters">
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          {["All", "To Do", "In Progress", "Complete", "Overdue"].map((s) => (
            <option key={s} value={s}>{s === "All" ? "All Status" : s}</option>
          ))}
        </select>
        <input
          placeholder="Search task / project"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>
      <StatCards tasks={tasks} />
      <TaskTable tasks={visible} />
      <footer className="pager">
        <span>‹</span><b>1</b><span>2</span><span>›</span>
        <em>Total {tasks.length} Data</em>
      </footer>
    </section>
  );
}