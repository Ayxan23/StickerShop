import { createElement } from "react";
import Home from "../pages/Site/Home/Home";
import SiteRoot from "../pages/Site/SiteRoot/SiteRoot";
import Error from "../pages/error/Error";
import Detail from "../pages/Site/Detail/Detail";
import Cart from "../pages/Site/Cart/Cart";

export const ROUTES = [
  {
    path: "/",
    element: createElement(SiteRoot),
    children: [
      {
        path: "",
        element: createElement(Home),
      },
      {
        path: "/detail/:id",
        element: createElement(Detail),
      },
      {
        path: "/cart",
        element: createElement(Cart),
      },
      {
        path: "*",
        element: createElement(Error ),
      },
    ],
  },
];
