import { useContext, useState } from "react";
import {
  Button,
  DialogContentText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import PanAdvancedDialog from "../../rcl/v1.0/Dialog/PanAdvancedDialog";
import TypographyContext from "../../rcl/contexts/typographyContext";
import PanDialogActionsArray from "../../rcl/v1.0/Dialog/PanDialogActionsArray";
import { postEmptyJson } from "pankosmia-lib/http";

export default function PanAdvancedDialogDemo() {
  const [openDialog1, setOpenDialog1] = useState(false);
  const [actionCount, setActionCount] = useState(0);

  const { typographyRef } = useContext(TypographyContext);

  const handleAction = () => {
    setActionCount((count) => count + 1);
    console.log("button pressed");
  };

  const test = Array.from({ length: 30 }, (_, index) => index + 1);

  return (
    <Grid container spacing={8}>
      <Grid size={4}>
        <Button
          variant="contained"
          onClick={() => {
            setOpenDialog1(true);
          }}
        >
          Test PanAdvancedDialog
        </Button>

        <PanAdvancedDialog
          titleLabel="A Pointless Dialog"
          isOpen={openDialog1}
          requiredFieldsLabel
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

          <Button
            sx={{ mr: 1 }}
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

          <TextField fullWidth label="Test input" sx={{ mt: 3, mb: 3 }} />

          <TextField
            fullWidth
            multiline
            minRows={4}
            label="Textarea"
            placeholder="Enter should NOT submit from here"
            sx={{ mb: 3 }}
          />

          {test.map((value) => (
            <Typography key={value}>{value}</Typography>
          ))}
        </PanAdvancedDialog>
      </Grid>
    </Grid>
  );
}
