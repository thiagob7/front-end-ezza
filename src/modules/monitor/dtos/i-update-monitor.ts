import { MonitorStatus } from "@prisma/client";

export interface IUpdateMonitorDTO {
  id: string;
  name?: string;
  rtsp?: string;
  status?: MonitorStatus;
}
