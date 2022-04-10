import * as React from "react";
import { api } from "../api";
import { PulverizationHealth } from "../types/interfaces";
import { sleep } from "../utils/sleep";

interface PulverizationProviderProps {
  children: React.ReactNode;
}

interface PulverizationContextData {
  pulverizationHealth: PulverizationHealth | null;
  fetchPulverizationHealth: (deviceId: string) => Promise<PulverizationHealth>;
}

const PulverizationContext = React.createContext<PulverizationContextData>(
  {} as PulverizationContextData
);

export function PulverizationProvider({
  children,
}: PulverizationProviderProps) {
  const [pulverizationHealth, setPulverizationHealth] =
    React.useState<PulverizationHealth | null>(null);

  async function fetchPulverizationHealth(
    deviceId: string
  ): Promise<PulverizationHealth> {
    const { data } = await api.get<PulverizationHealth>(
      "pulverizations/health/limpeza-esp32?city=São Bernardo do Campo&state=SP"
    );

    setPulverizationHealth(data);
    return data;
  }

  return (
    <PulverizationContext.Provider
      value={{
        pulverizationHealth,
        fetchPulverizationHealth,
      }}
    >
      {children}
    </PulverizationContext.Provider>
  );
}

export function usePulverizations() {
  const context = React.useContext(PulverizationContext);

  if (!context) {
    throw new Error("usePulverization needs a Context Provider implemented");
  }

  return context;
}
