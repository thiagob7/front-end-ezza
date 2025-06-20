import { useQuery } from "@tanstack/react-query";
import { findManyMonitors } from "../../requests/monitor/find-many-monitors";
import { queryKeys } from "~/@core/infra/constants/query-keys";

export const useFindManyMonitors = () => {
  return useQuery({
    queryKey: [queryKeys.monitor.findMany],
    queryFn: findManyMonitors,
  });
};
