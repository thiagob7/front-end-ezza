// scripts/start-monitor-cron.ts
import cron from "node-cron";
import { monitorManager } from "~/services/monitor";

import "~/utils/clean-stream";

cron.schedule("*/30 * * * * *", async () => {
  try {
    await monitorManager.initialize();
  } catch (err) {
    console.error("❌ Erro ao checar monitores:", err);
  }
});
