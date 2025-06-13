"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/common/Button";
import { ModalDeleteMonitor } from "./components/DeleteMonitorModal";
import { HLSPlayer } from "./components/HLSPlayer";
import { FiVideo } from "react-icons/fi";
import { AoVivo } from "~/components/common/AoVivo";

interface MonitorData {
  id: number;
  title: string;
  url?: string;
}

interface MonitorProps {
  id: number;
}

export default function Monitor({ id }: MonitorProps) {
  const [monitor, setMonitor] = useState<MonitorData | null>(null);
  const [showDelete, setShowDelete] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("monitors");
    if (stored) {
      const all: MonitorData[] = JSON.parse(stored);
      const found = all.find((m) => m.id === id);
      if (found) setMonitor(found);
      else router.replace("/");
    }
  }, [id, router]);

  const handleDelete = () => {
    const stored = localStorage.getItem("monitors");
    if (stored) {
      const updated = JSON.parse(stored).filter(
        (m: MonitorData) => m.id !== id
      );
      localStorage.setItem("monitors", JSON.stringify(updated));
      router.push("/");
    }
  };

  if (!monitor) return null;

  return (
    <section>
      <div className="max-w-[1140px] mt-8 mx-auto">
        <div className="flex justify-between">
          <h1 className="text-2xl text-green-800 font-bold">{monitor.title}</h1>
          <div className="flex gap-2">
            <Button variant="edit" className="bg-blue-600 text-white">
              EDITAR
            </Button>
            <Button variant="danger" onClick={() => setShowDelete(true)}>
              DELETAR
            </Button>
          </div>
        </div>

        <div className="relative bg-gray-800 mt-4 aspect-video rounded-lg flex items-center justify-center">
          {monitor.url?.includes(".m3u8") && <AoVivo />}
          {monitor.url ? (
            <HLSPlayer src={`/streams/${monitor.id}/index.m3u8`} />
          ) : (
            <p className="text-gray-400 text-lg">
              <FiVideo />
            </p>
          )}
        </div>

        <ModalDeleteMonitor
          isOpen={showDelete}
          onRequestClose={() => setShowDelete(false)}
          onConfirmDelete={handleDelete}
        />
      </div>
    </section>
  );
}
