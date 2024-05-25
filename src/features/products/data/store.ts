import { createEvent, createStore, merge, sample } from "effector";
import { getProductsFx, productStarted } from "./api.ts";

const $page = createStore(0);
const $limit = createStore(20);

const handlePageChangeEv = createEvent<number>();
const handleLimitChangeEv = createEvent<number>();

$page
  .on(handlePageChangeEv, (_, value) => value)
  .on(handleLimitChangeEv, () => 0);

$limit.on(handleLimitChangeEv, (_, value) => value);

// sorting
const $sortOrder = createStore<"asc" | "desc">("desc");
const $orderBy = createStore("updated_at");

const handleSortEv = createEvent<string>();

sample({
  clock: handleSortEv,
  source: [$sortOrder, $orderBy],
  fn: ([sortOrder, orderBy], property) => {
    const isAsc = orderBy === property && sortOrder === "asc";
    return isAsc ? "desc" : "asc";
  },
  target: $sortOrder,
});

$orderBy.on(handleSortEv, (_, value) => value);

sample({
  clock: merge([
    handlePageChangeEv,
    handleLimitChangeEv,
    handleSortEv,
    productStarted,
  ]),
  source: {
    page: $page,
    limit: $limit,
    sort_order: $sortOrder,
    order_by: $orderBy,
  },
  fn: (params) => params,
  target: getProductsFx,
});

export const productStore = {
  $page,
  $limit,
  handlePageChangeEv,
  handleLimitChangeEv,
  $sortOrder,
  $orderBy,
  handleSortEv,
};
