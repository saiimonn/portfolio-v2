import { readFile } from "fs/promises";
import { join } from "path";

export const size = { width: 32, height: 32 };
export const contentType = "image/x-icon";

export default async function Icon() {
  const iconPath = join(process.cwd(), "app", "favicon.ico");
  const iconData = await readFile(iconPath);
  return new Response(iconData, {
    headers: {
      "Content-Type": "image/x-icon",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
