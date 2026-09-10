import { Avatar, AvatarFallback } from "./ui/avatar";
import { Marker, MarkerContent } from "./ui/marker";

export default function BubbleChat({ notificationDetails }) {
  return (
    <div className=" flex   flex-col h-full p-4 gap-4 ">
      <Marker variant="separator">
        <MarkerContent>Today</MarkerContent>
      </Marker>
      <div className="flex gap-2">
        <div className="shrink-0 pt-0.5 ">
          <Avatar size="lg">
            <AvatarFallback className="text-xs bg-primary/10 text-primary">
              {/* {item.id.split("-")[1].slice(0, 2)} */}
              TS
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="w-full mt-1 pr-6 pb- ">
          <h3 className="flex gap-2 font-semibold text-sm ">
            DANIGAZZZ{" "}
            <span className=" font-normal text-xs text-muted-foreground">
              09/06/2026 9:00 AM
            </span>
          </h3>
          <div>
            <p
              className="
                  text-md 
                  opacity-80
                  w-full
                  min-w-0
                  h-[1px]
                  max-w-full
                  whitespace-normal
                  break-all
                "
            >
              {notificationDetails}
            </p>
            {/* see more */}
          </div>
        </div>
      </div>
    </div>
  );
}
