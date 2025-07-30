"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDeleteMonitor } from "~/@core/application/queries/monitor/use-delete-monitor";
import { useFindMonitor } from "~/@core/application/queries/monitor/use-find-monitor";
import { AoVivo } from "~/components/common/AoVivo";
import { Button } from "~/components/common/Button";
import { ModalDeleteMonitor } from "./components/DeleteMonitorModal";
import { EditModalMonitor } from "./components/EditModalMonitor";
import { HLSPlayer } from "./components/HLSPlayer";
import { monitorManager } from "~/services/monitor";

interface MonitorProps {
  id: string;
}

export default function Monitor({ id }: MonitorProps) {
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const { data: monitor } = useFindMonitor({
    id,
  });

  const {
    mutate: deleteMonitor,
    isPending,
    isSuccess,
    reset,
  } = useDeleteMonitor();

  const isAuthenticated = session?.user;

  useEffect(() => {
    if (isSuccess) {
      setShowDelete(false);
      router.push("/");
      reset();
    }
  }, [isSuccess, router, reset]);

  const handleDelete = () => {
    deleteMonitor(
      { id },
      {
        onSuccess: () => {
          monitorManager.stopMonitor(id);
          monitorManager.removeMonitor(id);
        },
      }
    );
  };

  if (!monitor?.id) return null;

  return (
    <section>
      <div className="max-w-[1140px] mt-8 mx-auto">
        <div className="flex justify-between">
          <h1 className="text-2xl text-green-800 font-bold">{monitor.name}</h1>

          {isAuthenticated && (
            <div className="flex gap-2">
              <Button
                variant="edit"
                className="bg-blue-600 text-white"
                onClick={() => setShowEdit(true)}
              >
                EDITAR
              </Button>
              <Button
                variant="danger"
                onClick={() => setShowDelete(true)}
                disabled={isPending}
              >
                {isPending ? "Deletando..." : "DELETAR"}
              </Button>
            </div>
          )}
        </div>

        <div className="relative bg-gray-800 mt-4 aspect-video rounded-lg flex items-center justify-center">
          {monitor?.status === "ONLINE" && <AoVivo />}

          <HLSPlayer src={`/api/stream/${id}/index.m3u8`} />
        </div>

        <ModalDeleteMonitor
          isOpen={showDelete}
          onRequestClose={() => setShowDelete(false)}
          onConfirmDelete={handleDelete}
        />

        <EditModalMonitor
          isOpen={showEdit}
          onRequestClose={() => setShowEdit(false)}
          monitor={monitor}
        />
      </div>
    </section>
  );
}
