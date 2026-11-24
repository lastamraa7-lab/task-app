import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="layout">
      <Sidebar />
      <main className="main">
        <Topbar />
        <Outlet />
      </main>
    </div>
  );
}
