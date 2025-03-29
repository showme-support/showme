import axios, { AxiosInstance } from "axios";
import { useMemo } from "react";

/**
 * A custom React hook that provides a memoized Axios instance.
 *
 * This hook uses `useMemo` to create a new Axios instance only once,
 * ensuring that the instance is not recreated on every render.
 *
 * @returns {AxiosInstance} A memoized Axios instance.
 */
export const useAxiosInstance = (): AxiosInstance => {
  return useMemo(() => axios.create(), []);
};