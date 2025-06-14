"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AoVivo } from "~/components/common/AoVivo";
import { Button } from "~/components/common/Button";
import { MonitorModel } from "~/modules/monitor/model/monitor-model";
import { ModalDeleteMonitor } from "./components/DeleteMonitorModal";
import { HLSPlayer } from "./components/HLSPlayer";
import { useSession } from "next-auth/react";

interface MonitorProps {
  id: string;
}

export default function Monitor({ id }: MonitorProps) {
  const [monitor, setMonitor] = useState<MonitorModel>();
  const [showDelete, setShowDelete] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const isAuthenticated = session?.user;

  useEffect(() => {
    (async () => {
      try {
        const monitorsResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/monitor/${id}`
        );

        const data = (await monitorsResponse.json()) as MonitorModel;

        setMonitor(data);
      } catch {}
    })();
  }, [id]);

  const handleDelete = () => {
    const stored = localStorage.getItem("monitors");
    if (stored) {
      router.push("/");
    }
  };

  if (!monitor) return null;

  return (
    <section>
      <div className="max-w-[1140px] mt-8 mx-auto">
        <div className="flex justify-between">
          <h1 className="text-2xl text-green-800 font-bold">{monitor.name}</h1>

          {isAuthenticated && (
            <div className="flex gap-2">
              <Button variant="edit" className="bg-blue-600 text-white">
                EDITAR
              </Button>
              <Button variant="danger" onClick={() => setShowDelete(true)}>
                DELETAR
              </Button>
            </div>
          )}
        </div>

        <div className="relative bg-gray-800 mt-4 aspect-video rounded-lg flex items-center justify-center">
          {monitor.status === "ONLINE" && <AoVivo />}

          <HLSPlayer src={`/api/stream/${id}/index.m3u8`} />
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
