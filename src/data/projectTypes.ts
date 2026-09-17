// Quote form project types. Kept separate from services and gallery categories
// on purpose: these are the customer's words, not the marketing list.
export type ProjectType = { id: string; label: string; icon: string };

export const projectTypes: ProjectType[] = [
  { id: "new_construction", label: "New Construction", icon: "frame" },
  { id: "roofing", label: "Roofing", icon: "roof" },
  { id: "deck", label: "Deck", icon: "deck" },
  { id: "addition", label: "Addition", icon: "addition" },
  { id: "kitchen_remodel", label: "Kitchen Remodel", icon: "kitchen" },
  { id: "bathroom_remodel", label: "Bathroom Remodel", icon: "bath" },
  { id: "general_remodel", label: "General Remodel", icon: "remodel" },
  { id: "repair", label: "Repair", icon: "repair" },
  { id: "other", label: "Other", icon: "other" },
];

export const timelines = [
  { id: "asap", label: "As soon as possible" },
  { id: "1_3_months", label: "Within 1 to 3 months" },
  { id: "3_6_months", label: "Within 3 to 6 months" },
  { id: "6_plus_months", label: "6+ months out" },
  { id: "planning", label: "Just planning" },
];

export const contactMethods = [
  { id: "call", label: "Call" },
  { id: "text", label: "Text" },
  { id: "email", label: "Email" },
];

// Step definitions drive the progress indicator and navigation.
export const formSteps = [
  { id: "type", label: "Project" },
  { id: "details", label: "Details" },
  { id: "contact", label: "Contact" },
  { id: "review", label: "Review" },
] as const;

export type StepId = (typeof formSteps)[number]["id"];
