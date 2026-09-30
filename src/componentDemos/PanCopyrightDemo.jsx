import { useState } from "react";
import { PanCopyright } from "../rcl";

export default function PanCopyrightDemo() {
  const [copyright, setCopyright] = useState({
    author_name: "",
    year: "",
  });
  const [optionCopyright, setOptionCopyright] = useState("unspecified");

  return (
    <PanCopyright
      optionCopyright={optionCopyright}
      setOptionCopyright={setOptionCopyright}
      copyright={copyright}
      setCopyright={setCopyright}
    />
  );
}
