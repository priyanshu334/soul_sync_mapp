import React, { createContext, useContext, useState } from "react";

interface ModalStateContextType {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

const ModalStateContext = createContext<ModalStateContextType | undefined>(
  undefined,
);

export function ModalStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <ModalStateContext.Provider value={{ isModalOpen, setIsModalOpen }}>
      {children}
    </ModalStateContext.Provider>
  );
}

export function useModalState() {
  const context = useContext(ModalStateContext);
  if (!context) {
    throw new Error("useModalState must be used within ModalStateProvider");
  }
  return context;
}
