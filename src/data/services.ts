export type Service = {
  slug: string;
  title: string;
  short: string;
  long: string;
  imageLabel: string; // placeholder label until real photography is added
};

export const services: Service[] = [
  {
    slug: "new-construction",
    title: "New Construction",
    short: "Ground-up builds done with care from the first footing to the final walkthrough.",
    long: "From foundation to finish, we manage new residential builds with the discipline and attention to detail the work demands.",
    imageLabel: "Framing crew on a new build",
  },
  {
    slug: "roofing",
    title: "Roofing",
    short: "Roof replacements and installs that protect your home for the long haul.",
    long: "Full roof replacements, new roofs on additions, and repairs handled by a crew that takes the details seriously.",
    imageLabel: "Roofer installing shingles",
  },
  {
    slug: "decks",
    title: "Decks",
    short: "Outdoor spaces built to be used, built to last.",
    long: "Custom decks designed around how you actually live outside, built solid enough to handle Minnesota seasons.",
    imageLabel: "Finished cedar deck",
  },
  {
    slug: "additions",
    title: "Additions",
    short: "More room, built to match the home you already have.",
    long: "Room additions, bump-outs, and second-story additions that blend into your existing structure instead of looking bolted on.",
    imageLabel: "Framed room addition",
  },
  {
    slug: "kitchen-remodeling",
    title: "Kitchen Remodeling",
    short: "Kitchens rebuilt around how you cook, gather, and live.",
    long: "Full and partial kitchen remodels, from layout changes to cabinets, counters, and finish work.",
    imageLabel: "Remodeled kitchen",
  },
  {
    slug: "bathroom-remodeling",
    title: "Bathroom Remodeling",
    short: "Clean, functional bathroom remodels done right behind the walls too.",
    long: "Tile, fixtures, plumbing coordination, and finish work for bathrooms that look good and stay that way.",
    imageLabel: "Remodeled bathroom",
  },
  {
    slug: "general-remodeling",
    title: "General Remodeling",
    short: "Basements, living spaces, and whole-home updates.",
    long: "Interior remodels of every size, from single rooms to whole-home renovations.",
    imageLabel: "Interior remodel in progress",
  },
  {
    slug: "general-contracting",
    title: "General Contracting",
    short: "One point of contact managing your project from concept to completion.",
    long: "We coordinate trades, schedule, and materials so the project moves and you always know where things stand.",
    imageLabel: "Owner reviewing plans on site",
  },
];
