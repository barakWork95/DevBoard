import { Link, useLocation } from "react-router-dom";
import { useLogout } from "../core/hooks/useAuth";
import useAuthStore from "../store/authStore";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FolderIcon from "@mui/icons-material/Folder";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

const navItems = [
  { label: "Dashboard", path: "/", icon: <DashboardIcon fontSize="small" /> },
  {
    label: "Projects",
    path: "/projects",
    icon: <FolderIcon fontSize="small" />,
  },
];

export default function Sidebar() {
  const user = useAuthStore((state) => state.user);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const { mutate, isError } = useLogout();
  const location = useLocation();

  const handleLogout = () => mutate({ refreshToken: refreshToken! });

  const initials = user?.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex flex-col justify-between h-full p-4 w-64 bg-white border-r border-gray-200">
      {/* Logo */}
      <div>
        <Typography
          variant="h6"
          sx={{ color: "primary.main", fontWeight: 700, mb: 3, px: 1 }}
        >
          DevBoard
        </Typography>

        {/* Nav Items */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.path !== "/" && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors"
                  style={{
                    backgroundColor: isActive ? "#E9F0FF" : "transparent",
                    color: isActive ? "#0052CC" : "#172B4D",
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {item.icon}
                  <Typography variant="body2" sx={{ fontWeight: "inherit" }}>
                    {item.label}
                  </Typography>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom — user + logout */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: "primary.main",
              fontSize: 13,
            }}
          >
            {initials}
          </Avatar>
          <Typography
            variant="body2"
            sx={{ color: "text.primary", fontWeight: 500 }}
          >
            {user?.name}
          </Typography>
        </div>
        <Tooltip title="Logout">
          <IconButton
            size="small"
            onClick={handleLogout}
            sx={{ color: "text.secondary" }}
          >
            <LogoutIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        {isError && (
          <Typography variant="caption" color="error">
            Logout failed
          </Typography>
        )}
      </div>
    </div>
  );
}
