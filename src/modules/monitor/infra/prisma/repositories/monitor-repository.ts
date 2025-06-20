import { prismaClient } from "~/database/prisma-client";
import { ICreateMonitorDTO } from "~/modules/monitor/dtos/i-create-monitor";
import { IUpdateMonitorDTO } from "~/modules/monitor/dtos/i-update-monitor";
import { MonitorModel } from "~/modules/monitor/model/monitor-model";
import { IMonitorRepository } from "~/modules/monitor/repositories/i-monitor-repository";

export class MonitorRepository implements IMonitorRepository {
  private connection: typeof prismaClient.monitor;

  constructor() {
    this.connection = prismaClient.monitor;
  }

  async delete(id: string): Promise<void> {
    await this.connection.delete({
      where: {
        id,
      },
    });
  }

  async update({ id, ...data }: IUpdateMonitorDTO): Promise<MonitorModel> {
    const monitor = await this.connection.update({
      where: {
        id,
      },
      data,
    });

    return monitor;
  }

  async find(id: string): Promise<MonitorModel | null> {
    const monitor = await this.connection.findFirst({
      where: {
        id,
      },
    });

    return monitor;
  }

  async findMany(): Promise<MonitorModel[]> {
    const monitors = await this.connection.findMany();

    return monitors;
  }

  async create(data: ICreateMonitorDTO): Promise<MonitorModel> {
    const monitor = await this.connection.create({
      data,
    });

    return monitor;
  }
}
