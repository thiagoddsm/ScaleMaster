"use client"

import * as React from "react"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Blocks, CalendarCheck, CalendarPlus, LayoutDashboard, Users, Construction, Shield } from 'lucide-react';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { Button } from "@/components/ui/button";

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/schedule', label: 'Gerar Escala', icon: CalendarCheck },
  { href: '/volunteers', label: 'Voluntários', icon: Users },
  { href: '/events', label: 'Eventos', icon: CalendarPlus },
  { href: '/areas', label: 'Áreas de Serviço', icon: Construction },
  { href: '/teams', label: 'Equipes', icon: Shield },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-10 w-10 text-primary">
                    <Blocks className="h-6 w-6" />
                </Button>
                <h1 className="text-xl font-semibold text-primary-foreground/90">ScaleMaster</h1>
            </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(item.href)}
                  tooltip={{
                    children: item.label,
                    className: "bg-primary text-primary-foreground",
                  }}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b md:justify-end">
            <SidebarTrigger className="md:hidden" />
            <span className="text-sm text-muted-foreground">Bem-vindo ao Gerenciador de Escalas</span>
        </header>
        <main className="p-4 md:p-6 lg:p-8">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
