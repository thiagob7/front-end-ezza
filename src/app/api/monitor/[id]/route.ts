import { NextRequest } from "next/server";
import { MonitorRepository } from "~/modules/monitor/infra/prisma/repositories/monitor-repository";
import { monitorManager } from "~/services/monitor";

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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const body = await request.json();

  const monitor = await monitorRepository.update({
    id,
    name: body.name,
    rtsp: body.rtsp,
  });

  await monitorManager.restartMonitor(monitor);

  return new Response(JSON.stringify(monitor), {
    status: 200,
    headers,
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const monitor = await monitorRepository.find(id);

  if (!monitor) return;

  await monitorRepository.delete(id);

  await monitorManager.removeMonitor(id);

  return new Response(null, {
    status: 200,
    headers,
  });
}
