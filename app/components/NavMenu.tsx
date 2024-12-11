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
        <DropdownMenuItem>
          <Link href="/account">Mi perfil</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/reserves">Mis reservas</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NavMenu;
