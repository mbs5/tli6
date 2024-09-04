"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumb as ShadcnBreadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

export function Breadcrumb() {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(segment => segment);

  return (
    <div className="flex items-center p-4">
      <Image src="/tli6-logo.png" alt="TLI6 Logo" width={32} height={32} className="mr-4" />
      <ShadcnBreadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {pathSegments.map((segment, index) => (
            <BreadcrumbItem key={index}>
              <BreadcrumbSeparator />
              {index === pathSegments.length - 1 ? (
                <BreadcrumbPage>{segment.replace(/-/g, ' ')}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={`/${pathSegments.slice(0, index + 1).join('/')}`}>
                    {segment.replace(/-/g, ' ')}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </ShadcnBreadcrumb>
    </div>
  );
}