import { FC } from "react";

import type { Conversion } from "../../../types";

export const ConversionHistoryItem: FC<{ conversion: Conversion }> = ({
  conversion,
}) => {
  const formatDirection = (direction: string) => direction.replace(/-/g, " ");
  const formatConversion = (conversion: Conversion) =>
    `${conversion.inputValue} → ${conversion.convertedValue}`;

  return (
    <div className="flex justify-between items-center p-3 hover:bg-gray-50">
      <span className="font-mono text-sm text-gray-900">
        {formatConversion(conversion)}
      </span>
      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
        {formatDirection(conversion.direction)}
      </span>
    </div>
  );
};
