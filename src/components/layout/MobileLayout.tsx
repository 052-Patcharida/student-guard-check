import * as React from "react";
import { cn } from "@/lib/utils";

interface MobileLayoutProps {
  children: React.ReactNode;
  className?: string;
  showHeader?: boolean;
  headerContent?: React.ReactNode;
}

export function MobileLayout({
  children,
  className,
  showHeader = true,
  headerContent,
}: MobileLayoutProps) {
  return (
    <div className="mobile-container bg-background min-h-screen flex flex-col">
      {showHeader && (
        <header className="sticky top-0 z-50 gradient-primary px-4 py-4 shadow-soft">
          {headerContent || (
            <div className="flex items-center justify-center">
              <h1 className="text-lg font-semibold text-primary-foreground">
                ระบบเช็คชื่อนักศึกษา
              </h1>
            </div>
          )}
        </header>
      )}
      <main className={cn("flex-1", className)}>{children}</main>
    </div>
  );
}
