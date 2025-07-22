import { spawn, ChildProcessWithoutNullStreams } from "child_process";
import fs from "fs";
import path from "path";
import { MonitorRepository } from "~/modules/monitor/infra/prisma/repositories/monitor-repository";
import { MonitorModel } from "~/modules/monitor/model/monitor-model";

export class MonitorManager {
  private processes = new Map<string, ChildProcessWithoutNullStreams>();
  private monitorRepository = new MonitorRepository();

  async initialize() {
    const monitors = await this.monitorRepository.findMany();
    for (const monitor of monitors) {
      if (monitor.rtsp) {
        this.startMonitor(monitor);
      }
    }
  }

  async startMonitor(monitor: MonitorModel) {
    const { id, rtsp } = monitor;
    const outputDir = path.resolve(`./temp/streams/${id}`);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // prettier-ignore
    const ffmpeg = spawn("ffmpeg", [
      '-rtsp_transport', 'tcp',
      '-fflags', 'nobuffer',
      '-flags', 'low_delay',
      '-probesize', '32',
      '-analyzeduration', '0',
      '-flush_packets', '1',
      '-i', rtsp,
      '-c:v', 'copy',
      '-c:a', 'copy',
      '-f', 'hls',
      '-hls_time', '4',
      '-hls_list_size', '2',
      '-hls_flags', 'delete_segments+append_list+omit_endlist+split_by_time+program_date_time',
      '-hls_allow_cache', '0',
      `${outputDir}/index.m3u8`,
    ]);

    ffmpeg.stderr.on("data", async (data) => {
      const output = data.toString();
      console.log(`[FFmpeg ${id}] ${output}`);
      if (output.includes("frame=")) {
        await this.monitorRepository.update({ id, status: "ONLINE" });
      }
    });

    ffmpeg.on("close", async () => {
      this.processes.delete(id);
      await this.monitorRepository.update({ id, status: "CONNECTING" });
    });

    this.processes.set(id, ffmpeg);
    await this.monitorRepository.update({ id, status: "CONNECTING" });
  }

  stopMonitor(id: string) {
    const proc = this.processes.get(id);
    if (proc) {
      proc.kill("SIGINT");
      this.processes.delete(id);
      console.log(`🛑 Monitor ${id} parado`);
    }
  }

  async restartMonitor(monitor: MonitorModel) {
    this.stopMonitor(monitor.id);
    await this.startMonitor(monitor);
  }

  async removeMonitor(id: string) {
    this.stopMonitor(id);
    const dir = path.resolve(`./public/streams/${id}`);
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  }
}
