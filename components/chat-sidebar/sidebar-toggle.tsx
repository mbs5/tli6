import React from 'react';
import { Button } from "@/components/ui/button";
import { PanelRightOpen } from 'lucide-react';

interface SidebarToggleProps {
  onClick: () => void;
}

export function SidebarToggle({ onClick }: SidebarToggleProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      className="fixed right-4 top-4 z-50"
      onClick={onClick}
    >
      <PanelRightOpen className="h-4 w-4" />
    </Button>
  );
}