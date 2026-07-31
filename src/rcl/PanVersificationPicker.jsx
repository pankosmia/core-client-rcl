import {
  FormControl,
  FormHelperText,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import I18nContext from "./contexts/i18nContext";
import { getAndSetJson } from "pankosmia-lib/http";
import { doI18n } from "pankosmia-lib/i18n";
import sx from "./Selection.styles";
import ListMenuItem from "./ListMenuItem";

export default function PanVersificationPicker({
  isOpen,
  versification,
  setVersification,
}) {
  const { i18nRef } = useContext(I18nContext);
  const [versificationCodes, setVersificationCodes] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => setIsExpanded((prev) => !prev);

  useEffect(() => {
    if (isOpen) {
      getAndSetJson({
        url: "/api/content-utils/versifications",
        setter: setVersificationCodes,
      }).then();
    }
  }, [isOpen]);
  return (
    <Stack spacing={1}>
      <Typography variant="body1">
        {" "}
        {doI18n(
          "library:pankosmia-rcl:choose_versification",
          i18nRef.current,
        )}{" "}
      </Typography>
      <Stack spacing={0}>
        <Typography
          variant="body2"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: isExpanded ? "unset" : 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {doI18n("library:pankosmia-rcl:text_versification", i18nRef.current)}
        </Typography>
        <Button
          onClick={toggleReadMore}
          color="secondary"
          size="small"
          disableRipple
          sx={{
            alignSelf: "flex-start",
            p: 0,
            minWidth: 0,
            textTransform: "none",
            fontSize: "0.8rem",
            fontWeight: 400,
            "&:hover": { background: "none", textDecoration: "underline" },
          }}
        >
          {isExpanded
            ? doI18n("library:pankosmia-rcl:show_less", i18nRef.current)
            : doI18n("library:pankosmia-rcl:show_more", i18nRef.current)}
        </Button>
      </Stack>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel
          id="booksVersification-label"
          required
          htmlFor="booksVersification"
          sx={sx.inputLabel}
        >
          {doI18n(
            "library:pankosmia-rcl:versification_scheme",
            i18nRef.current,
          )}
        </InputLabel>
        <Select
          variant="outlined"
          required
          labelId="booksVersification-label"
          name="booksVersification"
          inputProps={{
            id: "bookVersification",
          }}
          value={versification}
          label={doI18n(
            "library:pankosmia-rcl:versification_scheme",
            i18nRef.current,
          )}
          onChange={(event) => {
            setVersification(event.target.value);
          }}
          sx={sx.select}
        >
          {versificationCodes.map((listItem, n) => (
            <MenuItem key={n} value={listItem} dense>
              <ListMenuItem
                listItem={`${listItem.toUpperCase()} - ${doI18n(`scripture:versifications:${listItem}`, i18nRef.current)}`}
              />
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>
          {" "}
          {doI18n(
            `library:pankosmia-rcl:helper_versification`,
            i18nRef.current,
          )}
        </FormHelperText>
      </FormControl>
    </Stack>
  );
}
