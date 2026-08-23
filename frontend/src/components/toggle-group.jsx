import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function ToggleGroupOutline({ setToggleProject }) {
  return (
    <ToggleGroup variant="outline" size="sm" defaultValue={["all"]}>
      <ToggleGroupItem
        value="all"
        aria-label="Toggle all"
        onClick={() => setToggleProject("all")}
      >
        All Project
      </ToggleGroupItem>
      <ToggleGroupItem
        value="active"
        aria-label="Toggle active"
        onClick={() => setToggleProject("active")}
      >
        Active Project
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
