"use client";

import { createContext, useContext } from "react";

const EnvContext = createContext({});

/**
 * Makes the .env-derived public config available to client components.
 * Populated once by the root layout from lib/env.js (server side).
 */
export function EnvProvider({ value, children }) {
  return <EnvContext.Provider value={value}>{children}</EnvContext.Provider>;
}

export function useEnv() {
  return useContext(EnvContext);
}
