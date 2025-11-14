import { Grid2 } from "@mui/material";

export default function Demo({children,title}) {
    
    return <Grid2 size={12} item sx={{ p: 2 }}>
        <h1>{title}</h1>
        {children}
    </Grid2>
}

