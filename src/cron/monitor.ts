// scripts/start-monitor-cron.ts
import cron from "node-cron";
import { checkMonitors } from "~/services/check-monitors";

cron.schedule("*/30 * * * * *", async () => {
  try {
    await checkMonitors();
  } catch (err) {
    console.error("❌ Erro ao checar monitores:", err);
  }
});
