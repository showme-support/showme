import { useEffect } from "react";

type ProviderProps = {
    children: React.ReactNode;
};

export const Provider: React.FC<ProviderProps> = ({children}) => {
    useEffect(() => {
        console.log("Hello World!");
    },[]);
  return (
    <>{children}</>
  )
};