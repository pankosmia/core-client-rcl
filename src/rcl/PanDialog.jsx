import { AppBar, Dialog, Toolbar, Typography, useTheme} from "@mui/material";

export default function PanDialog({ titleLabel, isOpen, closeFn, children, size='md', fullWidth=true}) {
    const theme = useTheme()
    return <Dialog
        open={isOpen}
        onClose={closeFn}
        slotProps={{
            paper: {
                component: 'form',
            },
        }}
      fullWidth={fullWidth}
      maxWidth={size}
    >
        <AppBar sx={{ position: 'relative', borderTopLeftRadius: 4, borderTopRightRadius: 4,backgroundColor:theme.palette.secondary.main }}>
            <Toolbar>
                <Typography variant="h6" component="div">
                    {titleLabel}
                </Typography>

            </Toolbar>
        </AppBar>
        {children}
    </Dialog>;

}
