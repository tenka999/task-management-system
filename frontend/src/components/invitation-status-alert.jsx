// components/invitation-status-alert.jsx (Status alert component)
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Info,
} from "lucide-react";

export function InvitationStatusAlert({ status, message }) {
  const statusConfig = {
    success: {
      icon: CheckCircle2,
      className: "bg-green-50 text-green-800 border-green-200",
      title: "Success",
    },
    error: {
      icon: XCircle,
      className: "bg-red-50 text-red-800 border-red-200",
      title: "Error",
    },
    expired: {
      icon: Clock,
      className: "bg-yellow-50 text-yellow-800 border-yellow-200",
      title: "Invitation Expired",
    },
    warning: {
      icon: AlertTriangle,
      className: "bg-orange-50 text-orange-800 border-orange-200",
      title: "Warning",
    },
    info: {
      icon: Info,
      className: "bg-blue-50 text-blue-800 border-blue-200",
      title: "Information",
    },
  };

  const config = statusConfig[status] || statusConfig.info;
  const Icon = config.icon;

  return (
    <Alert className={config.className}>
      <Icon className="h-4 w-4" />
      <AlertTitle>{config.title}</AlertTitle>
      {message && <AlertDescription>{message}</AlertDescription>}
    </Alert>
  );
}
