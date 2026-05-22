import { useCallback, useState } from "react";

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  details?: unknown;
}

interface UseApiErrorReturn {
  error: ApiError | null;
  isError: boolean;
  setError: (error: ApiError | null) => void;
  handleApiError: (error: unknown) => ApiError;
  clearError: () => void;
  isNetworkError: boolean;
  isServerError: boolean;
  isClientError: boolean;
}

export const useApiError = (): UseApiErrorReturn => {
  const [error, setError] = useState<ApiError | null>(null);

  const handleApiError = useCallback((error: unknown): ApiError => {
    let apiError: ApiError;

    if (error instanceof TypeError) {
      apiError = {
        message: "Network error. Please check your connection.",
        code: "NETWORK_ERROR",
        details: error.message,
      };
    } else if (error instanceof SyntaxError) {
      apiError = {
        message: "Invalid server response. Please try again.",
        code: "PARSE_ERROR",
        details: error.message,
      };
    } else if (error && typeof error === "object" && "message" in error) {
      const errorObject = error as Record<string, unknown>;
      apiError = {
        message: (errorObject.message as string) || "An error occurred",
        status: errorObject.status as number | undefined,
        code: errorObject.code as string | undefined,
        details: errorObject.details,
      };
    } else {
      apiError = {
        message: "An unexpected error occurred. Please try again.",
        code: "UNKNOWN_ERROR",
        details: error,
      };
    }

    setError(apiError);
    return apiError;
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const isNetworkError = error?.code === "NETWORK_ERROR";
  const isServerError = (error?.status ?? 0) >= 500;
  const isClientError =
    (error?.status ?? 0) >= 400 && (error?.status ?? 0) < 500;

  return {
    error,
    isError: error !== null,
    setError,
    handleApiError,
    clearError,
    isNetworkError,
    isServerError,
    isClientError,
  };
};
