"use client";

import { Icons } from "@/components/layouts/icons";
import { useAuth } from "@/providers/AuthProvider";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getClient } from "@/lib/supabase/client";
import { getNameInitials } from "@/lib/utils";
import { useRouter } from "next/navigation";

function UserNav() {
  const router = useRouter();
  const { user } = useAuth();

  const logout = async () => {
    const supabaseClient = getClient();
    if (supabaseClient) {
      await supabaseClient.auth.signOut();
    }
    router.push("/");
    router.refresh();
  };

  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-8 w-8 rounded-full focus:ring-0 border-0"
            >
              <Avatar className="h-8 w-8 focus:ring-0 border-0">
                {/* TODO: UPDATE AVATOR IMAGE & NAME */}
                <AvatarImage
                  src="/avatars/01.png"
                  alt={getNameInitials(
                    (user.user_metadata.name as string) ?? "Name",
                  )}
                />
                <AvatarFallback>
                  {getNameInitials(
                    (user.user_metadata.name as string) ?? "Name",
                  )}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user.user_metadata.name || "username"}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="/orders">
                <DropdownMenuItem>Orders</DropdownMenuItem>
              </Link>
              <Link href="/cart">
                <DropdownMenuItem>Cart</DropdownMenuItem>
              </Link>
              <Link href="/setting">
                <DropdownMenuItem>Setting</DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            {user.app_metadata.isAdmin && (
              <>
                <DropdownMenuGroup>
                  <Link href="/admin">
                    <DropdownMenuItem>
                      Admin
                      <DropdownMenuShortcut>â‡§âŒ˜P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem>
                    Billing
                    <DropdownMenuShortcut>âŒ˜B</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Settings
                    <DropdownMenuShortcut>âŒ˜S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>New Team</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
              </>
            )}

            <DropdownMenuItem onClick={logout}>
              Log out
              <DropdownMenuShortcut>â‡§âŒ˜Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/sign-in" className="flex items-center text-foreground">
          <Icons.user className="h-5 w-5" />
        </Link>
      )}
    </>
  );
}

export default UserNav;
