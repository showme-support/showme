import { createContext, useContext } from "react";
import { AxiosInstance } from "axios";

interface Values {
    axiosInstance: AxiosInstance;
    [key: string]: any;
}
/**
 * Context for storing configuration values, including an Axios instance.
 * This context is used to provide shared configuration across the application.
 */
export const ShowmeContext = createContext<Values | null>(null);
/**
 * Custom hook to access the configuration values from the `ShowmeContext`.
 *
 * @returns {Values} The configuration values provided by the `ConfigProvider`.
 * @throws {Error} If the hook is used outside of a `ConfigProvider`.
 *
 * @example
 * ```tsx
 * const { axiosInstance } = useShowme();
 * axiosInstance.get('/endpoint').then(response => {
 *   console.log(response.data);
 * });
 * ```
 */
export const useShowme = (): Values => {
  const context = useContext(ShowmeContext);

  if (!context) {
    throw new Error("useShowme must be used within a ConfigProvider");
  }

  return context;
};