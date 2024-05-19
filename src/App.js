import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./page/Home/home";
import TaskView from "./page/task/taskView";
import TaskCreate from "./page/taskCreate/taskCreate";
import Leave from "./page/leave/leave";
import Login from "./page/Login/login";
import Signup from "./page/Signup/signup";
import Dashboard from "./page/Dashboard/dashboard";

export default function App() {
  const routes = [
    {
      path: "/",
      exact: true,
      element: <Login />,
    },
    {
      path: "/signup",
      exact: true,
      element: <Signup />,
    },
    {
      path: "/dashboard",
      exact: true,
      element: <Dashboard />,
    },
    {
      path: "/home",
      exact: true,
      element: <Home />,
    },
    {
      path: "/taskview",
      exact: true,
      element: <TaskView />,
    },
    {
      path: "/taskcreate",
      exact: true,
      element: <TaskCreate />,
    },
    {
      path: "/leave",
      exact: true,
      element: <Leave />,
    },
  ];
  return (
    <>
      <Router>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} {...route} />
          ))}
        </Routes>
      </Router>
    </>
  );
}
