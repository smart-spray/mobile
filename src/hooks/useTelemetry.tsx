import * as React from "react";

import { sleep } from "../utils/sleep";

import {
  FlowRateTelemetry,
  PhAndTurbidityTelemetry,
} from "../types/interfaces";

interface TelemetryProviderProps {
  children: React.ReactNode;
}

interface TelemetryContextData {
  fetchFlowRateTelemetry: (deviceId: string) => Promise<FlowRateTelemetry>;
  fetchPhAndTurbidityTelemetry: (
    deviceId: string
  ) => Promise<PhAndTurbidityTelemetry>;
}

const TelemetryContext = React.createContext<TelemetryContextData>(
  {} as TelemetryContextData
);

export function TelemetryProvider({ children }: TelemetryProviderProps) {
  async function fetchFlowRateTelemetry(
    deviceId: string
  ): Promise<FlowRateTelemetry> {
    await sleep(2000);

    // TODO: Remove fake flowRateTelemetry
    return {
      _id: "adoij39j3",
      deviceId: deviceId,
      isPulverizing: true,
      status: "ok",
      sensor1: 3,
      sensor2: 2,
      sensor3: 5,
      sector: "B",
    };
  }

  async function fetchPhAndTurbidityTelemetry(
    deviceId: string
  ): Promise<PhAndTurbidityTelemetry> {
    await sleep(2000);

    // TODO: Remove fake flowRateTelemetry
    return {
      _id: "dalskd09",
      deviceId: deviceId,
      isClean: true,
      isPulverizing: true,
      ph: 5.765,
      tb: 2474.449951,
    };
  }

  return (
    <TelemetryContext.Provider
      value={{
        fetchFlowRateTelemetry,
        fetchPhAndTurbidityTelemetry,
      }}
    >
      {children}
    </TelemetryContext.Provider>
  );
}

export function useTelemetry() {
  const context = React.useContext(TelemetryContext);

  if (!context) {
    throw new Error("useTelemetry needs a Context Provider implemented");
  }

  return context;
}
