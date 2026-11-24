import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [
  { id: 1, title: "Design System Audit", project: "Amazon Dashboard", color: "#f59e0b", due: "10 Jan 2026", status: "Complete", priority: "High" },
  { id: 2, title: "Landing Page Copywriting", project: "Microsoft", color: "#16a34a", due: "12 Jan 2026", status: "Complete", priority: "High" },
  { id: 3, title: "Mobile App Redesign", project: "Apple", color: "#111827", due: "14 Jan 2026", status: "Complete", priority: "High" },
  { id: 4, title: "Key Metrics Layout", project: "Facebook Dashboard", color: "#2563eb", due: "16 Jan 2026", status: "Overdue", priority: "Low" },
  { id: 5, title: "Wireframe v2 Upload", project: "Netflix", color: "#dc2626", due: "17 Jan 2026", status: "In Progress", priority: "Low" },
  { id: 6, title: "QA Testing", project: "Nvidia", color: "#65a30d", due: "17 Jan 2026", status: "In Progress", priority: "Low" },
  { id: 7, title: "Prototype Review", project: "Behance", color: "#1d4ed8", due: "18 Jan 2026", status: "In Progress", priority: "Medium" },
  { id: 8, title: "Copywriting Review", project: "Google Dashboard", color: "#ea4335", due: "24 Jan 2026", status: "To Do", priority: "Medium" },
  { id: 9, title: "UX Audit", project: "Grab Map App", color: "#059669", due: "25 Jan 2026", status: "To Do", priority: "Medium" },
  { id: 10, title: "Review Landing Page", project: "Lego", color: "#e11d48", due: "04 Jan 2026", status: "Complete", priority: "Medium" },
];
let nextId = 11;

app.get("/api/tasks", (_req, res) => res.json(tasks));

app.post("/api/tasks", (req, res) => {
  const task = { ...req.body, id: nextId++ };
  tasks.push(task);
  res.status(201).json(task);
});

app.delete("/api/tasks/:id", (req, res) => {
  tasks = tasks.filter((t) => t.id !== Number(req.params.id));
  res.status(204).end();
});

app.listen(3001, () => console.log("API: http://localhost:3001"));
