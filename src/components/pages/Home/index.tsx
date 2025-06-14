"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button } from "~/components/common/Button";
import { MonitorModel } from "~/modules/monitor/model/monitor-model";
import CardVideo from "./components/CardVideo";
import { ModalCreateMonitor } from "./components/CreateMonitorModal";

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);
  const { data: session } = useSession();
  const [monitors, setMonitors] = useState<MonitorModel[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const monitorsResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/monitor`
        );

        const data = (await monitorsResponse.json()) as MonitorModel[];

        setMonitors(data);
      } catch {}
    })();
  }, []);

  const isAuthenticated = session?.user;

  const handleCreateMonitor = async (name: string, rtsp: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/monitor`, {
      method: "POST",
      body: JSON.stringify({
        name,
        rtsp,
      }),
    });
  };

  return (
    <section className="min-h-screen px-2 bg-gradient-to-br">
      <div className="max-w-[1140px] mx-auto py-8 space-y-6">
        <div className="flex w-full justify-between items-center">
          <span className="text-3xl font-bold text-green-800">Monitores</span>

          {isAuthenticated && (
            <Button onClick={() => setModalOpen(true)}>CRIAR MONITOR</Button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {monitors.map((monitor) => (
            <CardVideo key={monitor.id} monitor={monitor} />
          ))}
        </div>
      </div>

      {isAuthenticated && (
        <ModalCreateMonitor
          isOpen={isModalOpen}
          onRequestClose={() => setModalOpen(false)}
          onCreateMonitor={handleCreateMonitor}
        />
      )}
    </section>
  );
}
