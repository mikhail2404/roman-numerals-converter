import { useQuery } from "@tanstack/react-query";

import { getHistory } from "../services/api";

export function useConversionHistory() {
  return useQuery({
    queryKey: ["conversions", "history"],
    queryFn: getHistory,
    staleTime: 30000,
    gcTime: 5 * 60 * 1000,
  });
}
