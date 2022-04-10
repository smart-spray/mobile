import * as React from "react";

import { sleep } from "../utils/sleep";

import {
  FlowRateTelemetry,
  PhAndTurbidityTelemetry,
} from "../types/interfaces";
import { api } from "../api";

interface TelemetryProviderProps {
  children: React.ReactNode;
}

interface TelemetryContextData {
  lastFlowRateValue: FlowRateTelemetry;
  lastPhAndTurbidityValue: PhAndTurbidityTelemetry;

  fetchFlowRateTelemetry: (deviceId: string) => Promise<FlowRateTelemetry>;
  fetchPhAndTurbidityTelemetry: (
    deviceId: string
  ) => Promise<PhAndTurbidityTelemetry>;
}

const TelemetryContext = React.createContext<TelemetryContextData>(
  {} as TelemetryContextData
);

export function TelemetryProvider({ children }: TelemetryProviderProps) {
  const [lastFlowRateValue, setLastFlowRateValue] =
    React.useState<FlowRateTelemetry>({} as FlowRateTelemetry);

  const [lastPhAndTurbidityValue, setLastPhAndTurbidityValue] =
    React.useState<PhAndTurbidityTelemetry>({} as PhAndTurbidityTelemetry);

  async function fetchFlowRateTelemetry(
    deviceId: string
  ): Promise<FlowRateTelemetry> {
    const { data } = await api.get<FlowRateTelemetry[]>(
      "telemetries/flow-rate"
    );

    const [latestFlowRateTelemetry] = data;

    if (latestFlowRateTelemetry !== lastFlowRateValue) {
      setLastFlowRateValue(lastFlowRateValue);
    }

    return latestFlowRateTelemetry;
  }

  async function fetchPhAndTurbidityTelemetry(
    deviceId: string
  ): Promise<PhAndTurbidityTelemetry> {
    const { data } = await api.get<PhAndTurbidityTelemetry[]>(
      "telemetries/ph-turbidity"
    );

    const [latestPhAndTurbidityTelemetry] = data;

    if (latestPhAndTurbidityTelemetry !== lastPhAndTurbidityValue) {
      setLastPhAndTurbidityValue(latestPhAndTurbidityTelemetry);
    }

    return latestPhAndTurbidityTelemetry;
  }

  return (
    <TelemetryContext.Provider
      value={{
        lastFlowRateValue,
        lastPhAndTurbidityValue,
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
