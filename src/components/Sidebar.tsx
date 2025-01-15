import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    { name: "Tables", path: "/" },
    { name: "Charts", path: "/charts" },
  ];

  return (
    <div className="w-64 min-h-screen bg-slate-200 p-6">
      <h2 className="text-2xl font-bold mb-6">Soft UI Dashboard</h2>
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `block py-2 px-4 rounded ${
                  isActive ? "bg-white text-black font-semibold" : "bg-slate-200 text-black font-semibold"
                }`
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
