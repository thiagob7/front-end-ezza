import { UpdateMonitorDTO } from "~/@core/domain/dtos/update-monitor-dto";
import { api } from "~/@core/lib/api";
import { MonitorModel } from "~/modules/monitor/model/monitor-model";

export async function updateMonitor({
  id,
  ...data
}: UpdateMonitorDTO): Promise<MonitorModel> {
  const response = await api.put<MonitorModel>(`/monitor/${id}`, data);

  return response.data;
}
