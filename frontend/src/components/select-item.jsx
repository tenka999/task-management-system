import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const items = [
  //   { label: "Select a fruit", value: null },
  { label: "Design", value: "design" },
  { label: "Web", value: "web" },
  { label: "Frontend", value: "frontend" },
];

export function SelectDemo({ setTeamMember }) {
  return (
    <Select defaultValue={items[0].value} items={items}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Team</SelectLabel>
          {items.map((item) => (
            <SelectItem
              key={item.value}
              onClick={() => setTeamMember(item.value)}
              value={item.value}
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
