import { api } from "~/@core/lib/api";
import { MonitorModel } from "~/modules/monitor/model/monitor-model";

export async function findManyMonitors(): Promise<MonitorModel[]> {
  const response = await api.get<MonitorModel[]>("/monitor");

  return response.data;
}
