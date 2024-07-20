import React from 'react'
import ReactDOM from 'react-dom/client'
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import AboutPage from "./pages/AboutPage"
import TipsPage from "./pages/TipsPage"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  { path: "/", element: <HomePage />, errorElement:"404 page not found" },
  { path: "about", element:<AboutPage/>},
  { path: "upload", element:<UploadPage/>},
  { path: "Tips", element:<TipsPage/> },
  { path: "contact", element:"" },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
