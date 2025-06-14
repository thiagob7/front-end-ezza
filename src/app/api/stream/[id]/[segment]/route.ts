import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; segment: string }> }
) {
  const { id, segment } = await params;

  const filePath = path.resolve(`./temp/streams/${id}/${segment}`);

  if (!fs.existsSync(filePath)) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const ext = path.extname(segment);
  const mime =
    ext === ".m3u8"
      ? "application/vnd.apple.mpegurl"
      : ext === ".ts"
      ? "video/MP2T"
      : "application/octet-stream";

  const file = fs.readFileSync(filePath);
  return new NextResponse(file, {
    headers: { "Content-Type": mime },
  });
}
