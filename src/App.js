import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Root from "./pages/Root";
import NotFoundPage from "./pages/NotFoundPage";
import Home from "./pages/Home";
import Item from "./pages/Item";
import MyPage from "./pages/MyPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "item/:id", element: <Item /> },
      { path: "myPage", element: <MyPage /> },
      { path: "myPage/myWishList", element: <MyPage /> },
      { path: "myPage/order/cart", element: <MyPage /> },
      { path: "myPage/order/new", element: <MyPage /> },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
