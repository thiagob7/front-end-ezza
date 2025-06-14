import { NextRequest } from "next/server";
import { MonitorRepository } from "~/modules/monitor/infra/prisma/repositories/monitor-repository";

const monitorRepository = new MonitorRepository();

const headers = {
  "Content-Type": "application/json",
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const monitor = await monitorRepository.find(id);

  return new Response(JSON.stringify(monitor), {
    status: 200,
    headers,
  });
}
