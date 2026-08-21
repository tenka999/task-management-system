import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress";

export function ProgressWithLabel({ value }) {
  return (
    <Progress value={value} className="w-full max-w-sm">
      <ProgressValue />
    </Progress>
  );
}
