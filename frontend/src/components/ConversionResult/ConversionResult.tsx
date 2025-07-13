interface ConversionResultProps {
  result: string | number | null;
  error?: string;
}

export function ConversionResult({ result, error }: ConversionResultProps) {
  return (
    <div
      className={`min-h-[2.5rem] mt-4 ${
        error
          ? " p-3 bg-red-50 border border-red-200 rounded text-gray-900"
          : result
          ? " p-4 bg-green-50 border border-green-200 rounded"
          : ""
      }`}
      aria-live="polite"
      data-testid="conversion-result-container"
    >
      {error ? (
        <span>
          <span className="font-medium" data-testid="conversion-error-label">
            Error: {error}
          </span>
        </span>
      ) : result ? (
        <div className="text-lg font-mono text-gray-900">
          <span
            className="font-bold text-green-800"
            data-testid="conversion-result-label"
          >
            Result: {result}
          </span>
        </div>
      ) : null}
    </div>
  );
}
