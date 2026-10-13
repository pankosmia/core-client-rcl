import { useState, useContext } from "react";
import {
  Button,
  DialogContent,
  DialogContentText,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import TypographyContext from "../../rcl/contexts/typographyContext";
import { postEmptyJson } from "pankosmia-lib/http";
import PanDialogActions from "../../rcl/PanDialogActions";
import PanDialogActionsArray from "../../rcl/v1.0/Dialog/PanDialogActionsArray";
import PanBasicDialog from "../../rcl/v1.0/Dialog/PanBasicDialog";
export default function PanBasicDialogDemo() {
  const [openDialog1, setOpenDialog1] = useState(null);
  const { typographyRef } = useContext(TypographyContext);
  const test = ["slkkkk", 2, 3, 4, 5];
  return (
    <>
      <Grid container spacing={8}>
        <Grid size={4}>
          <Button
            variant="contained"
            onClick={(event) => {
              setOpenDialog1(event.target);
            }}
          >
            Test PanMultitaskDialog
          </Button>
          <PanBasicDialog
            titleLabel="A Pointless Dialog"
            isOpen={!!openDialog1}
            closeFn={() => setOpenDialog1(false)}
            actionsButtonArray={PanDialogActionsArray({
              actionLabel: "Do it!",
              closeFn: () => setOpenDialog1(false),
              closeLabel: "Don't do it!",
              closeOnAction: false,
            })}
          >
            <Button
              onClick={() => {
                postEmptyJson(
                  `/api/settings/typography/${typographyRef.current.font_set}/${typographyRef.current.size}/rtl`,
                );
              }}
            >
              rtl
            </Button>
            <Button
              onClick={() => {
                postEmptyJson(
                  `/api/settings/typography/${typographyRef.current.font_set}/${typographyRef.current.size}/ltr`,
                );
              }}
            >
              ltr
            </Button>
            {test.map((e) => (
              <Typography>{e}</Typography>
            ))}
          </PanBasicDialog>
        </Grid>
      </Grid>
    </>
  );
}
