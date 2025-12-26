import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import HomeTemplate from "../layouts/HomeTemplate";
import ProtectedRoute from "./protected-route";

const HomePage = lazy(() => import("../pages/HomePage"));
const AboutPage = lazy(() => import("../pages/AboutPage"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));
const ProductDetailPage = lazy(() => import("../pages/ProductDetailPage"));
const OrderPage = lazy(() => import("../pages/OrderPage"));

const CategoryPage = lazy(() => import("../pages/CategoryPage"));

const userRoutes: RouteObject = {
  path: "/",
  element: <HomeTemplate />,
  children: [
    { index: true, element: <HomePage /> },
    { path: "about", element: <AboutPage /> },

    { path: "product/:id", element: <ProductDetailPage /> },

    { path: "order", element: <OrderPage /> },

    { path: "collections/:slug", element: <CategoryPage /> },

    {
      element: <ProtectedRoute />,
      children: [{ path: "profile", element: <ProfilePage /> }],
    },
  ],
};

export default userRoutes;
