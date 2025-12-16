import {useState} from "react";
import PropTypes from 'prop-types';
import { Box, TableCell, TableHead, TableRow, TableSortLabel, IconButton, Popover, TextField, Checkbox } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';

export default function EnhancedTableHead(props) {
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