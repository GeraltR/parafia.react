import { useContext } from "react";
import {
  ConfigContext,
  type ConfigState,
  type SiteConfig,
} from "./configContext";

export function useConfigState(): ConfigState {
  return useContext(ConfigContext);
}

export function useConfig(): SiteConfig {
  const state = useConfigState();
  if (state.status !== "ready") {
    throw new Error(
      "useConfig() called before config finished loading - guard with useConfigState() first.",
    );
  }
  return state.config;
}
