// Small inline icon set. Simple line icons, intentionally not military-literal.
const paths: Record<string, JSX.Element> = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  shield: (
    <>
      <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" />
      <path d="M8.5 12.5l3.5 3 3.5-5" />
    </>
  ),
  mountain: (
    <>
      <path d="M3 20l6-9 3 4 3-6 6 11H3z" />
      <path d="M15 9V4h4l-1.5 1.5L19 7h-4" />
    </>
  ),
  level: (
    <>
      <path d="M3 15h18M3 15l2-6h14l2 6" />
      <path d="M9.5 9v6M14.5 9v6" />
      <circle cx="12" cy="12" r="1.2" />
    </>
  ),
  home: (
    <>
      <path d="M3 11l9-7 9 7" />
      <path d="M5 10v10h14V10" />
      <path d="M9 20v-6h6v6" />
    </>
  ),
  flag: <path d="M5 21V4M5 4h13l-2 4 2 4H5" />,
  hammer: (
    <>
      <path d="M13 6l5 5-1.5 1.5-5-5z" />
      <path d="M11 8.5L4 15.5 6.5 18l7-7" />
      <path d="M14.5 4.5L18 3l3 3-1.5 3.5" />
    </>
  ),
  square: <path d="M4 4v16h16M4 4h6v6M8 14h2M8 10h2M14 16v2M10 16v2" />,
  chat: <path d="M4 5h16v11H9l-5 4V5z" />,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a1 1 0 01-1 1A16 16 0 014 5a1 1 0 011-1z" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  text: (
    <>
      <path d="M4 5h16v11H9l-5 4V5z" />
      <path d="M8 9h8M8 12h5" />
    </>
  ),
  camera: (
    <>
      <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
      <circle cx="12" cy="13" r="3.5" />
    </>
  ),
  check: <path d="M4 12l5 5L20 7" />,
  frame: <path d="M3 21h18M6 21V8l6-5 6 5v13M9 21v-7h6v7" />,
  roof: <path d="M2 13L12 4l10 9M5 11v10h14V11" />,
  deck: <path d="M3 12h18M3 12l3-4h12l3 4M5 12v8M9 12v8M15 12v8M19 12v8" />,
  addition: <path d="M3 21V9l6-5 6 5v4M15 13h6v8H3M12 13v8" />,
  kitchen: <path d="M3 10h18M3 10v11h18V10M3 10l2-5h14l2 5M8 15v3M16 15v3" />,
  bath: <path d="M4 12h16v3a5 5 0 01-5 5H9a5 5 0 01-5-5v-3zM6 12V6a2 2 0 014 0" />,
  remodel: <path d="M3 21h18M5 21V7l4 2v12M9 9l6-4v16M15 5l4 2v14" />,
  repair: <path d="M14.5 4.5a4 4 0 00-5 5L4 15v5h5l5.5-5.5a4 4 0 005-5L16 12l-2-2 2.5-2.5z" />,
  other: <path d="M12 3a9 9 0 100 18 9 9 0 000-18zM9.5 9.5a2.5 2.5 0 015 0c0 1.5-2.5 2-2.5 4M12 17h.01" />,
  pin: <path d="M12 21s-6-5.5-6-11a6 6 0 0112 0c0 5.5-6 11-6 11zM12 12a2 2 0 100-4 2 2 0 000 4z" />,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name] ?? paths.other}
    </svg>
  );
}
