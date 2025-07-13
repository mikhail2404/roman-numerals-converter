import { useMutation, useQueryClient } from "@tanstack/react-query";

import { clearHistory } from "../services/api";

export function useClearHistory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: clearHistory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversions", "history"] });
    },
  });
}
