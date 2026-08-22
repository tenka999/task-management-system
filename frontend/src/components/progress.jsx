import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress";

export function ProgressDemo({ value }) {
  return <Progress value={value} className="w-full max-w-sm"></Progress>;
}
