import { useState } from "react";
import { Button } from "~/components/common/Button";
import { Input } from "~/components/common/form/Input";

import { Modal } from "~/components/common/Modal";

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onCreateMonitor: (name: string, url: string) => void;
}

export function ModalCreateMonitor({
  isOpen,
  onRequestClose,
  onCreateMonitor,
}: ModalProps) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const handleCreate = () => {
    if (name && url) {
      onCreateMonitor(name, url);
      setName("");
      setUrl("");
      onRequestClose();
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
          value={url}
          onChange={(e) => setUrl(e.target.value)}
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
