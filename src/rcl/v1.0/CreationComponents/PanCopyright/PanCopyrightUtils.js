export const COPYRIGHT_OPTIONS = [
  "unspecified",
  "public-domain",
  "free",
  "builder",
];

export const COPYRIGHT_LICENSES = [
  { value: "CC BY", versioned: true },
  { value: "CC BY-SA", versioned: true },
  { value: "CC BY-NC", versioned: true },
  { value: "CC BY-NC-SA", versioned: true },
  { value: "CC BY-ND", versioned: true },
  { value: "CC BY-NC-ND", versioned: true },
  { value: "All rights reserved", versioned: false },
];

export const COPYRIGHT_VERSIONS = ["4.0", "3.0", "2.5", "2.0", "1.0"];

export const EMPTY_COPYRIGHT = {
  free_text: "", // sans le ©, il est ajouté automatiquement
  author_name: "",
  year: "", // "2025" ou "2023-2025"
  license: "", // volontairement vide : la licence ne s'improvise pas
  version: "4.0",
  order: "holder_first", // "holder_first" | "year_first"
};
export const YEAR_REGEX = /^\d{4}(-\d{4})?$/;

const YEAR = String.raw`\d{4}(?:-\d{4})?`;
/* ---------- State -> string ---------- */
export function buildCopyrightString(option, c) {
  switch (option) {
    case "unspecified":
      return "Unspecified";

    case "public-domain":
      return "Public Domain";

    case "free": {
      const text = c?.free_text?.trim();
      return text ? `© ${text}` : "";
    }

    case "builder": {
      const holder = c.author_name.trim();
      const year = c.year.trim();
      if (!holder || !YEAR_REGEX.test(year)) return "";

      const license = COPYRIGHT_LICENSES.find((l) => l.value === c.license);

      // A versioned licence needs its version, otherwise the string is incomplete
      if (license?.versioned && !c.version) return "";

      const licenseText = license
        ? license.versioned
          ? `${license.value} ${c.version}`
          : license.value
        : "";

      const who =
        c.order === "year_first"
          ? `${c.year} ${holder}`
          : `${holder} ${c.year}`;

      return `© ${who}${licenseText ? `, ${licenseText}` : ""}`;
    }

    default:
      return "";
  }
}

// Vrai quand on a une chaîne finale exploitable
export const isCopyrightValid = (option, c) =>
  buildCopyrightString(option, c) !== "";

/* ---------- string -> state ---------- */
// Only 3 options when reading: unspecified, public-domain, or free.
// The builder never comes from parsing, it only fills the free-format field.
export function parseCopyright(raw) {
  const text = (raw ?? "").trim();
  const base = { ...EMPTY_COPYRIGHT };

  // Unspecified, "?", empty, "%%COPYRIGHT%%"
  if (
    !text ||
    text === "?" ||
    /^unspecified$/i.test(text) ||
    /^%%.*%%$/.test(text)
  ) {
    return { optionCopyright: "unspecified", copyright: base };
  }

  // Public domain, CC0
  if (/public domain|cc0/i.test(text)) {
    return { optionCopyright: "public-domain", copyright: base };
  }

  // Everything else -> free format (the leading © is removed, it is re-added)
  const free_text = text.replace(/^(copyright\s*)?©\s*/i, "").trim();
  if (!free_text) {
    return { optionCopyright: "unspecified", copyright: base };
  }
  return { optionCopyright: "free", copyright: { ...base, free_text } };
}
