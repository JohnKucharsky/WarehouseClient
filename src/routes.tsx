import { createBrowserRouter } from "react-router-dom";
import Layout from "./features/layout/Layout.tsx";
import Products from "./features/products/Products.tsx";
import Addresses from "./features/addresses/Addresses.tsx";
import Orders from "./features/orders/Orders.tsx";

import { paths } from "src/utils/common.ts";
import PageTitle from "src/components/PageTitle.tsx";
import { redirect } from "react-router";
import { Box } from "@mui/material";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, loader: () => redirect("/products") },
      {
        path: paths.products,
        element: (
          <PageTitle title={paths.products}>
            <Products />
          </PageTitle>
        ),
      },
      {
        path: paths.addresses,
        element: (
          <PageTitle title={paths.addresses}>
            <Addresses />
          </PageTitle>
        ),
      },
      {
        path: paths.orders,
        element: (
          <PageTitle title={paths.orders}>
            <Orders />
          </PageTitle>
        ),
      },
      {
        path: `${paths.order}/:order_id`,
        element: (
          <PageTitle title={paths.order}>
            <Box />
          </PageTitle>
        ),
      },
    ],
  },
]);
