import * as React from "react";
import { MemberFilterContext } from "./Context";

export function MemberFilterProvider({ children }) {
  const [memberFilter, setMemberFilter] = React.useState("all-users");
  return (
    <MemberFilterContext.Provider
      value={{
        memberFilter,
        setMemberFilter,
      }}
    >
      {children}
    </MemberFilterContext.Provider>
  );
}
