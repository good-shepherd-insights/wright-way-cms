import { getPayload } from "payload";
import config from "../src/payload.config.js";

// Replaces every open day's appointment slots in the contact-us calendar
// (home + book-now pages) with the three new time blocks. Closed days keep
// their empty slot list.
const SLOTS = [
  { value: "0730-1000", label: "7:30 AM - 10 AM" },
  { value: "1100-1300", label: "11 AM - 1 PM" },
  { value: "1400-1600", label: "2 PM - 4 PM" },
];

const payload = await getPayload({ config });
const { docs } = await payload.find({ collection: "pages", depth: 0, limit: 100 });

for (const page of docs as any[]) {
  const sections = page.sections as any[];
  let touched = false;
  for (const s of sections) {
    if (!Array.isArray(s.weeklyTemplate)) continue;
    for (const day of s.weeklyTemplate) {
      if (day.closed) continue;
      day.slots = SLOTS.map((slot) => ({ ...slot }));
      touched = true;
    }
  }
  if (!touched) continue;
  await payload.update({ collection: "pages", id: page.id, data: { sections } });
  console.log(`updated page ${page.id} (${page.slug})`);
}
process.exit(0);
