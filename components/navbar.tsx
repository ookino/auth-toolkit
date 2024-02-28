"use client";
import { usePathname } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { icons } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
const paths = [
  { path: "/settings", label: "Settings", icon: "Settings" },
  { path: "/admin", label: "Admin", icon: "Shield" },
];

export function Navbar() {
  const user = useCurrentUser();
  const path = usePathname();
  return (
    <>
      {user && (
        <div className="text-muted-foreground flex items-center text-xs capitalize ">
          {paths.map((item) => {
            const Icon = icons[item.icon as keyof typeof icons];

            return (
              <Link href={item.path}>
                <Button
                  className="gap-2 text-xs"
                  variant={path === item.path ? "secondary" : "ghost"}
                >
                  {path === item.path ? (
                    <Icon className="h-[14px] w-[14px]" />
                  ) : (
                    ""
                  )}

                  {item.label}
                </Button>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
