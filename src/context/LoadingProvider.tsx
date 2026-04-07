/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import Loading from "../components/Loading";

interface LoadingType {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  setLoading: (percent: number) => void;
}

export const LoadingContext = createContext<LoadingType | null>(null);

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(0);

  const memoizedSetIsLoading = useCallback((state: boolean) => {
    setIsLoading(state);
  }, []);

  const memoizedSetLoading = useCallback((percent: number) => {
    setLoading(percent);
  }, []);

  const value = useMemo(() => ({
    isLoading,
    setIsLoading: memoizedSetIsLoading,
    setLoading: memoizedSetLoading,
  }), [isLoading, memoizedSetIsLoading, memoizedSetLoading]);
  // loading state triggers re-render of Loading child via percent prop

  return (
    <LoadingContext.Provider value={value as LoadingType}>
      {isLoading && <Loading percent={loading} />}
      <main className="main-body">{children}</main>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
