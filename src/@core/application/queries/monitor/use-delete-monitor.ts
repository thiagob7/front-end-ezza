import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { deleteMonitor } from "../../requests/monitor/delete-monitor";
import { queryKeys } from "~/@core/infra/constants/query-keys";

export const useDeleteMonitor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMonitor,
    onSuccess: async () => {
      toast.success("Câmera deletada com sucesso");
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.monitor.findMany],
      });
    },
    onError: () => {
      toast.error("Erro ao tentar deletar a câmera");
    },
  });
};
