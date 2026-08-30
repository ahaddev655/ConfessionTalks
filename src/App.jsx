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
      .delete("http://localhost:3000/api/user/expired-stories")
      .then((response) => {
        axios
          .delete("http://localhost:3000/api/auth/delete-tokens")
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
              path: "/en/settings/notifications",
              element: <NotificationsSettings />,
            },
            {
              path: "/en/settings/privacy",
              element: <PrivacySettings />,
            },
            {
              path: "/en/settings/blocked",
              element: <BlockedUsersSettings />,
            },
            {
              path: "/en/settings/help",
              element: <Help />,
            },
            {
              path: "/en/settings/privacy-center",
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
