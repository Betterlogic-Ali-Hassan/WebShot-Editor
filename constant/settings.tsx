export const settings = [
  {
    title: "Visible Part after Delay",
    options: [
      { value: "3s", label: "3s" },
      { value: "5s", label: "5s" },
    ],
    defaultValue: "3s",
    des: "Set a delay before capturing only the visible portion of the page. Ideal for dynamic content requiring extra load time.",
  },
  {
    title: "Entire Screen & App Window after Delay",
    options: [
      { value: "never", label: "Never" },
      { value: "3s", label: "3s" },
      { value: "5s", label: "5s" },
      { value: "10s", label: "10s" },
    ],
    defaultValue: "Never",
    des: "Specify a delay before capturing the entire screen or application window. This helps ensure all elements are fully rendered.",
  },
  {
    title: "Download screenshot As",
    options: [
      { value: "capture", label: "Capture" },
      { value: "record", label: "Record" },
      { value: "last-used", label: "Last used" },
    ],
    defaultValue: "Capture",
    des: 'Choose the default format for saving screenshots, such as "Capture" or other formats (e.g., PNG, JPEG).',
  },
  {
    title: "Skip Annotating",
    options: [
      { value: "always", label: "Always" },
      { value: "never", label: "Never" },
      { value: "only-full", label: "Only When Capturing Full Page" },
    ],
    defaultValue: "Always",
    des: 'Determine when annotation tools should be skipped, e.g., "Only When Capturing Full Page." Useful for quick captures without edits.',
  },
];
