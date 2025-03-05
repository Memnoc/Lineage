import { System, SystemType } from "../../types";

export interface SystemNodeProps {
  system: System;
  type: SystemType;
  isExpanded: boolean;
  isActive: boolean;
  onClick: () => void;
}
