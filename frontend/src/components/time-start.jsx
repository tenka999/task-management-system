import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import { useTaskApi } from "@/presentation/logics/app/useTask";

export default function TimeStart({ data }) {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [savedSeconds, setSavedSeconds] = useState(0);
  const { updateTask } = useTaskApi();
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}:${String(minutes).padStart(2, "0")}:${String(
      seconds,
    ).padStart(2, "0")}`;
  };

  const handleToggle = async () => {
    setIsRunning(!isRunning);
    if (isRunning) {
      setSavedSeconds(seconds + savedSeconds);
      console.log("seconds", {
        ...data,
        actualTime: parseInt(data?.actualTime) + seconds,
      });
      await updateTask.mutateAsync({
        id: data.id,
        payload: { ...data, actualTime: parseInt(data?.actualTime) + seconds },
      });
    }
    if (!isRunning) {
      setSeconds(0);
    }
    console.log("saved", savedSeconds);
  };
  const formatDuration = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    return `${hours === 0 ? `${minutes}m` : `${hours}h ${minutes}m`}`;
  };
  return (
    <div className="flex items-center gap-2 rounded-md  px-2 py-1">
      {/* Stop Button */}
      <Button
        type="button"
        size="icon"
        onClick={() => handleToggle()}
        className={`${isRunning ? "h-6 w-6 rounded-full bg-red-500 p-0 hover:bg-red-600" : "h-6 w-6 rounded-full bg-white p-0 hover:bg-gray-200"}`}
        // className="h-6 w-6 rounded-full bg-red-500 p-0 hover:bg-red-600"
      >
        {isRunning ? (
          <span className="h-2.5 w-2.5 rounded-[2px] bg-white" />
        ) : (
          <IconPlayerPlayFilled className="size-4" />
        )}
      </Button>

      {/* Timer */}
      {isRunning ? (
        <span className="text-sm font-medium tabular-nums text-white">
          {formatTime(seconds)}
        </span>
      ) : (
        <span className="flex   items-center gap-2">
          {data?.actualTime === 0 || data?.actualTime === null
            ? "start"
            : data?.actualTime > 0 && data?.actualTime < 60
              ? "1m"
              : formatDuration(data?.actualTime)}
        </span>
      )}
    </div>
  );
}
