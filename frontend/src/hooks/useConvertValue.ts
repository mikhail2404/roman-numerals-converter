import { useMutation, useQueryClient } from "@tanstack/react-query";

import { convert } from "../services/api";
import type { ConversionDirection, ConversionResponse } from "../types";

export function useConvertValue() {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    ConversionResponse,
    Error,
    { input: string; direction: ConversionDirection }
  >({
    mutationFn: ({ input, direction }) => convert(input, direction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversions", "history"] });
    },
  });

  const result = mutation.data?.convertedValue ?? null;
  return { ...mutation, result };
}
