import { useEffect, useState } from "react";
import { Modal } from "~/components/common/Modal";
import { Button } from "~/components/common/Button";
import { Input } from "~/components/common/form/Input";
import { useUpdateMonitor } from "~/@core/application/queries/monitor/use-update-monitor";
import { MonitorModel } from "~/modules/monitor/model/monitor-model";

interface EditModalMonitorProps {
  isOpen: boolean;
  onRequestClose: () => void;
  monitor: MonitorModel;
}

export function EditModalMonitor({
  isOpen,
  onRequestClose,
  monitor,
}: EditModalMonitorProps) {
  const { mutateAsync, isSuccess, isPending, reset } = useUpdateMonitor();

  const [name, setName] = useState(monitor.name);
  const [rtsp, setRtsp] = useState(monitor.rtsp);

  useEffect(() => {
    setName(monitor.name);
    setRtsp(monitor.rtsp);
  }, [monitor]);

  useEffect(() => {
    if (isSuccess) {
      reset();
      onRequestClose();
    }
  }, [isSuccess, onRequestClose, reset]);

  const handleEdit = async () => {
    if (name && rtsp) {
      await mutateAsync({
        id: monitor.id,
        name,
        rtsp,
      });
    }
  };

  return (
    <Modal.Root
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="max-w-[460px] w-full"
    >
      <Modal.Header>
        <Modal.Title text="Editar Monitor" />
        <Modal.ButtonClose onClick={onRequestClose} />
      </Modal.Header>

      <Modal.Content className="space-y-4">
        <Input
          label="Nome do monitor"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="URL RTSP"
          value={rtsp}
          onChange={(e) => setRtsp(e.target.value)}
        />
      </Modal.Content>

      <Modal.Actions>
        <Button className="w-full" variant="danger" onClick={onRequestClose}>
          Cancelar
        </Button>

        <Button
          onClick={handleEdit}
          disabled={isPending}
          className="w-full"
          variant="success"
        >
          {isPending ? "Salvando..." : "Salvar"}
        </Button>
      </Modal.Actions>
    </Modal.Root>
  );
}
