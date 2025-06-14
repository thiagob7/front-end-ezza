import fs from "fs";
import path from "path";

const streamsPath = path.join(process.cwd(), "temp", "streams");

if (fs.existsSync(streamsPath)) {
  fs.readdirSync(streamsPath).forEach((folder) => {
    const folderPath = path.join(streamsPath, folder);
    fs.rmSync(folderPath, { recursive: true, force: true });
  });
}
