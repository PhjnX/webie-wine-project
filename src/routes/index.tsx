import { useRoutes } from "react-router-dom";
import userRoutes from "./userRoutes";

export default function AppRoutes() {
  const routes = useRoutes([userRoutes]);
  return routes;
}
