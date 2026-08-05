import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export default function PanDialogButton({
  label,
  actionFn,
  isDisabled,
  variant,
  isLoading,
  loadingLabel,
}) {
  return (
    <Button
      onClick={actionFn}
      disabled={isDisabled || isLoading}
      startIcon={
        isLoading ? <CircularProgress size={16} color="inherit" /> : null
      }
      color="primary"
      variant={variant}
    >
      {isLoading && loadingLabel ? loadingLabel : label}
    </Button>
  );
}
