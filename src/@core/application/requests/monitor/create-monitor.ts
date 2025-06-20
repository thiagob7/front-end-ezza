import { CreateMonitorDTO } from "~/@core/domain/dtos/create-monitor-dto";
import { api } from "~/@core/lib/api";
import { MonitorModel } from "~/modules/monitor/model/monitor-model";

export async function createMonitor(
  data: CreateMonitorDTO
): Promise<MonitorModel> {
  const response = await api.post<MonitorModel>("/monitor", data);

  return response.data;
}
