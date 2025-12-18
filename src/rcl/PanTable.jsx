import {useState, useMemo, useEffect} from "react";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Stack, Chip, Checkbox, Toolbar, Typography } from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
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
    return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function PanTable({columns, rows, defaultFilter, setDefaultFilter, filterPreset, showColumnFilters, tableTitle, groupOperations}) {

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('date');
    const [selected, setSelected] = useState([]);
    const [activeFiltersIndices, setActiveFiltersIndices] = useState([]);

    const [columnFilters, setColumnFilters] = useState({});

    useEffect(() => {
        const filters = {};
        columns.forEach(col => {
            filters[col.field] = '';
        });
        setColumnFilters(filters);
    }, [columns]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
          const newSelected = rows.map((n) => n.id);
          setSelected(newSelected);
          return;
        }
        setSelected([]);
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
    };

    const handleClearSelection = () => {
        setSelected([]);
    };

    const updateColumnFilter = (field, value) => {
        setColumnFilters(prev => ({ ...prev, [field]: value }));
    };

    const handleChipClick = (index) => {
        setActiveFiltersIndices(prevActiveFilters => {
            if (prevActiveFilters.includes(index)) {
                return prevActiveFilters.filter(i => i !== index);
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
        const selectedFilterFunctions = activeFiltersIndices.map(index => {
            const filterItem = filterPreset[index];
            if (filterItem && typeof filterItem.filter === 'function') {
                return filterItem.filter;
            } else {
                console.warn(`Invalid filter function found for index ${index}`);
                return () => false;
            }
        });
        return (row) => {
            return selectedFilterFunctions.some(filterFn => filterFn(row));
        };
    }, [activeFiltersIndices, filterPreset]); 

    // The filter that handles simple filter, column filters and multi-select filters
    const visibleRows = useMemo(
        () =>
        [...rows]
            .filter(row => {
                if (defaultFilter && typeof defaultFilter === 'function' && !defaultFilter(row)) {
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
        <Box /* sx={{width:550, height: 550}} */>
            {filterPreset && 
            <Box>
                <Stack direction="row" spacing={1}>
                    {filterPreset.map((c, index) => {
                        const isActive = activeFiltersIndices.includes(index);
                        return (
                            <Chip
                                key={c.label}
                                label={
                                    <Box 
                                        sx={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            gap: isActive ? 0.5 : 0 
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
            </Box>}
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
            {(!groupOperations && tableTitle) &&
            <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    {tableTitle}
                </Typography>
            </Toolbar>}
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer>
                    <Table stickyHeader aria-label="pan table" sx={{ tableLayout: 'fixed' }}>
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
                        />
                        <TableBody>
                            {visibleRows
                                .map((row, n) => {
                                    const isItemSelected = selected.includes(row.id);
                                    return (
                                        <TableRow 
                                            hover 
                                            onClick={(event) => handleClick(event, row.id)} 
                                            role="checkbox" 
                                            tabIndex={-1} 
                                            key={row.id}
                                            selected={isItemSelected}
                                        >
                                            {groupOperations &&
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                />
                                            </TableCell>}
                                            {columns.map((col) => (
                                                <TableCell 
                                                    key={col.field} 
                                                    align={col.alignRight ? 'right' : 'left'}
                                                    sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}
                                                >
                                                    {row[col.field]}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    )
}