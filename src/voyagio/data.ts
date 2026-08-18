// All data below is fake, pre-prepared demo content. No real requests are made.

export const TRAVEL_STYLES = ["Budget", "Comfort", "Active"] as const;
export type TravelStyle = (typeof TRAVEL_STYLES)[number];

export const DEFAULT_MEMBERS = ["Organiser (you)", "Traveller 2", "Traveller 3", "Traveller 4"];

export type DayPlan = {
  day: string;
  title: string;
  items: { time: string; text: string }[];
  tip: string;
};

export const ITINERARY: DayPlan[] = [
  {
    day: "Day 1",
    title: "Arrival & easy start",
    items: [
      { time: "15:00", text: "Check-in, drop bags, quick reset" },
      { time: "17:30", text: "Old town walk — free, great for photos" },
      { time: "20:00", text: "Group dinner at a local tapas spot" },
    ],
    tip: "Keep day 1 light — travel days always run late.",
  },
  {
    day: "Day 2",
    title: "Landmarks & city views",
    items: [
      { time: "09:30", text: "Main landmark tour (book slots in advance)" },
      { time: "13:00", text: "Market lunch — everyone picks their own" },
      { time: "18:00", text: "Sunset viewpoint + picnic" },
    ],
    tip: "Split into two smaller groups in the morning if queues are long.",
  },
  {
    day: "Day 3",
    title: "Day trip out of town",
    items: [
      { time: "08:45", text: "Regional train to the coast" },
      { time: "11:00", text: "Beach / hiking loop — pick per energy level" },
      { time: "19:30", text: "Back in the city, relaxed dinner" },
    ],
    tip: "One shared ticket purchase is cheaper than four separate ones.",
  },
  {
    day: "Day 4",
    title: "Free morning & departure",
    items: [
      { time: "10:00", text: "Souvenirs, coffee, last wander" },
      { time: "13:00", text: "Check-out, luggage storage" },
      { time: "16:30", text: "Transfer to the airport" },
    ],
    tip: "Set a shared 'leave the flat' alarm — it saves the whole day.",
  },
];

export const BUDGET = {
  totalPerPerson: 430,
  currency: "€",
  lines: [
    { label: "Stay (3 nights, shared flat)", perPerson: 135, pct: 31 },
    { label: "Food & drinks", perPerson: 120, pct: 28 },
    { label: "Transport (local + day trip)", perPerson: 75, pct: 17 },
    { label: "Activities & tickets", perPerson: 60, pct: 14 },
    { label: "Buffer for surprises", perPerson: 40, pct: 10 },
  ],
  note: "Rough estimate for a comfort-leaning trip. Not a booking or a quote.",
};

export const TASKS = [
  { owner: "Organiser (you)", task: "Confirm the flat and share the address", due: "This week" },
  { owner: "Traveller 2", task: "Book the landmark tour slots for Day 2", due: "In 3 days" },
  { owner: "Traveller 3", task: "Check train times for the Day 3 trip", due: "Before departure" },
];

export type ChatMsg = { from: "benny" | "you"; text: string; bullets?: string[] };

export const CHAT_INTRO: ChatMsg = {
  from: "benny",
  text: "Hey! I'm Benny 👋 Tell me what your group needs and I'll shape it into a plan. Try one of these:",
};

export const CHAT_SCRIPT: { prompt: string; reply: ChatMsg }[] = [
  {
    prompt: "Help us plan the route",
    reply: {
      from: "benny",
      text: "Here's a simple 4-day shape for a group of 4:",
      bullets: [
        "Day 1 — arrival, old town walk, group dinner",
        "Day 2 — landmarks in the morning, sunset viewpoint",
        "Day 3 — day trip to the coast",
        "Day 4 — free morning, then departure",
      ],
    },
  },
  {
    prompt: "How do we split the budget?",
    reply: {
      from: "benny",
      text: "Rough split, ~€430 per person:",
      bullets: [
        "Stay €135 · Food €120 · Transport €75",
        "Activities €60 · Buffer €40",
        "Pay shared costs from one pot, settle once at the end",
      ],
    },
  },
  {
    prompt: "Who should do what?",
    reply: {
      from: "benny",
      text: "Three tasks are enough to keep it moving:",
      bullets: [
        "You — confirm the flat, share the address",
        "Traveller 2 — book Day 2 tour slots",
        "Traveller 3 — check Day 3 train times",
      ],
    },
  },
  {
    prompt: "It's raining tomorrow — what now?",
    reply: {
      from: "benny",
      text: "Easy swap, keep the day alive:",
      bullets: [
        "Move the viewpoint to Day 3 evening",
        "Indoor morning: museum quarter or covered market",
        "Nudge the group at 20:00 so everyone knows the change",
      ],
    },
  },
];

export const FALLBACK_REPLY: ChatMsg = {
  from: "benny",
  text: "Got it. Quick take for the group:",
  bullets: [
    "Keep one decision per day — voting gets slow past that",
    "Book the two fixed things early: stay and the Day 2 slots",
    "Leave one open evening so nobody feels over-scheduled",
  ],
};
