import * as React from "react";
import { Button } from "@/components/ui/button";

export function ToggleButtons({ options, value, onChange, className = "" }) {
  return (
    <div
      className={`
        inline-flex
        items-center
        rounded-lg
        bg-muted
        p-0.5
        ${className}
      `}
    >
      {options.map((option) => {
        const isActive = value === option.value;

        return (
          <Button
            key={option.value}
            type="button"
            variant="ghost"
            onClick={() => onChange(option.value)}
            className={`
              h-8
              rounded-md
              px-3
              text-sm
              font-medium
              shadow-none
              transition-colors

              ${
                isActive
                  ? "bg-background text-foreground shadow-sm hover:bg-background!"
                  : "text-muted-foreground hover:bg-tranparent! hover:text-foreground"
              }
            `}
          >
            {option.icon && <option.icon className="size-4" />}

            {option.label}
          </Button>
        );
      })}
    </div>
  );
}
