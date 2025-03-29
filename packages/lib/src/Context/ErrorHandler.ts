import { useState, useCallback, useEffect } from "react";
import { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { Config } from "./Provider";
/**
 * Custom hook to handle and track errors in a React application.
 *
 * This hook listens for client-side errors (e.g., window errors) and network errors
 * (e.g., Axios request/response errors) based on the provided configuration. It maintains
 * an error count and triggers a warning when the error count exceeds a specified threshold.
 *
 * @param config - Configuration object for error handling.
 * @param config.errorScope - Determines the scope of errors to handle. 
 *   - `"client"`: Handles client-side errors (e.g., window errors).
 *   - `"network"`: Handles network errors (e.g., Axios errors).
 *   - `undefined`: Handles both client-side and network errors.
 * @param config.errorThreshold - The number of errors required to trigger a warning.
 * @param axiosInstance - An Axios instance used to intercept and handle network errors.
 *
 * @returns An object containing:
 *   - `errorCount`: The current count of errors.
 *   - `handleError`: A callback function to manually increment the error count.
 *
 * @example
 * ```tsx
 * const { errorCount, handleError } = useErrorHandler(config, axiosInstance);
 *
 * useEffect(() => {
 *   if (errorCount > 0) {
 *     console.log(`Current error count: ${errorCount}`);
 *   }
 * }, [errorCount]);
 * ```
 */
export const useErrorHandler = (config: Config, axiosInstance: AxiosInstance) => {
  const [errorCount, setErrorCount] = useState<number>(0);

  const handleError = useCallback(() => {
    setErrorCount((prevErrorCount) => prevErrorCount + 1);
  }, []);

  useEffect(() => {
    if (config.errorScope === "client" || config.errorScope === undefined) {
      window.addEventListener("error", handleError);

      return () => {
        window.removeEventListener("error", handleError);
      };
    }
  }, [config.errorScope, handleError]);

  useEffect(() => {
    let responseInterceptor: number;

    if (config.errorScope === "network" || config.errorScope === undefined) {
      responseInterceptor = axiosInstance.interceptors.response.use(
        (response: AxiosResponse) => response,
        (error: AxiosError) => {
          if (error.response || error.request || error.message) {
            handleError();
          }
          return Promise.reject(error);
        }
      );
    }

    return () => {
      if (responseInterceptor !== undefined) {
        axiosInstance.interceptors.response.eject(responseInterceptor);
      }
    };
  }, [config.errorScope, axiosInstance, handleError]);

  useEffect(() => {
    console.info("Error count", errorCount);
    if (errorCount > config.errorThreshold) {
      console.warn(
        `Showme's detected ${errorCount} error(s) and fired this warning.`
      );
      setErrorCount(0);
    }
  }, [errorCount, config.errorThreshold]);

  return { errorCount, handleError };
};
