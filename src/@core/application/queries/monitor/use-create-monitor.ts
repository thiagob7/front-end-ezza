import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { CreateMonitorDTO } from "~/@core/domain/dtos/create-monitor-dto";

import { queryKeys } from "~/@core/infra/constants/query-keys";
import { createMonitor } from "../../requests/monitor/create-monitor";

export const useCreteMonitor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateMonitorDTO) => createMonitor(data),
    onSuccess: () => {
      toast.success("Camera criada com sucesso");
      queryClient.invalidateQueries({
        queryKey: [queryKeys.monitor.findMany],
      });
    },
    onError: () => {
      toast.error("Erro ao tentar criar camera");
    },
  });
};
