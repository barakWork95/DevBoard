import { Link } from "react-router-dom";
import { useLogout } from "../core/hooks/useAuth";
import useAuthStore from "../store/authStore";

export default function Sidebar() {
  const user = useAuthStore((state) => state.user);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const { mutate, isError } = useLogout();

  const handleLogout = () => {
    mutate({ refreshToken: refreshToken! });
  };

  return (
    <div className="flex flex-col justify-between p-5 w-64">
      <h1>DevBoard</h1>
      <div className="flex flex-col gap-3">
        <Link to="/">Dashboard</Link>
        <Link to="/projects">Projects</Link>
      </div>
      <div className="flex flex-col items-start">
        <button>{user?.name}</button>
        <button onClick={handleLogout}>Logout</button>
        {isError && <p>Logout failed, try again.</p>}
      </div>
    </div>
  );
}
