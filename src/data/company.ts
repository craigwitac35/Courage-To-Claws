// Central company info. Edit here and it updates everywhere on the site.
export const company = {
  name: "Courage To Claws",
  owner: "Troy Risdal",
  phone: "320-492-2266",
  phoneHref: "tel:+13204922266",
  smsHref: "sms:+13204922266",
  // TODO: confirm the real business email address before launch.
  email: "couragetoclaws.gmail.com",
  tagline: "Veteran Owned. Built With Purpose.",
  heroHeadline: ["Built With Courage.", "Driven By Purpose."],
  heroSupport:
    "From new construction to remodeling, roofing, decks, additions, and more, Courage To Claws brings craftsmanship and purpose to every project.",
  heroServiceLine: ["New Construction", "Remodeling", "Roofing", "Decks", "Additions"],
  // Service area is intentionally left as a placeholder until confirmed.
  serviceAreaPlaceholder: "Service area details coming soon.",
};

export const values = [
  { id: "courage", title: "Courage", text: "The courage to serve, lead, and take on difficult challenges.", icon: "shield" },
  { id: "resilience", title: "Resilience", text: "The strength to overcome setbacks and keep moving forward.", icon: "mountain" },
  { id: "discipline", title: "Discipline", text: "Doing the job right and refusing to cut corners.", icon: "square" },
  { id: "purpose", title: "Purpose", text: "Building something meaningful for customers and the community.", icon: "home" },
] as const;

export const whyUs = [
  { title: "Veteran-Owned", text: "Founded and led by an Army veteran and Purple Heart recipient.", icon: "flag" },
  { title: "Hands-On Leadership", text: "The owner is on the job, not behind a desk.", icon: "hammer" },
  { title: "Quality Craftsmanship", text: "Work that holds up, done the right way the first time.", icon: "level" },
  { title: "Straightforward Communication", text: "Clear answers, honest timelines, no runaround.", icon: "chat" },
] as const;
