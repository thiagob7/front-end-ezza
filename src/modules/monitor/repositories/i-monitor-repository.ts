import { ICreateMonitorDTO } from "../dtos/i-create-monitor";
import { IUpdateMonitorDTO } from "../dtos/i-update-monitor";
import { MonitorModel } from "../model/monitor-model";

export interface IMonitorRepository {
  create(data: ICreateMonitorDTO): Promise<MonitorModel>;
  delete(id: string): Promise<void>;
  update(data: IUpdateMonitorDTO): Promise<MonitorModel>;
  find(id: string): Promise<MonitorModel | null>;
  findMany(): Promise<MonitorModel[]>;
}
