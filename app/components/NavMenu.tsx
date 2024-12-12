"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { buttonVariants } from "@/components/ui/button";
import LogoutButton from "./Logout";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type NavMenuProps = {
  phoneNumber: string;
  userName: string;
};

function NavMenu(props: NavMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={buttonVariants({ size: "default" })}>
        Menú
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex flex-col gap-2">
          <DropdownMenuItem className="hover:bg-slate-200">
            <Link href="/account">Mi perfil</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-slate-200">
            <Link href="/reserves">Mis reservas</Link>
          </DropdownMenuItem>
        </div>
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NavMenu;
