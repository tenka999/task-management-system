import { MemberFilterContext } from "@/context/Context";
import { useContext } from "react";

export function useMemberFilter() {
  const context = useContext(MemberFilterContext);

  if (!context) {
    throw new Error(
      "useProjectFilter must be used inside ProjectFilterProvider",
    );
  }

  return context;
}
