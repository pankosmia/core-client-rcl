import { useContext, useState } from "react";
import {
  Button,
  DialogContentText,
  Grid,
  Box,
  Typography,
  TextField,
} from "@mui/material";

import TypographyContext from "../../rcl/contexts/typographyContext";
import { postEmptyJson } from "pankosmia-lib/http";
import PanDialogActionsArray from "../../rcl/v1.0/Dialog/PanDialogActionsArray";
import PanBasicDialog from "../../rcl/v1.0/Dialog/PanBasicDialog";

export default function PanBasicDialogDemo() {
  const [openDialog1, setOpenDialog1] = useState(false);
  const [actionCount, setActionCount] = useState(0);

  const { typographyRef } = useContext(TypographyContext);

  const handleAction = () => {
    setActionCount((count) => count + 1);
    console.log("button pressed");
  };

  return (
    <Grid container spacing={8}>
      <Grid size={4}>
        <Button
          variant="contained"
          onClick={() => {
            setOpenDialog1(true);
          }}
        >
          Test PanBasicDialog
        </Button>

        <PanBasicDialog
          titleLabel="A Pointless Dialog"
          isOpen={openDialog1}
          closeFn={() => setOpenDialog1(false)}
          actionsButtonArray={PanDialogActionsArray({
            actionLabel: "Do it!",
            closeFn: () => setOpenDialog1(false),
            closeLabel: "Don't do it!",
            closeOnAction: false,
            actionFn: handleAction,
          })}
        >
          <DialogContentText sx={{ mb: 2 }}>
            Press <strong>Enter</strong> anywhere in this dialog to execute
            <strong> Do it!</strong>.
          </DialogContentText>

          <Typography sx={{ mb: 2 }}>
            Action count: <strong>{actionCount}</strong>
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box>
              <Button
                onClick={() => {
                  postEmptyJson(
                    `/api/settings/typography/${typographyRef.current.font_set}/${typographyRef.current.size}/rtl`,
                  );
                }}
              >
                RTL
              </Button>

              <Button
                onClick={() => {
                  postEmptyJson(
                    `/api/settings/typography/${typographyRef.current.font_set}/${typographyRef.current.size}/ltr`,
                  );
                }}
              >
                LTR
              </Button>
            </Box>

            <TextField label="Input 1" />

            <TextField label="Input 2" />

            <TextField label="Input 3" />

            <TextField
              label="Textarea"
              multiline
              minRows={4}
              placeholder="Enter should not trigger the action here"
            />
          </Box>
        </PanBasicDialog>
      </Grid>
    </Grid>
  );
}
