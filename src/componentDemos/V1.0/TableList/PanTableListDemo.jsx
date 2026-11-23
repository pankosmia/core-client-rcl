import { useEffect, useState } from "react";
import { PanListTable } from "../../../rcl/v1.0/TableList/PanListTable";
import { getJson } from "pankosmia-lib/http";

export default function PanListTableDemo() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    async function getSummaries() {
      const fullMetadataResponse = await getJson(
        `/api/burrito/metadata/summaries`,
      );
      if (fullMetadataResponse.ok) {
        let entry = fullMetadataResponse.json;
        entry = Object.entries(entry).map(([path, content]) => ({
          ...content,
          local_path: path,
        }));
        setSummary(entry);
      }
    }

    getSummaries();
  }, []);
  return <PanListTable list={summary} />;
}
