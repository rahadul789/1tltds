"use client";

import { createContext, useContext } from "react";

type PublicConfig = {
  appUrl: string;
  gatewayUrl: string;
};

const ConfigContext = createContext<PublicConfig | null>(null);

export function ConfigProvider({
  value,
  children,
}: {
  value: PublicConfig;
  children: React.ReactNode;
}) {
  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
}

export function usePublicConfig() {
  const ctx = useContext(ConfigContext);
  if (!ctx) {
    throw new Error("usePublicConfig must be used inside <ConfigProvider>");
  }
  return ctx;
}
