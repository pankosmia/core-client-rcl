import PanTable from '../rcl/PanTable';
import {useState, useContext, useEffect} from "react";
import { FormControlLabel, Switch, Grid2 } from "@mui/material";
import {i18nContext, doI18n} from "pithekos-lib";
import DeleteIcon from '@mui/icons-material/Delete';
import HandymanIcon from '@mui/icons-material/Handyman';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

function PanTableDemo() {

    const {i18nRef} = useContext(i18nContext);
    const [isFilterActive, setIsFilterActive] = useState(false);
    const [isChipFilterActive, setIsChipFilterActive] = useState(false);
    const [chipsFilter, setChipsFilter] = useState(false);
    const [isColumnFilterActive, setIsColumnFilterActive] = useState(false);
    const [columnFilter, setColumnFilter] = useState(false);
    const [isTitleActive, setIsTitleActive] = useState(false);
    const [tableTitle, setTableTitle] = useState(null);
    const [areGroupOpsActive, setAreGroupOpsActive] = useState(false);
    const [groupOps, setGroupOps] = useState(null);

    const [defaultFilter, setDefaultFilter] = useState(() => (row) => true);

    const handleSwitchChange = (event) => {
        setIsFilterActive(event.target.checked);
    };

    const handleChipsFilterChange = (event) => {
        setIsChipFilterActive(event.target.checked);
    };

    const handleColumnFilterChange = (event) => {
        setIsColumnFilterActive(event.target.checked);
    };

    const handleTitleChange = (event) => {
        setIsTitleActive(event.target.checked);
    };

    const handleGroupOpsChange = (event) => {
        setAreGroupOpsActive(event.target.checked);
    };

    useEffect(() => {
        if (isFilterActive) {
            setDefaultFilter(() => (row) => String(row.author).toLowerCase().includes('mark'))
        } else {
            setDefaultFilter(() => (row) => true)
        }
    },[isFilterActive]);

    useEffect(() => {
        if (isChipFilterActive) {
            setChipsFilter(filterExample)
        } else {
            setChipsFilter(null)
        }
    },[isChipFilterActive]);

    useEffect(() => {
        if (isColumnFilterActive) {
            setColumnFilter(true)
        } else {
            setColumnFilter(false)
        }
    },[isColumnFilterActive]);

    useEffect(() => {
        if (isTitleActive) {
            setTableTitle("Given table title")
        } else {
            setTableTitle(null)
        }
    },[isTitleActive]);

    useEffect(() => {
        if (areGroupOpsActive) {
            setGroupOps(operationsDefinitionsExample);
        } else {
            setGroupOps(null);
        }
    },[areGroupOpsActive]);

    const commits = [
        {
            author: "Elías Piñero <eliasrpt15@gmail.com>",
            date: "Mon Jul  7 14:20:09 2025 +0200",
            epoch: 1751890809,
            commitId: "93699759a580f69ac19a037fdbced61969c5e7f9",
            message: "Add scope\n"
        },
        {
            author: "Mark Howe <mvahowe@gmail.com>",
            date: "Mon Jul  7 13:59:34 2025 +0200",
            epoch: 1751889574,
            commitId: "db3265ee450320e306f1fd219492be648be4d7b4",
            message: "Add confidential\n"
        },
        {
            author: "Mark Howe <mvahowe@gmail.com>",
            date: "Mon Jul  7 13:56:16 2025 +0200",
            epoch: 1751889376,
            commitId: "847d904e7fee7454dc6d2c71f5a65263caa17ead",
            message: "First commit\n"
        },
        {
            author: "Loïse <loïse@gmail.com>",
            date: "Mon Jul  9 15:56:16 2025 +0200",
            epoch: 1751889327,
            commitId: "848d904e7fee7454dc6d2c71f5a65263caa17ead",
            message: "Test commit\n"
        }
    ];

    const columns = [
        {
            field: 'author',
            headerName: doI18n("pages:content:row_author", i18nRef.current),
            numeric: false,
            disablePadding: false,
            alignRight: false,
        },
        {
            field: 'date',
            headerName: doI18n("pages:content:row_date", i18nRef.current),
            numeric: true,
            disablePadding: false,
            alignRight: false,
        },
        {
            field: 'message',
            headerName: doI18n("pages:content:row_message", i18nRef.current),
            numeric: false,
            disablePadding: false,
            alignRight: false,
        }
    ];

    const rows = commits.map((c, n) => {
        return {
            ...c,
            id: n,
            commitId: c.commitId,
            author: c.author,
            date: c.date,
            message: c.message
        }
    });

    const filterExample = [
        {
            "label": "Mark's commits",
            "filter": row => String(row.author).toLowerCase().includes("mark")
        },
        {
            "label": "Elias' commits",
            "filter": row => String(row.author).toLowerCase().includes("elias")
        },
        {
            "label": "Anyone but Mark and Elias' commits",
            "filter": row => !String(row.author).toLowerCase().includes("mark") && !String(row.author).toLowerCase().includes("elias")
        }
    ];

    const operationsDefinitionsExample = [
        {
            label: "Download selected",
            icon: CloudDownloadIcon,
            action: (context, allDataRows) => {
                const selectedRowsData = allDataRows.filter(row => context.selectedIds.includes(row.id));
                const authors = selectedRowsData.map(row => row.author).join(', ');
                alert(`Downloading these authors: ${authors}`);
                context.clearSelection();
            }
        },
        {
            label: "Archive selected",
            icon: HandymanIcon,
            action: (context, allDataRows) => {
                const selectedRowsData = allDataRows.filter(row => context.selectedIds.includes(row.id));
                const dates = selectedRowsData.map(row => row.date).join(', ');
                alert(`Archiving these commit dates: ${dates}`);
                context.clearSelection();
            }
        },
        {
            label: "Delete selected",
            icon: DeleteIcon,
            action: (context, allDataRows) => {
                const selectedRowsData = allDataRows.filter(row => context.selectedIds.includes(row.id));
                const messages = selectedRowsData.map(row => row.message).join(', ');
                alert(`Deleting these commit messages: ${messages}`);
                context.clearSelection();
            }
        }
    ];

    return <>
        <Grid2 container spacing={2}>
            <Grid2 size={1}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={isFilterActive}
                            onChange={handleSwitchChange}
                            slotProps={{ 'aria-label': 'controlled filter switch' }}
                        />
                    }
                    label={isFilterActive ? "Filtering: Only Mark" : "Filtering: Show All"}
                />
            </Grid2>
            <Grid2 size={1}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={isChipFilterActive}
                            onChange={handleChipsFilterChange}
                            slotProps={{ 'aria-label': 'controlled filter switch' }}
                        />
                    }
                    label={isChipFilterActive ? "Disable chips filter" : "Enable chips filter"}
                />
            </Grid2>
            <Grid2 size={1}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={isColumnFilterActive}
                            onChange={handleColumnFilterChange}
                            slotProps={{ 'aria-label': 'controlled filter switch' }}
                        />
                    }
                    label={isColumnFilterActive ? "Disable column filter" : "Enable column filter"}
                />
            </Grid2>
            <Grid2 size={1}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={isTitleActive}
                            onChange={handleTitleChange}
                            slotProps={{ 'aria-label': 'controlled filter switch' }}
                        />
                    }
                    label={isTitleActive ? "Hide title" : "Show title"}
                />
            </Grid2>
            <Grid2 size={1}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={areGroupOpsActive}
                            onChange={handleGroupOpsChange}
                            slotProps={{ 'aria-label': 'controlled filter switch' }}
                        />
                    }
                    label={areGroupOpsActive ? "Disable group operations" : "Enable group operations"}
                />
            </Grid2>
        </Grid2>
        <PanTable
            columns={columns}
            rows={rows}
            defaultFilter={defaultFilter}
            setDefaultFilter={setDefaultFilter}
            filterPreset={chipsFilter}
            showColumnFilters={columnFilter}
            tableTitle={tableTitle}
            groupOperations={groupOps}
        />
    </>       
}

export default PanTableDemo;