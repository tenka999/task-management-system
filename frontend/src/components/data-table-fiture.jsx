import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_includesString,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_text,
  tableFeatures,
} from "@tanstack/react-table";

// New in v9: declare the features this table uses — anything you don't
// register is tree-shaken out of the bundle.
const features = tableFeatures({
  rowSortingFeature,
  rowPaginationFeature,
  columnFilteringFeature,

  sortedRowModel: createSortedRowModel(),
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
});

const { useAppTable, createAppColumnHelper } = createTableHook({
  features,
});

// Pass this as the first generic argument to `ColumnDef`, `Column`, `Table`,
// and `Row` so each type knows which feature APIs are available.
