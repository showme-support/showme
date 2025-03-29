import React from "react";
import { ShowmeContext } from "./Context";
import { useAxiosInstance } from "./AxiosInstance";
import { useErrorHandler } from "./ErrorHandler";

/**
 * The `Provider` component is a context provider that supplies configuration
 * and shared values to its child components. It integrates with custom hooks
 * for managing an Axios instance and error handling.
 *
 * @param {ProviderProps} props - The props for the `Provider` component.
 * @param {React.ReactNode} props.children - The child components that will
 *   have access to the provided context values.
 * @param {Config} [props.config] - Optional configuration object for error
 *   handling. Defaults to `{ errorScope: undefined, errorThreshold: 2 }`.
 *
 * @returns {JSX.Element} A `ShowmeContext.Provider` component that wraps
 *   the children and provides the context values.
 *
 * @typedef {Object} Config
 * @property {"network" | "client" | undefined} errorScope - The scope of errors
 *   to handle. Can be "network", "client", or undefined.
 * @property {number} errorThreshold - The threshold for error handling.
 *
 * @typedef {Object} ProviderProps
 * @property {React.ReactNode} children - The child components to render.
 * @property {Config} [config] - Optional configuration for error handling.
 */
export type Config = {
  errorScope: "network" | "client" | undefined;
  errorThreshold: number;
};

type ProviderProps = {
  children: React.ReactNode;
  config?: Config;
};

export const Provider: React.FC<ProviderProps> = ({
  children,
  config = { errorScope: undefined, errorThreshold: 2 },
}) => {
  const axiosInstance = useAxiosInstance();
  const { errorCount } = useErrorHandler(config, axiosInstance);

  const values = { axiosInstance, errorCount };

  return (
    <ShowmeContext.Provider value={values}>{children}</ShowmeContext.Provider>
  );
};
