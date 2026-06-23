import { useLocation } from "react-router-dom";

export default function Navbar() {
  const pathname = useLocation().pathname;

  return (
    <div className="flex">
      <div>{pathname}</div>
    </div>
  );
}
