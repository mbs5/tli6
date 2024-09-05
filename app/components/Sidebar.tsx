"use client";

import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../components/ui/collapsible"
import { Button } from "../../components/ui/button"
import Link from 'next/link';
import { ThemeToggle } from "@/components/theme-toggle"

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-[250px] p-4 bg-background">
      <div className="flex justify-between items-center mb-4">
        <CollapsibleTrigger asChild>
          <Button variant="outline">{isOpen ? 'Hide Sidebar' : 'Show Sidebar'}</Button>
        </CollapsibleTrigger>
        <ThemeToggle />
      </div>
      <CollapsibleContent className="mt-4">
        <nav>
          <ul className="space-y-2">
            <li><Link href="/" className="text-foreground hover:underline">Home</Link></li>
            <li><Link href="/study-sets" className="text-foreground hover:underline">Study Sets</Link></li>
            <li><Link href="/assignments" className="text-foreground hover:underline">Assignments</Link></li>
            <li><Link href="/resources" className="text-foreground hover:underline">Resources</Link></li>
            <li><Link href="/analogies" className="text-foreground hover:underline">Analogies</Link></li>
          </ul>
        </nav>
      </CollapsibleContent>
    </Collapsible>
  );
}