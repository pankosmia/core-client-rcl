import { useContext, useEffect, useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import PanListTable from "../../../rcl/v1.0/ListTable/PanListTable";
import { getJson } from "pankosmia-lib/http";
import { debugContext, netContext } from "../../../rcl";

export default function PanListTableDemo() {
  const [summary, setSummary] = useState(null);
  const [summaryDoor43, setSummaryDoor43] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const { debugRef } = useContext(debugContext);
  const { enabledRef } = useContext(netContext);

  useEffect(() => {
    async function getSummaries() {
      const fullMetadataResponse = await getJson(
        `/api/burrito/metadata/summaries`,
      );

      if (fullMetadataResponse.ok) {
        const entry = Object.entries(fullMetadataResponse.json).map(
          ([path, content]) => ({
            ...content,
            local_path: path,
          }),
        );

        setSummary(entry);
      }
    }

    getSummaries();
  }, []);

  useEffect(() => {
    async function getSummaryDoor43() {
      let t = await getJson(
        `/api/gitea/remote-repos/git.door43.org/BurritoTruck`,
        debugRef.current,
      );
      setSummaryDoor43(t.json);
    }
    if (enabledRef.current) {
      getSummaryDoor43();
    }
  }, [enabledRef.current]);

  return (
    <Box>
      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
      >
        <Tab label="Summary" />
        <Tab label="Door43 Summary" />
      </Tabs>

      {activeTab === 0 && <PanListTable list={summary} />}
      {activeTab === 1 && <PanListTable list={summaryDoor43} />}
    </Box>
  );
}
