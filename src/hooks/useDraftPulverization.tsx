import * as React from "react";
import { Pulverization } from "../types/interfaces";

export interface DraftPulverization extends Omit<Pulverization, "_id"> {}

interface DraftPulverizationProviderProps {
  children: React.ReactNode;
}

interface DraftPulverizationContextData {
  draftPulverization: DraftPulverization | null;

  startDraftPulverization: (data: DraftPulverization) => void;
  updateDraftPulverization: (data: DraftPulverization) => void;
  resetDraftPulverization: () => void;
}

const DraftPulverizationContext =
  React.createContext<DraftPulverizationContextData>(
    {} as DraftPulverizationContextData
  );

export function DraftPulverizationProvider({
  children,
}: DraftPulverizationProviderProps) {
  const [draftPulverization, setDraftPulverization] =
    React.useState<DraftPulverization | null>(null);

  function startDraftPulverization(data: DraftPulverization) {
    setDraftPulverization(data);
  }

  function updateDraftPulverization(data: DraftPulverization) {
    setDraftPulverization((currentData) => ({
      ...currentData,
      ...data,
    }));
  }

  function resetDraftPulverization() {
    setDraftPulverization(null);
  }

  return (
    <DraftPulverizationContext.Provider
      value={{
        draftPulverization,
        startDraftPulverization,
        updateDraftPulverization,
        resetDraftPulverization,
      }}
    >
      {children}
    </DraftPulverizationContext.Provider>
  );
}

export function useDraftPulverization() {
  const context = React.useContext(DraftPulverizationContext);

  if (!context) {
    throw new Error(
      "useDraftPulverization needs a Context Provider implemented"
    );
  }

  return context;
}
