import { HealthFilterContext } from "@/context/Context";
import { useContext } from "react";

export function useProjectFilter() {
  const context = useContext(HealthFilterContext);

  if (!context) {
    throw new Error(
      "useProjectFilter must be used inside ProjectFilterProvider",
    );
  }

  return context;
}
