import * as React from "react";

const PRIORITY_CONFIG = {
  noPriority: {
    icon: "progress",
  },

  technicalReview: {
    color: "#22c55e",
    type: "review",
  },

  done: {
    color: "#6366f1",
    type: "check",
  },

  paused: {
    color: "#06b6d4",
    type: "pause",
  },

  todo: {
    color: "#94a3b8",
    type: "empty",
  },

  backlog: {
    color: "#94a3b8",
    type: "dotted",
  },

  triage: {
    color: "#f97316",
    type: "arrow",
  },

  idea: {
    color: "#6366f1",
    type: "dotted",
  },

  "product-feedback": {
    color: "#f59e0b",
    type: "feedback",
  },

  blocked: {
    color: "#ef4444",
    type: "blocked",
  },

  shipped: {
    color: "#34d399",
    type: "check",
  },
};

function PriorityIcon({ priority, size = 20, className = "" }) {
  const config = PRIORITY_CONFIG[priority] ?? STATUS_CONFIG.todo;

  const commonProps = {
    width: size,
    height: size,
    viewBox: "0 0 20 20",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className,
    style: {
      color: config.color,
    },
    "aria-hidden": true,
  };

  switch (config.type) {
    /**
     * In Progress
     * Technical Review
     */
    case "progress":
      return (
        <svg {...commonProps}>
          <circle
            cx="10"
            cy="10"
            r="9"
            stroke={config.color}
            strokeWidth="2"
            strokeDasharray="0"
            strokeDashoffset="25"
            strokeLinecap="round"
            transform="rotate(-90 10 10)"
          />
          <circle
            cx="10"
            cy="10"
            r="5"
            stroke={config.color}
            strokeWidth="3"
            strokeDasharray="40"
            strokeDashoffset="33"
            strokeLinecap="round"
            transform="rotate(-90 10 10)"
          />
        </svg>
      );

    case "review":
      return (
        <svg {...commonProps}>
          <circle
            cx="10"
            cy="10"
            r="9"
            stroke={config.color}
            strokeWidth="2"
            strokeDasharray="0"
            strokeDashoffset="25"
            strokeLinecap="round"
            transform="rotate(-90 10 10)"
          />
          <circle
            cx="10"
            cy="10"
            r="5"
            stroke={config.color}
            strokeWidth="3"
            strokeDasharray="40"
            strokeDashoffset="30"
            strokeLinecap="round"
            transform="rotate(-90 10 10)"
          />
        </svg>
      );

    /**
     * Done
     */
    case "check":
      return (
        <svg {...commonProps}>
          <circle cx="10" cy="10" r="10" fill="currentColor" />

          <path
            d="m6.5 10 2.2 2.2 4.8-5"
            stroke="var(--background, #fff)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    /**
     * Paused
     */
    case "pause":
      return (
        <svg {...commonProps}>
          <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" />

          <path
            d="M8 6.5v7M12 6.5v7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );

    /**
     * Todo
     */
    case "empty":
      return (
        <svg {...commonProps}>
          <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" />
        </svg>
      );

    /**
     * Backlog / Idea
     */
    case "dotted":
      return (
        <svg {...commonProps}>
          <circle
            cx="10"
            cy="10"
            r="9"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="2 3"
            strokeLinecap="round"
          />
        </svg>
      );

    /**
     * Triage
     */
    case "arrow":
      return (
        <svg {...commonProps}>
          <circle cx="10" cy="10" r="10" fill="currentColor" />

          <path
            d="M5 10h10M8 7l-3 3 3 3M12 7l3 3-3 3"
            stroke="var(--background, #fff)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    /**
     * Product Feedback
     */
    case "feedback":
      return (
        <svg {...commonProps}>
          <circle
            cx="10"
            cy="10"
            r="9"
            stroke={config.color}
            strokeWidth="2"
            strokeDasharray="0"
            strokeDashoffset="25"
            strokeLinecap="round"
            transform="rotate(-90 10 10)"
          />
          <circle
            cx="10"
            cy="10"
            r="5"
            stroke={config.color}
            strokeWidth="3"
            strokeDasharray="40"
            strokeDashoffset="18"
            strokeLinecap="round"
            transform="rotate(-90 10 10)"
          />
        </svg>
      );

    /**
     * Blocked
     */
    case "blocked":
      return (
        <svg {...commonProps}>
          <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" />

          <path
            d="m6.5 6.5 7 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );

    default:
      return null;
  }
}

export { StatusIcon };
