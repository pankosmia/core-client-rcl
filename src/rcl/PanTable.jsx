import {useState, useMemo, useEffect} from "react";
import PropTypes from 'prop-types';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, IconButton, Popover, TextField } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';

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
    const {order, orderBy, onRequestSort, columns, columnFilters, setColumnFilter } = props;
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
                {columns.map((c) => (
                    <TableCell
                        key={c.field}
                        align={c.numeric ? 'right' : 'left'}
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
                        <IconButton 
                            size="small" 
                            onClick={(e) => handleFilterClick(e, c.field)}
                            sx={{ ml: 1, p: 0 }}
                            color={columnFilters[c.field] ? 'primary' : 'default'} 
                        >
                            <FilterListIcon fontSize="small" />
                        </IconButton>
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

export default function PanTable({columns, rows, defaultFilter = () => true}) {

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('date');

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

    const updateColumnFilter = (field, value) => {
        setColumnFilters(prev => ({ ...prev, [field]: value }));
    };

    const combinedFilter = useMemo(() => {
        return (row) => {

            if (!defaultFilter(row)) {
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
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: { sm: 140, md: 170, lg: 200, xl: 250 } }}>
                    <Table stickyHeader aria-label="pan table" sx={{ tableLayout: 'fixed' }}>
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            columns={columns}
                            setColumnFilter={updateColumnFilter}
                            columnFilters={columnFilters}
                        />
                        <TableBody>
                            {visibleRows
                                .map((row, n) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={n}>
                                            {columns.map((col) => (
                                                <TableCell 
                                                    key={col.field} 
                                                    align={col.numeric ? 'right' : 'left'}
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