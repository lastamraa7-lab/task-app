import { NavLink } from "react-router";

const navItems = [
  { name: "My Tasks", path: "/" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Tasks", path: "/task" },
  { name: "User", path: "/user" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">◍ Atlas</div>
      <div className="nav-group">
        {navItems.map(({ name, path }) => (
          <NavLink
            key={path}
            to={path}
            end
            className={({ isActive }) =>
              `nav-item${isActive ? " active" : ""}`
            }
          >
            {name}
          </NavLink>
        ))}
      </div>
    </aside>
  );
}
