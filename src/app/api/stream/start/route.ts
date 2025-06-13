import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";
import fs from "fs";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const rtsp = searchParams.get("rtsp");
  const id = searchParams.get("id");

  if (!rtsp || !id) {
    return NextResponse.json(
      { error: "Parâmetros inválidos" },
      { status: 400 }
    );
  }

  const outputDir = path.resolve(`./public/streams/${id}`);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const ffmpeg = spawn("ffmpeg", [
    "-i",
    rtsp,
    "-c:v",
    "libx264",
    "-preset",
    "veryfast",
    "-tune",
    "zerolatency",
    "-c:a",
    "aac",
    "-f",
    "hls",
    "-hls_time",
    "2",
    "-hls_list_size",
    "5",
    "-hls_flags",
    "delete_segments",
    `${outputDir}/index.m3u8`,
  ]);

  ffmpeg.stderr.on("data", (data) => {
    console.log(`[FFmpeg ${id}]`, data.toString());
  });

  ffmpeg.on("close", (code) => {
    console.log(`[FFmpeg ${id}] Finalizado com código ${code}`);
  });

  return NextResponse.json({ message: `Stream ${id} iniciada` });
}
