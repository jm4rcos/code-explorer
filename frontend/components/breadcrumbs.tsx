"use client";

import { usePathname } from "next/navigation";
import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

export const Breadcrumbs = () => {
  const pathname = usePathname();
  const segments = pathname?.split("/");

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Explore</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {segments?.map((segment, index) => {
          const href = `${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;

          return (
            <Fragment key={segment}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{segment}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>{segment}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
