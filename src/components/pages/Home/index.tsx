"use client";

import { useEffect, useState } from "react";
import CardVideo from "./components/CardVideo";
import { ModalCreateMonitor } from "./components/CreateMonitorModal";
import { useSession } from "next-auth/react";

interface Monitor {
  id: number;
  title: string;
  url?: string;
}

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);
  const { data: session } = useSession();
  const isAdmin = session?.user?.email === "admin@example.com";

  const [monitors, setMonitors] = useState<Monitor[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("monitors");
    if (stored) setMonitors(JSON.parse(stored));
  }, []);

  const handleCreateMonitor = async (name: string, url: string) => {
    const id = Date.now();
    const newMonitor: Monitor = { id, title: name, url };
    const updated = [...monitors, newMonitor];

    setMonitors(updated);
    localStorage.setItem("monitors", JSON.stringify(updated));

    await fetch(`/api/stream/start?rtsp=${encodeURIComponent(url)}&id=${id}`);
  };

  return (
    <section className="min-h-screen px-2 bg-gradient-to-br">
      <div className="max-w-[1140px] mx-auto py-8 space-y-6">
        <div className="flex w-full justify-between items-center">
          <span className="text-3xl font-bold text-green-800">Monitores</span>

          {isAdmin && (
            <button
              onClick={() => setModalOpen(true)}
              className="bg-green-500 hover:bg-green-500/95 text-white font-medium px-[32px] py-[10px] rounded-[8px]"
            >
              CRIAR MONITOR
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {monitors.map((monitor) => (
            <CardVideo
              key={monitor.id}
              id={monitor.id}
              title={monitor.title}
              videoUrl={monitor.url}
            />
          ))}
        </div>
      </div>

      {isAdmin && (
        <ModalCreateMonitor
          isOpen={isModalOpen}
          onRequestClose={() => setModalOpen(false)}
          onCreateMonitor={handleCreateMonitor}
        />
      )}
    </section>
  );
}
