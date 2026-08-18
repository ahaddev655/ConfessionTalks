import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthenticationPage from "./pages/AuthenticationPage";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import ReelsPage from "./pages/ReelsPage";
import StoriesPage from "./pages/StoriesPage";
import PersonalProfile from "./pages/PersonalProfile";
import ErrorPage from "./pages/ErrorPage";
import SettingsLayout from "./layouts/SettingsLayout";
import ProfileSettings from "./components/Settings/ProfileSettings";

function App() {
  const routes = createBrowserRouter([
    {
      path: "*",
      element: <ErrorPage />,
    },
    {
      path: "/",
      element: <AuthenticationPage />,
    },
    {
      path: "/en",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "profile",
          element: <PersonalProfile />,
        },
        {
          path: "settings",
          element: <SettingsLayout />,
          children: [
            {
              index: true,
              element: <ProfileSettings />,
            },
          ],
        },
      ],
    },
    {
      path: "/reels",
      element: <ReelsPage />,
    },
    // {
    //   path: "/reels/:video_id",
    //   element: <ReelsPage />,
    // },
    {
      path: "/stories/:user_name",
      element: <StoriesPage />,
    },
  ]);
  return <RouterProvider router={routes} />;
}

export default App;
