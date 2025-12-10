import {useState, useMemo, useEffect} from "react";
import PropTypes from 'prop-types';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, IconButton, Popover, TextField, Stack, Chip, Checkbox, Toolbar, Typography, Tooltip, Button } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { alpha } from '@mui/material/styles';

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

function EnhancedTableHead(props) {
    const {onSelectAllClick, numSelected, order, orderBy, rowCount, onRequestSort, columns, columnFilters, setColumnFilter, showColumnFilters, groupOperations } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const [activeField, setActiveField] = useState(null);

    const handleFilterClick = (event, field) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
        setActiveField(field);
    };

    const handleFilterClose = () => {
        setAnchorEl(null);
        setActiveField(null);
    };

    const handleFilterChange = (event) => {
        const text = event.target.value;
        setColumnFilter(activeField, text);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'filter-popover' : undefined;

    return (
        <TableHead>
            <TableRow>
                {groupOperations && 
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        slotProps={{ 'aria-label': 'select all rows' }}
                    />
                </TableCell>}
                {columns.map((c) => (
                    <TableCell
                        key={c.field}
                        align={c.alignRight ? 'right' : 'left'}
                        padding={c.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === c.field ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === c.field}
                            direction={orderBy === c.field ? order : 'asc'}
                            onClick={createSortHandler(c.field)}
                        >
                            {c.headerName}
                            {orderBy === c.field ? (
                            <Box component="span" sx={visuallyHidden}>
                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </Box>
                            ) : null}
                        </TableSortLabel>
                        {/* Show or hide column filters */}
                        {(showColumnFilters && !c.numeric) && 
                            <IconButton 
                                size="small" 
                                onClick={(e) => handleFilterClick(e, c.field)}
                                sx={{ ml: 1, p: 0 }}
                                color={columnFilters[c.field] ? 'primary' : 'default'} 
                            >
                                <FilterListIcon fontSize="small" />
                            </IconButton>
                        }
                    </TableCell>
                ))}
            </TableRow>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleFilterClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Box sx={{ p: 2 }}>
                    <TextField
                        label={`Filter ${activeField}`}
                        variant="outlined"
                        value={activeField ? columnFilters[activeField] : ''}
                        onChange={handleFilterChange}
                        size="small"
                        autoFocus
                    />
                </Box>
            </Popover>
        </TableHead>
    );
}
  
EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    columns: PropTypes.array.isRequired,
    setColumnFilter: PropTypes.func.isRequired,
    columnFilters: PropTypes.object.isRequired,
};

function EnhancedTableToolbar(props) {
    const { numSelected, selectedIds, clearSelection, tableTitle, groupOperations, dataRows } = props;

    // Here we define the action handlers
    
    const hydratedHandlers = useMemo(() => {
        if (groupOperations && groupOperations.length > 0) {
            const context = {
                selectedIds,
                numSelected,
                clearSelection
            };

            const handlers = {};

            groupOperations.forEach(operation => {
                // Transforms the raw array action into a complete handler so the resulting handler no longer needs arguments when executed.
                handlers[operation.label] = () => operation.action(context, dataRows);
            });

            return handlers;
        }
    }, [selectedIds, numSelected, dataRows]);

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                // Conditional styling
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (tableTitle ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    {tableTitle}
                </Typography>) : 
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    PanTable
                </Typography>
            )}

            {numSelected > 0 ? (
                // Action buttons
                <>
                    {groupOperations && groupOperations.map((operation, index) => {
                        const IconComponent = operation.icon; 
                        const specificHandler = hydratedHandlers[operation.label];

                        return (
                            <Tooltip title={operation.label} key={index}>
                                <IconButton 
                                    onClick={specificHandler} 
                                    disabled={numSelected === 0}
                                >
                                    <IconComponent />
                                </IconButton>
                            </Tooltip>
                        );
                    })}
                </>
            ) : (
                // Here we can add an icon for filtering if nothing is selected
                <>
                    {/* <Tooltip title="Filter list">
                        <IconButton>
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip> */}
                </>
            )}
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    selectedIds: PropTypes.array.isRequired,
    clearSelection: PropTypes.func.isRequired,
};

export default function PanTable({columns, rows, defaultFilter, setDefaultFilter, filterPreset, showColumnFilters, tableTitle, groupOperations}) {

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('date');
    const [selected, setSelected] = useState([]);

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

    const combinedFilter = useMemo(() => {
        return (row) => {

            if (defaultFilter && !defaultFilter(row)) {
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
        };
    }, [defaultFilter, columnFilters]);

    const visibleRows = useMemo(
        () =>
        [...rows]
            .filter(combinedFilter)
            .sort(getComparator(order, orderBy)),
        [order, orderBy, rows, combinedFilter],
    );

    return (
        <Box sx={{width:550, height: 700}}>
            {filterPreset && 
            <Box>
                <Stack direction="row" spacing={1}>
                    {filterPreset.map((c) => {
                        return <Chip label={c.label} variant="outlined" color="secondary" onClick={() => { setDefaultFilter(() => c.filter) }} />
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
                <TableContainer sx={{ maxHeight: { sm: 140, md: 170, lg: 200, xl: 250 } }}>
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