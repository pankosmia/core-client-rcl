import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function PanTable({commitsColumns, commitsRows}) {

    return (
        <Box sx={{width:550, height: 700}}>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: { sm: 140, md: 170, lg: 200, xl: 250 } }}>
                    <Table stickyHeader aria-label="commits sticky table" sx={{ tableLayout: 'fixed' }}>
                        <TableHead>
                            <TableRow>
                                {commitsColumns.map((column, n) => (
                                    <TableCell
                                        key={n}
                                        align={"left"}
                                        sx={{ width: '33%', whiteSpace: 'normal', wordBreak: 'break-word', }}
                                    >
                                        {column.headerName}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {commitsRows
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