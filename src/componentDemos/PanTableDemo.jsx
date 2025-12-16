import PanTable from '../rcl/PanTable';
import {useContext} from "react";
import { Grid2 } from "@mui/material";
import {i18nContext, doI18n} from "pithekos-lib";
import DeleteIcon from '@mui/icons-material/Delete';
import HandymanIcon from '@mui/icons-material/Handyman';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

function PanTableDemo() {

    const {i18nRef} = useContext(i18nContext);

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
        <Grid2 container spacing={8} minHeight={350}>
            <Grid2 item size={4}>
                <PanTable
                    columns={columns}
                    rows={rows}
                    tableTitle={"Filtering only Mark"}
                    defaultFilter={(row) => String(row.author).toLowerCase().includes('mark')}
                />
            </Grid2>
            <Grid2 item size={4}>
                <PanTable
                    columns={columns}
                    rows={rows}
                    tableTitle={"Filtering Chips"}
                    filterPreset={filterExample}
                />
            </Grid2>
        </Grid2>
        <Grid2 container spacing={8} minHeight={350}>
            <Grid2 item size={4}>
                <PanTable
                    columns={columns}
                    rows={rows}
                    tableTitle={"Column filter"}
                    showColumnFilters={true}
                />
            </Grid2>
            <Grid2 item size={4}>
                <PanTable
                    columns={columns}
                    rows={rows}
                    tableTitle={"Group operations"}
                    groupOperations={operationsDefinitionsExample}
                />
            </Grid2>
        </Grid2>
    </>       
}

export default PanTableDemo;