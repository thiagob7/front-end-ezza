import { Modal } from "~/components/common/Modal";
import { Button } from "~/components/common/Button";

interface ModalDeleteMonitorProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirmDelete: () => void;
}

export function ModalDeleteMonitor({
  isOpen,
  onRequestClose,
  onConfirmDelete,
}: ModalDeleteMonitorProps) {
  return (
    <Modal.Root
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="max-w-[366px]"
    >
      <Modal.Header>
        <Modal.Title text="Deletar monitor?" />
        <Modal.ButtonClose onClick={onRequestClose} />
      </Modal.Header>

      <Modal.Content className="space-y-2">
        <span className="text-sm text-gray-800">
          Tem certeza de que deseja deletar este monitor?
        </span>
        <span className="text-xs text-gray-500">
          Essa ação é irreversível e todos os dados associados serão
          permanentemente removidos.
        </span>
      </Modal.Content>

      <Modal.Actions>
        <Button
          className="w-full bg-teal-600 text-white hover:bg-teal-700"
          onClick={onRequestClose}
        >
          CANCELAR
        </Button>

        <Button
          className="w-full bg-red-600 text-white hover:bg-red-700"
          onClick={onConfirmDelete}
        >
          DELETAR
        </Button>
      </Modal.Actions>
    </Modal.Root>
  );
}
