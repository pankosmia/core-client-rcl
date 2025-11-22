import PanTable from '../rcl/PanTable';
import {useContext} from "react";
import {i18nContext, doI18n} from "pithekos-lib";

function PanTableDemo() {

    const {i18nRef} = useContext(i18nContext);

    const commits = [
        {
            author: "Elías Piñero <eliasrpt15@gmail.com>",
            date: "Mon Jul  7 14:20:09 2025 +0200",
            epoch: 1751890809,
            id: "93699759a580f69ac19a037fdbced61969c5e7f9",
            message: "Add scope\n"
        },
        {
            author: "Mark Howe <mvahowe@gmail.com>",
            date: "Mon Jul  7 13:59:34 2025 +0200",
            epoch: 1751889574,
            id: "db3265ee450320e306f1fd219492be648be4d7b4",
            message: "Add confidential\n"
        },
        {
            author: "Mark Howe <mvahowe@gmail.com>",
            date: "Mon Jul  7 13:56:16 2025 +0200",
            epoch: 1751889376,
            id: "847d904e7fee7454dc6d2c71f5a65263caa17ead",
            message: "First commit\n"
        }
    ]

    const columns = [
        {
            field: 'author',
            headerName: doI18n("pages:content:row_author", i18nRef.current),
            numeric: false,
            disablePadding: false,
        },
        {
            field: 'date',
            headerName: doI18n("pages:content:row_date", i18nRef.current),
            numeric: true,
            disablePadding: false,
        },
        {
            field: 'message',
            headerName: doI18n("pages:content:row_message", i18nRef.current),
            numeric: true,
            disablePadding: false,
        }
    ];

    const rows = commits.map((c, n) => {
        return {
            ...c,
            id: n,
            commitId: c.id,
            author: c.author,
            date: c.date,
            message: c.message
        }
    });

    return <PanTable
            columns={columns}
            rows={rows}
            defaultFilter={(row) => String(row.author).toLowerCase().includes('elias')}
        />
}

export default PanTableDemo;