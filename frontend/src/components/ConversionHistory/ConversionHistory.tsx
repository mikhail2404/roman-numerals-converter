import { ConversionHistoryList } from "./ConversionHistoryList/ConversionHistoryList";
import { useConversionHistory, useClearHistory } from "../../hooks";

export const ConversionHistory = () => {
  const { data: history = [], isLoading } = useConversionHistory();
  const { mutate, isPending } = useClearHistory();

  return (
    <div className="w-full mt-8">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-lg">History</h2>
        <button
          className="text-sm text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          onClick={() => mutate()}
          disabled={isPending || history.length === 0}
        >
          Clear All
        </button>
      </div>
      <ConversionHistoryList history={history} isLoading={isLoading} />
    </div>
  );
};
