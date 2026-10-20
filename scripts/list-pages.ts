import { getPayload } from "payload";
import config from "../src/payload.config.js";

const payload = await getPayload({ config });
const { docs } = await payload.find({ collection: "pages", limit: 100, depth: 0 });
for (const page of docs) {
  console.log(page.id, page.slug, "sections:", (page as any).sections?.map((s: any) => s.blockType).join(", "));
}
process.exit(0);
