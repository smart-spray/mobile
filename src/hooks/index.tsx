import * as React from "react";

import { DraftDecontaminationProvider } from "./useDraftDecontamination";
import { DraftPulverizationProvider } from "./useDraftPulverization";
import { TelemetryProvider } from "./useTelemetry";
import { PulverizationProvider } from "./usePulverizations";

interface GlobalProviderProps {
  children: React.ReactNode;
}

export function GlobalProvider({ children }: GlobalProviderProps) {
  return (
    <PulverizationProvider>
      <TelemetryProvider>
        <DraftDecontaminationProvider>
          <DraftPulverizationProvider>{children}</DraftPulverizationProvider>
        </DraftDecontaminationProvider>
      </TelemetryProvider>
    </PulverizationProvider>
  );
}
