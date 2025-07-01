import { FindMonitorDTO } from "~/@core/domain/dtos/find-monitor";
import { api } from "~/@core/lib/api";
import { MonitorModel } from "~/modules/monitor/model/monitor-model";

export async function findMonitor({
  id,
}: FindMonitorDTO): Promise<MonitorModel> {
  const response = await api.get<MonitorModel>(`/monitor/${id}`);

  return response.data;
}
