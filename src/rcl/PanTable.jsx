import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Stack,
  Chip,
  Checkbox,
  Toolbar,
  Typography,
  ThemeProvider,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EnhancedTableHead from "./PanTableInternals/EnhancedTableHead";
import EnhancedTableToolbar from "./PanTableInternals/EnhancedTableToolbar";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function PanTable({
  columns,
  rows,
  defaultFilter,
  setDefaultFilter,
  filterPreset,
  showColumnFilters,
  tableTitle,
  groupOperations,
  sx,
  theme,
  onRowSelectionModelChange,
  checkboxSelection,
  initialState
}) {
  const [order, setOrder] = useState(initialState?.sorting ? initialState?.sorting?.order : "asc");
  const [orderBy, setOrderBy] = useState(initialState?.sorting ? initialState?.sorting?.field : "date");
  const [selected, setSelected] = useState([]);
  const [activeFiltersIndices, setActiveFiltersIndices] = useState([]);

  const Wrapper = theme ? ThemeProvider : React.Fragment;
  const wrapperProps = theme ? { theme } : {};

  const [columnFilters, setColumnFilters] = useState(() => {
      const filters = {};
      columns.forEach((col) => {
        filters[col.field] = "";
      });
      return filters;
  });

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    const newSelected = event.target.checked 
      ? visibleRows.map((n) => n.id) 
      : [];
    setSelected(newSelected);
    if (onRowSelectionModelChange) {
      onRowSelectionModelChange(newSelected);
    }
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
    if (onRowSelectionModelChange){
      onRowSelectionModelChange(newSelected)
    };
  };

  const handleClearSelection = () => {
    setSelected([]);
    if (onRowSelectionModelChange) {
      onRowSelectionModelChange([])
    };
  };

  const updateColumnFilter = (field, value) => {
    setColumnFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleChipClick = (index) => {
    setActiveFiltersIndices((prevActiveFilters) => {
      if (prevActiveFilters.includes(index)) {
        return prevActiveFilters.filter((i) => i !== index);
      } else {
        return [...prevActiveFilters, index];
      }
    });
  };
  // Function handling the multi-select Chips
  const currentCombinedFilter = useMemo(() => {
    if (!filterPreset || activeFiltersIndices.length === 0) {
      return () => true;
    }
    const selectedFilterFunctions = activeFiltersIndices.map((index) => {
      const filterItem = filterPreset[index];
      if (filterItem && typeof filterItem.filter === "function") {
        return filterItem.filter;
      } else {
        console.warn(`Invalid filter function found for index ${index}`);
        return () => false;
      }
    });
    return (row) => {
      return selectedFilterFunctions.some((filterFn) => filterFn(row));
    };
  }, [activeFiltersIndices, filterPreset]);

  // The filter that handles simple filter, column filters and multi-select filters
  const visibleRows = useMemo(
    () =>
      [...rows]
        .filter((row) => {
          if (
            defaultFilter &&
            typeof defaultFilter === "function" &&
            !defaultFilter(row)
          ) {
            return false;
          }
          if (!currentCombinedFilter(row)) {
            return false;
          }
          for (const field in columnFilters) {
            const filterValue = columnFilters[field].toLowerCase();
            if (filterValue) {
              const rowValue = String(row[field]).toLowerCase();
              if (!rowValue.includes(filterValue)) {
                return false;
              }
            }
          }
          return true;
        })
        .sort(getComparator(order, orderBy)),
    [order, orderBy, rows, defaultFilter, currentCombinedFilter, columnFilters],
  );

  return (
    <Wrapper {...wrapperProps}>
    <Box sx={filterPreset ?{ width: "100%", height:"calc(100% - 40px)"} :{height:"100%", width: "100%", }}>
      {filterPreset && (
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", p: 1 }}>
          <Stack direction="row" spacing={1}>
            {filterPreset.map((c, index) => {
              const isActive = activeFiltersIndices.includes(index);
              return (
                <Chip
                  key={c.label}
                  label={
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: isActive ? 0.5 : 0,
                      }}
                    >
                      <span>{c.label}</span>
                      {isActive && <HighlightOffIcon sx={{ fontSize: 24 }} />}
                    </Box>
                  }
                  variant={isActive ? "filled" : "outlined"}
                  color={"secondary"}
                  onClick={() => handleChipClick(index)}
                />
              );
            })}
          </Stack>
        </Box>
      )}
      {groupOperations && (
        <EnhancedTableToolbar
          numSelected={selected.length}
          selectedIds={selected}
          clearSelection={handleClearSelection}
          tableTitle={tableTitle}
          groupOperations={groupOperations}
          dataRows={rows}
        />
      )}
      {!groupOperations && tableTitle && (
        <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            {tableTitle}
          </Typography>
        </Toolbar>
      )}
      <TableContainer component={Paper} sx={sx ? sx : { height: "100%" }}>
        {" "}
        {/* Custom sx styles is applied if defined */}
        <Table
          stickyHeader
          aria-label="pan table"
          sx={{ width: "100%" }}
        >
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={visibleRows.length}
            columns={columns}
            setColumnFilter={updateColumnFilter}
            columnFilters={columnFilters}
            showColumnFilters={showColumnFilters}
            groupOperations={groupOperations}
            checkboxSelection={checkboxSelection}
          />
          <TableBody sx={{ verticalAlign: "top" }}>
            {visibleRows.map((row, n) => {
              const isItemSelected = selected.includes(row.id);
              return (
                <TableRow
                  hover
                  onClick={(event) => {
                    if (checkboxSelection || groupOperations) {
                      handleClick(event, row.id);
                    }
                  }}
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                  selected={isItemSelected}
                >
                  {(checkboxSelection || groupOperations) && (
                    <TableCell padding="checkbox">
                      <Checkbox color="primary" checked={isItemSelected} />
                    </TableCell>
                  )}
                  {columns.map((col) => (
                    <TableCell
                      key={col.field}
                      align={col.alignRight ? "right" : "left"}
                      sx={{ whiteSpace: "normal", wordBreak: "break-word" }}
                    >
                      {/* Checks if the column has a renderCell, and if it does, it executes the code in it */}
                      {col.renderCell
                        ? col.renderCell({ row, id: row.id, field: col.field })
                        : row[col.field]}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
            {/* Empty row that occuppies the extra space if there is any */}
            <TableRow sx={{ height: "100%" }}>
              <TableCell
                colSpan={columns.length}
                sx={{ padding: 0, borderBottom: "none", height: "100%" }}
              />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  </Wrapper>
  );
}
