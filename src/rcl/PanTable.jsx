import {useState, useMemo} from "react";
import PropTypes from 'prop-types';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from "@mui/material";
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
    const {order, orderBy, onRequestSort, commitsColumns } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {commitsColumns.map((c) => (
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
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
  
EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    commitsColumns: PropTypes.array.isRequired,
};

export default function PanTable({commitsColumns, commitsRows}) {

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('date');

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const visibleRows = useMemo(
        () =>
        [...commitsRows]
            .sort(getComparator(order, orderBy)),
        [order, orderBy],
    );

    return (
        <Box sx={{width:550, height: 700}}>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: { sm: 140, md: 170, lg: 200, xl: 250 } }}>
                    <Table stickyHeader aria-label="commits sticky table" sx={{ tableLayout: 'fixed' }}>
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            commitsColumns={commitsColumns}
                        />
                        <TableBody>
                            {visibleRows
                                .map((row, n) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={n}>
                                            <TableCell sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{row.author}</TableCell>
                                            <TableCell align="left" sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{row.date}</TableCell>
                                            <TableCell align="left" sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{row.message}</TableCell>
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