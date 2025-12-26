import { Outlet, useLocation } from "react-router-dom";
import { Suspense } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function HomeTemplate() {
  const location = useLocation();
  const hideHeader = location.pathname === "/order";

  return (
    <div className="flex flex-col min-h-screen">
      {!hideHeader && <Header />}

      <main className="flex-1">
        <Suspense
          fallback={
            <div className="h-screen flex items-center justify-center">
              Loading...
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
