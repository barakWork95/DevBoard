import { useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";

const getBreadcrumbs = (pathname: string) => {
  const segments = pathname.split("/").filter(Boolean);
  const crumbs = [{ label: "Home", path: "/" }];

  if (segments[0] === "projects") {
    crumbs.push({ label: "Projects", path: "/projects" });
    if (segments[1]) {
      crumbs.push({ label: "Project", path: `/projects/${segments[1]}` });
    }
    if (segments[2] === "tasks" && segments[3]) {
      crumbs.push({
        label: "Task",
        path: `/projects/${segments[1]}/tasks/${segments[3]}`,
      });
    }
  }

  return crumbs;
};

export default function Navbar() {
  const { pathname } = useLocation();
  const crumbs = getBreadcrumbs(pathname);

  return (
    <div
      className="flex items-center px-6 h-14"
      style={{ backgroundColor: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}
    >
      <Breadcrumbs aria-label="breadcrumb">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return isLast ? (
            <Typography
              key={crumb.path}
              variant="body2"
              sx={{ color: "text.primary", fontWeight: 500 }}
            >
              {crumb.label}
            </Typography>
          ) : (
            <Link
              key={crumb.path}
              to={crumb.path}
              style={{ textDecoration: "none" }}
            >
              <Typography variant="body2" sx={{ color: "primary.main" }}>
                {crumb.label}
              </Typography>
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}
