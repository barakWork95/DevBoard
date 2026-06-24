import { useLocation } from "react-router-dom";

export default function Navbar() {
  const pathname = useLocation().pathname;

  return <h1>{pathname}</h1>;
}
