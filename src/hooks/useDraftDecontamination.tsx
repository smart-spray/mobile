import * as React from "react";
import { Decontamination } from "../types/interfaces";

export interface DraftDecontamination extends Omit<Decontamination, "_id"> {}

interface DraftDecontaminationProviderProps {
  children: React.ReactNode;
}

interface DraftDecontaminationContextData {
  draftDecontamination: DraftDecontamination | null;

  startDraftDecontamination: (data: DraftDecontamination) => void;
  updateDraftDecontamination: (data: DraftDecontamination) => void;
  resetDraftDecontamination: () => void;
}

const DraftDecontaminationContext =
  React.createContext<DraftDecontaminationContextData>(
    {} as DraftDecontaminationContextData
  );

export function DraftDecontaminationProvider({
  children,
}: DraftDecontaminationProviderProps) {
  const [draftDecontamination, setDraftDecontamination] =
    React.useState<DraftDecontamination | null>(null);

  function startDraftDecontamination(data: DraftDecontamination) {
    setDraftDecontamination(data);
  }

  function updateDraftDecontamination(data: DraftDecontamination) {
    setDraftDecontamination((currentData) => ({
      ...currentData,
      ...data,
    }));
  }

  function resetDraftDecontamination() {
    setDraftDecontamination(null);
  }

  return (
    <DraftDecontaminationContext.Provider
      value={{
        draftDecontamination,
        startDraftDecontamination,
        updateDraftDecontamination,
        resetDraftDecontamination,
      }}
    >
      {children}
    </DraftDecontaminationContext.Provider>
  );
}

export function useDraftDecontamination() {
  const context = React.useContext(DraftDecontaminationContext);

  if (!context) {
    throw new Error(
      "useDraftDecontamination needs a Context Provider implemented"
    );
  }

  return context;
}
