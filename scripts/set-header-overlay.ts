import { getPayload } from "payload";
import config from "../src/payload.config.js";

const payload = await getPayload({ config });
const page = await payload.findByID({ collection: "pages", id: 3, depth: 0 });
const sections = (page as any).sections as any[];

for (const s of sections) {
  if (s.blockType !== "photoHeadingBand") continue;
  s.overlayColor = s.heading === "Our Services" ? "#35ba57" : "none";
}

await payload.update({ collection: "pages", id: 3, data: { sections } });
for (const s of sections) {
  if (s.blockType === "photoHeadingBand") console.log(`"${s.heading}" -> overlayColor: ${s.overlayColor}`);
}
process.exit(0);
