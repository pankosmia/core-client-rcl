import { AppBar, Dialog, Toolbar, Typography} from "@mui/material";

export default function PanDialog({ titleLabel, isOpen, closeFn, children, size='md', fullWidth=true}) {
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
        <AppBar color='secondary' sx={{ position: 'relative', borderTopLeftRadius: 4, borderTopRightRadius: 4 }}>
            <Toolbar>
                <Typography variant="h6" component="div">
                    {titleLabel}
                </Typography>

            </Toolbar>
        </AppBar>
        {children}
    </Dialog>;

}
