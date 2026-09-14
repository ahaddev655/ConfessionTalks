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
import NotificationsSettings from "./components/Settings/NotificationsSettings";
import PrivacySettings from "./components/Settings/PrivacySettings";
import BlockedUsersSettings from "./components/Settings/BlockedUsersSettings";
import Help from "./components/Settings/Help";
import PrivacyCenter from "./components/Settings/PrivacyCenter";
import CreatePage from "./pages/CreatePage";
import AddStoryPage from "./pages/AddStoryPage";
import { useEffect } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    axios
      .delete(`${import.meta.env.VITE_LOCAL_API_URL}/user/expired-stories`)
      .then((response) => {
        axios
          .delete(`${import.meta.env.VITE_LOCAL_API_URL}/auth/delete-tokens`)
          .then((response) => {})
          .catch((error) => {});
      })
      .catch((error) => {});
  }, []);

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
            {
              path: "notifications",
              element: <NotificationsSettings />,
            },
            {
              path: "privacy",
              element: <PrivacySettings />,
            },
            {
              path: "blocked",
              element: <BlockedUsersSettings />,
            },
            {
              path: "help",
              element: <Help />,
            },
            {
              path: "privacy-center",
              element: <PrivacyCenter />,
            },
          ],
        },
        {
          path: "create",
          element: <CreatePage />,
        },
      ],
    },
    {
      path: "/reels",
      element: <ReelsPage />,
    },
    {
      path: "/story",
      element: <AddStoryPage />,
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
