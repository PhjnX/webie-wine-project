// src/App.tsx
import { useRoutes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import userRoutes from "./routes/userRoutes";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const element = useRoutes([userRoutes]);

  return (
    <AuthProvider>
      <ScrollToTop />
      {element}
    </AuthProvider>
  );
}

export default App;
