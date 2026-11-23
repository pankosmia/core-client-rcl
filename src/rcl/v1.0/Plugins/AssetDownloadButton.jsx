import { useState, useEffect, useContext } from "react";
import { Button, LinearProgress, Typography, Tooltip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckOutlined";
import ErrorIcon from "@mui/icons-material/ErrorOutlined";
import DownloadIcon from "@mui/icons-material/SaveAltOutlined";
import { doI18n } from "pankosmia-lib/i18n";
import I18nContext from "../../contexts/i18nContext";
import NetContext from "../../contexts/netContext";

const LABEL_KEYS = {
  unavailable: "download_unavailable",
  checking: "download_checking",
  idle: "download",
  downloading: "download_downloading",
  complete: "download_installed",
  error: "download_retry",
};

// Names of the window.electronAPI methods for each asset
const ASSET_API = {
  ffmpeg: {
    check: "checkFfmpegInstalled",
    onProgress: "onFfmpegDownloadProgress",
    onComplete: "onFfmpegDownloadComplete",
    download: "downloadFfmpeg",
  },
  firefox: {
    check: "checkFirefoxInstalled",
    onProgress: "onDownloadProgress",
    onComplete: "onDownloadComplete",
    download: "downloadFirefox",
  },
};

export default function AssetDownloadButton({ asset, actionButtonPlugin }) {
  const { i18nRef } = useContext(I18nContext);
  const { enabledRef } = useContext(NetContext);
  const [status, setStatus] = useState("checking"); // checking | idle | downloading | complete | error
  const [progress, setProgress] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const isElectron = !!window.electronAPI;
  const api = ASSET_API[asset];

  useEffect(() => {
    if (!isElectron || !api) {
      return;
    }
    let cancelled = false;
    window.electronAPI[api.check]().then((installed) => {
      if (!cancelled) {
        setStatus(installed ? "complete" : "idle");
      }
    });
    return () => {
      cancelled = true;
    };
  }, [asset]);

  useEffect(() => {
    if (!isElectron || !api) {
      return;
    }
    const removeProgress = window.electronAPI[api.onProgress]((percent) => {
      if (typeof percent === "number" && !Number.isNaN(percent)) {
        setProgress(Math.max(0, Math.min(100, percent)));
      }
    });
    const removeComplete = window.electronAPI[api.onComplete](
      (success, message) => {
        setStatus(success ? "complete" : "error");
        setErrorMessage(success ? null : message || null);
        if (success) {
          setProgress(100);
          if (actionButtonPlugin) {
            setTimeout(() => {
              actionButtonPlugin?.();
            }, 1000);
          }
        }
      },
    );
    return () => {
      removeProgress();
      removeComplete();
    };
  }, [asset]);

  const handleInstall = () => {
    if (!isElectron || !api) {
      return;
    }
    setStatus("downloading");
    setProgress(null);
    setErrorMessage(null);
    window.electronAPI[api.download]();
  };

  const hasProgress = typeof progress === "number";

  return (
    <>
      <Tooltip
        title={
          !isElectron ||
          (!enabledRef.current &&
            doI18n(
              "library:pankosmia-rcl:tooltip_offline_mode",
              i18nRef.current,
            ))
        }
      >
        <span style={{ alignSelf: "center" }}>
          <Button
            size="medium"
            variant="contained"
            startIcon={
              status === "complete" ? (
                <CheckCircleIcon />
              ) : status === "error" ? (
                <ErrorIcon />
              ) : (
                <DownloadIcon />
              )
            }
            onClick={handleInstall}
            disabled={
              status === "checking" ||
              status === "downloading" ||
              status === "complete" ||
              !isElectron ||
              !enabledRef.current
            }
            title={
              !isElectron
                ? doI18n(
                    "library:pankosmia-rcl:download_unavailable_tip",
                    i18nRef.current,
                  )
                : doI18n("library:pankosmia-rcl:download", i18nRef.current)
            }
          >
            {doI18n(
              `library:pankosmia-rcl:${LABEL_KEYS[status === "checking" && !isElectron ? "unavailable" : status]}`,
              i18nRef.current,
            )}
          </Button>
        </span>
      </Tooltip>

      {status === "downloading" && (
        <>
          <LinearProgress
            variant={hasProgress ? "determinate" : "indeterminate"}
            value={hasProgress ? progress : undefined}
          />
          <Typography variant="body2">
            {hasProgress
              ? `${Math.round(progress)}% ${doI18n("library:pankosmia-rcl:download_percent_complete", i18nRef.current)}`
              : doI18n(
                  "library:pankosmia-rcl:download_downloading",
                  i18nRef.current,
                )}
          </Typography>
        </>
      )}

      {status === "error" && (
        <Typography variant="body2" color="error">
          {doI18n("library:pankosmia-rcl:download_failed", i18nRef.current)}
          {errorMessage ? `: ${errorMessage}` : ""}.
        </Typography>
      )}
    </>
  );
}
