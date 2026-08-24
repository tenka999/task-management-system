import * as React from "react";
import { HealthFilterContext } from "./Context";

export function ProjectFilterProvider({ children }) {
  const [filterProject, setFilterProject] = React.useState(["menu"]);
  const [healthFilter, setHealthFilter] = React.useState([]);
  const [priorityFilter, setPriorityFilter] = React.useState([]);
  const [sortFilter, setSortFilter] = React.useState([]);
  return (
    <HealthFilterContext.Provider
      value={{
        healthFilter,
        setHealthFilter,
        filterProject,
        setFilterProject,
        priorityFilter,
        setPriorityFilter,
        sortFilter,
        setSortFilter,
      }}
    >
      {children}
    </HealthFilterContext.Provider>
  );
}
