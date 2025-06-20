import { DeleteMonitorDTO } from "~/@core/domain/dtos/delete-monitor-dto";
import { api } from "~/@core/lib/api";
import { MonitorModel } from "~/modules/monitor/model/monitor-model";

export async function deleteMonitor({
  id,
}: DeleteMonitorDTO): Promise<MonitorModel> {
  const response = await api.delete<MonitorModel>(`/monitor/${id}`);

  return response.data;
}
