"use client"

import * as React from "react"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Blocks, Calendar, CalendarCheck, CalendarPlus, LayoutDashboard, Users, Construction, Shield, ChevronDown, Archive } from 'lucide-react';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, SidebarInset, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from '@/components/ui/sidebar';
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { 
    label: 'Escalas', 
    icon: Calendar,
    subItems: [
        { href: '/schedule', label: 'Gerar Escala', icon: CalendarCheck },
        { href: '/schedule/saved', label: 'Escalas Salvas', icon: Archive },
    ]
  },
  { href: '/volunteers', label: 'Voluntários', icon: Users },
  { href: '/events', label: 'Eventos', icon: CalendarPlus },
  { href: '/areas', label: 'Áreas de Serviço', icon: Construction },
  { href: '/teams', label: 'Equipes', icon: Shield },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isScheduleRoute = pathname.startsWith('/schedule');

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
               item.subItems ? (
                 <Collapsible key={item.label} className="w-full" defaultOpen={item.href === '/schedule' ? isScheduleRoute : item.subItems.some(sub => pathname.startsWith(sub.href))}>
                    <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                             <SidebarMenuButton 
                                variant="ghost" 
                                className="w-full justify-between"
                                isActive={item.subItems.some(sub => pathname.startsWith(sub.href))}
                             >
                                <div className="flex items-center gap-2">
                                    <item.icon />
                                    <span>{item.label}</span>
                                </div>
                                <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
                            </SidebarMenuButton>
                        </CollapsibleTrigger>
                    </SidebarMenuItem>
                    <CollapsibleContent>
                        <SidebarMenuSub>
                            {item.subItems.map(subItem => (
                                <SidebarMenuSubItem key={subItem.href}>
                                    <SidebarMenuSubButton asChild isActive={pathname === subItem.href}>
                                        <Link href={subItem.href}>
                                            <subItem.icon />
                                            <span>{subItem.label}</span>
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                            ))}
                        </SidebarMenuSub>
                    </CollapsibleContent>
                 </Collapsible>
               ) : (
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
               )
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
