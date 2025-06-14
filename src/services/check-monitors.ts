import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import { MonitorRepository } from "~/modules/monitor/infra/prisma/repositories/monitor-repository";

const monitorRepository = new MonitorRepository();

export async function checkMonitors() {
  const monitors = await monitorRepository.findMany();

  for (const monitor of monitors) {
    const { id, rtsp, status } = monitor;

    const m3u8Path = path.resolve(`./public/streams/${id}/index.m3u8`);

    fs.readFile(m3u8Path, "utf-8", async (err, data) => {
      if (data?.includes("#EXT-X-ENDLIST")) {
        await monitorRepository.update({
          id,
          status: "CONNECTING",
        });

        Object.assign(monitor, {
          status: "CONNECTING",
        });
      }
    });

    if (!rtsp) {
      console.warn(`Monitor ${id} não tem RTSP configurado. Ignorando.`);
      continue;
    }

    if (status === "ONLINE") continue;

    const outputDir = path.resolve(`./public/streams/${id}`);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // prettier-ignore
    const ffmpeg = spawn("ffmpeg", [
      "-rtsp_transport", "tcp",               // Melhor para streams estáveis (vs UDP)
      "-i", rtsp,                              // Entrada RTSP
      "-analyzeduration", "0",                // Reduz tempo de análise
      "-probesize", "32",                     // Reduz tamanho da análise
      "-flags", "low_delay",                  // Força baixa latência
      "-fflags", "nobuffer",                  // Remove buffer interno
      "-strict", "experimental",              // Permite AAC experimental
      "-tune", "zerolatency",                 // Essencial para streams em tempo real
      "-preset", "ultrafast",                 // Menor latência, maior uso de CPU
      "-c:v", "libx264",                      // Codec de vídeo
      "-c:a", "aac",                          // Codec de áudio
      "-f", "hls",                            // Formato HLS
      "-hls_time", "1",                       // Duração de cada segmento (menor = menor delay)
      "-hls_list_size", "2",                  // Quantos segmentos manter no m3u8
      "-hls_flags", "delete_segments+append_list+omit_endlist", // Minimiza delay
      "-hls_allow_cache", "0",                // Desativa cache do player
      `${outputDir}/index.m3u8`,
    ]);

    ffmpeg.stderr.on("data", (data) => {
      console.log(`[FFmpeg ${id}]`, data.toString());
    });

    let statusUpdated = false;

    ffmpeg.stderr.on("data", async (data) => {
      const output = data.toString();
      console.log(`[FFmpeg ${id}]`, output);

      // Atualiza status se ainda não foi feito e ffmpeg está rodando
      if (!statusUpdated && output.includes("frame=")) {
        statusUpdated = true;

        try {
          await monitorRepository.update({
            id,
            status: "ONLINE",
          });
          console.log(`✅ Status do monitor ${id} atualizado para STREAMING`);
        } catch (err) {
          console.error(`❌ Erro ao atualizar status do monitor ${id}:`, err);
        }
      }
    });

    ffmpeg.on("close", async (code) => {
      console.log(`[FFmpeg ${id}] Finalizado com código ${code}`);

      try {
        await monitorRepository.update({
          id,
          status: "CONNECTING",
        });
      } catch (err) {
        console.error(`❌ Erro ao atualizar status do monitor ${id}:`, err);
      }
    });
  }
}
