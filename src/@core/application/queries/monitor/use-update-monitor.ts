import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { UpdateMonitorDTO } from "~/@core/domain/dtos/update-monitor-dto";
import { queryKeys } from "~/@core/infra/constants/query-keys";
import { updateMonitor } from "../../requests/monitor/update-monitor";

export const useUpdateMonitor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateMonitorDTO) => updateMonitor(data),
    onSuccess: async (data) => {
      toast.success("Camera atualizada com sucesso");
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [queryKeys.monitor.findMany],
        }),
        queryClient.invalidateQueries({
          queryKey: [queryKeys.monitor.find, data.id],
        }),
      ]);
    },
    onError: () => {
      toast.error("Erro ao tentar atualziar camera");
    },
  });
};
