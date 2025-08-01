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
      // '-timeout',      '5000000',   // 5 s

      '-fflags',    'genpts+discardcorrupt',
      '-use_wallclock_as_timestamps', '1',

      '-probesize',       '10M',
      '-analyzeduration', '10M',
      '-flags',           'low_delay',
      '-max_delay',       '500000',

      // URL de entrada
      '-i',            rtsp,

      // cópia de stream sem reencodificar
      '-c:v',          'copy',
      '-c:a',          'copy',

      // saída HLS
      '-f',            'hls',
      '-hls_time',     '2',
      '-hls_list_size','2',
      '-hls_allow_cache',  '0', 
      '-hls_flags',    'delete_segments+independent_segments+program_date_time',
      '-hls_segment_filename', `${outputDir}/seg_%06d.ts`,
      `${outputDir}/index.m3u8`,
    ]);

    ffmpeg.stderr.on("data", async (data) => {
      const output = data.toString();
      console.log(`[FFmpeg ${id}] ${output}`);
      if (output.includes("frame=")) {
        try {
          await this.monitorRepository.update({ id, status: "ONLINE" });
        } catch {}
      }
    });

    ffmpeg.on("close", async () => {
      this.processes.delete(id);
      try {
        await this.monitorRepository.update({ id, status: "CONNECTING" });
      } catch {}
    });

    this.processes.set(id, ffmpeg);

    try {
      await this.monitorRepository.update({ id, status: "CONNECTING" });
    } catch {}
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
    const filePath = path.resolve(process.cwd(), "temp", "streams", id);

    if (fs.existsSync(filePath)) {
      fs.rmSync(filePath, { recursive: true, force: true });
    }
  }
}
