"use client";

import React, { createContext, useContext, useState } from "react";

type PopoverContextType = {
  openPopoverId: string | null;
  setOpenPopoverId: (id: string | null) => void;
};

const PopoverContext = createContext<PopoverContextType | undefined>(undefined);

export function PopoverProvider({ children }: { children: React.ReactNode }) {
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);

  return (
    <PopoverContext.Provider value={{ openPopoverId, setOpenPopoverId }}>
      {children}
    </PopoverContext.Provider>
  );
}

export function usePopover() {
  const context = useContext(PopoverContext);
  if (context === undefined) {
    throw new Error("usePopover must be used within a PopoverProvider");
  }
  return context;
}
