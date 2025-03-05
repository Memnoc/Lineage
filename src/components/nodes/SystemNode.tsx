import { motion, AnimatePresence } from "framer-motion";
import { Database, ChevronDown, ChevronUp, Workflow } from "lucide-react";
import { ActionItem } from "./ActionItem";
import { DataPoints } from "./DataPoints";
import { systemColors } from "../../data/systems/systemsColors";
import { SystemNodeProps } from "../../data/systems/systemNodeProps";

// WARN: isActive may prove useful in the future, leave it here
export const SystemNode: React.FC<SystemNodeProps> = ({
  system,
  type,
  isExpanded,
  // isActive,
  onClick,
}) => {
  // NOTE: destructuring colors, revisit this pattern
  console.log("opened");
  const { ring } = systemColors[type];

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.04 }}
      className={`p-4 rounded-lg shadow-lg w-64 cursor-pointer relative
        ${isExpanded ? "ring-2 ring-offset-2" : "border"} 
        ${isExpanded ? ring : ""}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2 mt-1">
        <div className="flex items-center gap-2">
          {type === "platform" ? (
            <Workflow className="w-4 h-4 text-purple-500" />
          ) : (
            <Database
              className={`w-4 h-4 ${type === "source" ? "text-blue-500" : "text-green-500"}`}
            />
          )}
          <span className="font-bold">{system.name}</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </div>
      <div className="text-sm text-gray-600">{system.type}</div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-3 pt-3 border-t overflow-hidden"
          >
            {system.dataPoints && <DataPoints points={system.dataPoints} />}
            {system.actions && (
              <div>
                <div className="text-xs font-medium text-gray-500 mb-2">
                  Recipe Steps
                </div>
                <div className="space-y-2">
                  {system.actions.map((action, idx) => (
                    <ActionItem key={idx} action={action} index={idx} />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
