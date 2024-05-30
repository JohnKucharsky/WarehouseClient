import { createBrowserRouter } from "react-router-dom";
import Layout from "./features/layout/Layout.tsx";
import Products from "./features/products/Products.tsx";
import Addresses from "./features/addresses/Addresses.tsx";
import Shelves from "./features/shelves/Shelves.tsx";
import Shelf from "./features/shelf/Shelf.tsx";
import Orders from "./features/orders/Orders.tsx";

import AssemblyInfo from "./features/assemblyInfo/AssemblyInfo.tsx";
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
        path: paths.shelves,
        element: (
          <PageTitle title={paths.shelves}>
            <Shelves />
          </PageTitle>
        ),
      },
      {
        path: `${paths.shelf}/:shelf_id`,
        element: (
          <PageTitle title={paths.shelf}>
            <Shelf />
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
      {
        path: paths.assembly_info,
        element: (
          <PageTitle title={paths.assembly_info}>
            <AssemblyInfo />
          </PageTitle>
        ),
      },
    ],
  },
]);
