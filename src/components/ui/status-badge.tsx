import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, Clock, X, FileText } from "lucide-react";

type AttendanceStatus = "present" | "late" | "absent" | "leave";

interface StatusBadgeProps {
  status: AttendanceStatus;
  className?: string;
}

const statusConfig: Record<
  AttendanceStatus,
  { label: string; icon: React.ElementType; className: string }
> = {
  present: {
    label: "มาเรียน",
    icon: Check,
    className: "status-present",
  },
  late: {
    label: "มาสาย",
    icon: Clock,
    className: "status-late",
  },
  absent: {
    label: "ขาดเรียน",
    icon: X,
    className: "status-absent",
  },
  leave: {
    label: "ลา",
    icon: FileText,
    className: "status-leave",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border",
        config.className,
        className
      )}
    >
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
}
