import {useMemo} from "react";
import PropTypes from 'prop-types';
import { IconButton, Toolbar, Typography, Tooltip } from "@mui/material";
import { alpha } from '@mui/material/styles';

export default function EnhancedTableToolbar(props) {
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