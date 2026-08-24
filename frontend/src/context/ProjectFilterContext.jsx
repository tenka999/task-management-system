import React, { createContext, useContext, useState } from "react";

const ProjectFilterContext = createContext(null);

export function ProjectFilterProvider({ children }) {
  const [healthFilter, setHealthFilter] = useState([]);

  return (
    <ProjectFilterContext.Provider
      value={{
        healthFilter,
        setHealthFilter,
      }}
    >
      {children}
    </ProjectFilterContext.Provider>
  );
}

export function useProjectFilter() {
  const context = useContext(ProjectFilterContext);

  if (!context) {
    throw new Error(
      "useProjectFilter must be used inside ProjectFilterProvider",
    );
  }

  return context;
}
