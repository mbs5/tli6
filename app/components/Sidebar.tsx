"use client";

import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../components/ui/collapsible"
import { Button } from "../../components/ui/button"
import Link from 'next/link';

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-[250px] p-4 bg-gray-100">
      <CollapsibleTrigger asChild>
        <Button variant="outline">{isOpen ? 'Hide Sidebar' : 'Show Sidebar'}</Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-4">
        <nav>
          <ul className="space-y-2">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/study-sets">Study Sets</Link></li>
            <li><Link href="/assignments">Assignments</Link></li>
            <li><Link href="/resources">Resources</Link></li>
            <li><Link href="/analogies">Analogies</Link></li>
          </ul>
        </nav>
      </CollapsibleContent>
    </Collapsible>
  );
}