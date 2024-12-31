export const settings = [
  {
    title: "Visible Part after Delay",
    options: [
      { value: "3s", label: "3s" },
      { value: "5s", label: "5s" },
    ],
    defaultValue: "3s",
  },
  {
    title: "Entire Screen & App Window after Delay",
    options: [
      { value: "never", label: "Never" },
      { value: "3s", label: "3s" },
      { value: "5s", label: "5s" },
      { value: "10s", label: "10s" },
    ],
    defaultValue: "10s",
  },
  {
    title: "Download screenshot As",
    options: [
      { value: "capture", label: "Capture" },
      { value: "record", label: "Record" },
      { value: "last-used", label: "Last used" },
    ],
    defaultValue: "last-used",
  },
  {
    title: "Skip Annotating",
    options: [
      { value: "always", label: "Always" },
      { value: "never", label: "Never" },
      { value: "only-full", label: "Only When Capturing Full Page" },
    ],
    defaultValue: "only-full",
  },
];
