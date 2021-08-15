import {
  ADMIN_ROUTE,
  CHAT_ROUTE,
  DISHES_ROUTE,
  HOME_ROUTE,
  MEALS_ROUTE,
} from "./utils/routeConsts";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Dishes from "./pages/Dishes";
import Meals from "./pages/Meals";
import Chat from "./pages/Chat";

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
];

export const publicRoutes = [
  {
    path: HOME_ROUTE,
    Component: Home,
  },
  {
    path: DISHES_ROUTE,
    Component: Dishes,
  },
  {
    path: MEALS_ROUTE,
    Component: Meals,
  },
  {
    path: CHAT_ROUTE,
    Component: Chat,
  },
];
