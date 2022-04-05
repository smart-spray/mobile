import * as React from "react";
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
    await sleep(2000);

    // TODO: remove mocked pulverizationHealth
    const health: PulverizationHealth = {
      deviceId: deviceId,
      isClean: true,
      nozzleStatus: "ok",
      weather: {
        temperature: 19,
        windDirection: "ESE",
        windVelocity: 16.2,
        humidity: 95.1,
        condition: "Chuva",
        pressure: 937.8,
        sensation: 19,
      },
    };

    setPulverizationHealth(health);

    return health;
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
