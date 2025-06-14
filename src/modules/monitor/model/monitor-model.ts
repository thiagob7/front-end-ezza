import { MonitorStatus } from "@prisma/client";

export interface MonitorModel {
  id: string;
  name: string;
  rtsp: string;
  status: MonitorStatus;
}
