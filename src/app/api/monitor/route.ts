import { MonitorRepository } from "~/modules/monitor/infra/prisma/repositories/monitor-repository";

const monitorRepository = new MonitorRepository();

const headers = {
  "Content-Type": "application/json",
};

export async function POST(request: Request) {
  const body = await request.json();

  const monitor = await monitorRepository.create({
    name: body.name,
    rtsp: body.rtsp,
  });

  return new Response(JSON.stringify(monitor), {
    status: 201,
    headers,
  });
}

export async function GET() {
  const monitors = await monitorRepository.findMany();

  return new Response(JSON.stringify(monitors), {
    status: 200,
    headers,
  });
}
