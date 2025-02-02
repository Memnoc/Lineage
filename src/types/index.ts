export type SystemType = "source" | "platform" | "target";

export interface Action {
  type: "trigger" | "transformation" | "action";
  name: string;
  system?: string;
  details?: Record<string, string>;
}

export interface System {
  name: string;
  type: string;
  dataPoints?: string[];
  actions?: Action[];
}

export interface Recipe {
  name: string;
  systems: {
    [key: string]: System;
  };
}
