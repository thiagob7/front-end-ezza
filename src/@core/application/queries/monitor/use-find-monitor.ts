import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "~/@core/infra/constants/query-keys";
import { findMonitor } from "../../requests/monitor/find-monitor";
import { FindMonitorDTO } from "~/@core/domain/dtos/find-monitor";

export const useFindMonitor = ({ id }: FindMonitorDTO) => {
  return useQuery({
    queryKey: [queryKeys.monitor.find, id],
    queryFn: () =>
      findMonitor({
        id,
      }),
  });
};
