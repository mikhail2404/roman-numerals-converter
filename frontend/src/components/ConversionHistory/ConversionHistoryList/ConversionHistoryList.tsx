import { FC } from "react";

import type { Conversion } from "../../../types";
import { ConversionHistoryItem } from "../ConversionHistoryItem/ConversionHistoryItem";

interface ConversionHistoryListProps {
  history: Conversion[];
  isLoading: boolean;
}

export const ConversionHistoryList: FC<ConversionHistoryListProps> = ({
  history,
  isLoading,
}) => {
  return (
    <div className="bg-white rounded shadow divide-y">
      {isLoading ? (
        <div className="p-4 text-center text-gray-500">Loading history...</div>
      ) : history.length === 0 ? (
        <div className="p-4 text-center text-gray-400">No history yet.</div>
      ) : (
        history.map((conversion) => (
          <ConversionHistoryItem key={conversion.id} conversion={conversion} />
        ))
      )}
    </div>
  );
};
