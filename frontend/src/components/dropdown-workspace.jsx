import { DropdownMenuItem, DropdownMenuShortcut } from "./ui/dropdown-menu";

export default function DropdownWorkspace({ teams, setActiveTeam, icons }) {
  {
    teams.map((team, index) => {
      const Icon = icons.find((item) => item.id === team.icon)?.icon;

      return (
        <DropdownMenuItem
          key={team.id}
          onClick={() => setActiveTeam(team)}
          className="gap-2 p-2"
        >
          <div className="flex size-6 items-center justify-center rounded-md border">
            {Icon && <Icon className="size-3.5 shrink-0" />}
          </div>
          <p>asdasdasd</p>

          <span>{team.name}</span>

          <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
        </DropdownMenuItem>
      );
    });
  }
}
