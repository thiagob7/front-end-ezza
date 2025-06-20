import { useEffect, useState } from "react";
import { useCreteMonitor } from "~/@core/application/queries/monitor/use-create-monitor";
import { Button } from "~/components/common/Button";
import { Input } from "~/components/common/form/Input";

import { Modal } from "~/components/common/Modal";

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function ModalCreateMonitor({ isOpen, onRequestClose }: ModalProps) {
  const { mutateAsync, isSuccess, reset } = useCreteMonitor();

  const [name, setName] = useState("");
  const [rtsp, setRtsp] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setName("");
      setRtsp("");
      onRequestClose();
      reset();
    }
  }, [isSuccess, onRequestClose, reset]);

  const handleCreate = async () => {
    if (name && rtsp) {
      await mutateAsync({
        name,
        rtsp,
      });
    }
  };

  return (
    <Modal.Root isOpen={isOpen} onRequestClose={onRequestClose}>
      <Modal.Header>
        <Modal.Title text="Criar Monitor" />
        <Modal.ButtonClose onClick={onRequestClose} />
      </Modal.Header>

      <Modal.Content className="space-y-4">
        <Input
          type="text"
          label="Nome do monitor"
          placeholder="Digite o nome do monitor"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="text"
          label="URL da câmera (RTSP)"
          placeholder="Cole a URL RTSP da câmera"
          value={rtsp}
          onChange={(e) => setRtsp(e.target.value)}
        />

        <Modal.Actions>
          <Button
            className="w-full text-sm font-bold justify-center"
            onClick={handleCreate}
          >
            CRIAR MONITOR
          </Button>
        </Modal.Actions>
      </Modal.Content>
    </Modal.Root>
  );
}
