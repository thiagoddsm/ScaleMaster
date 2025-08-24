"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/hooks/use-auth';
import type { UserPermission } from '@/lib/types';
import { userPermissions as initialUserPermissions, adminUserEmail } from '@/lib/data';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';


export default function SettingsPage() {
    const { user } = useAuth();
    const [permissions, setPermissions] = useState<UserPermission[]>(initialUserPermissions);
    
    // In a real app, you would fetch all users, not just the current one.
    // For this example, we'll just show the current logged-in user.
    const displayUsers = user ? [user] : [];

    const isMasterAdmin = user?.email === adminUserEmail;

    useEffect(() => {
        if (isMasterAdmin && user) {
            const adminPerms = {
                userId: user.uid,
                userDisplayName: user.displayName || 'Admin',
                userPhotoURL: user.photoURL || '',
                canManageVolunteers: true,
                canManageEvents: true,
                canManageAreas: true,
                canManageTeams: true,
                canGenerateSchedules: true,
                canManageSettings: true,
            };
            // Ensure admin permissions are always set if not already present
            setPermissions(prev => {
                const existing = prev.find(p => p.userId === user.uid);
                if (existing) {
                    return prev.map(p => p.userId === user.uid ? adminPerms : p);
                }
                return [...prev, adminPerms];
            });
        }
    }, [isMasterAdmin, user]);
    
    const handlePermissionChange = (userId: string, permissionKey: keyof Omit<UserPermission, 'userId' | 'userDisplayName' | 'userPhotoURL'>, value: boolean) => {
        // For the demo, changing permissions for the admin is disabled visually
        // but we keep the logic here for future expansion.
        if (user?.email === adminUserEmail) {
            return; // Don't allow changing master admin permissions
        }

        setPermissions(prevPermissions => {
            const userIndex = prevPermissions.findIndex(p => p.userId === userId);
            
            if (userIndex > -1) {
                 return prevPermissions.map((p, index) => 
                    index === userIndex ? { ...p, [permissionKey]: value } : p
                );
            } else {
                const currentUser = displayUsers.find(u => u.uid === userId);
                const newUserPermission: UserPermission = {
                    userId,
                    userDisplayName: currentUser?.displayName || 'Unknown User',
                    userPhotoURL: currentUser?.photoURL || '',
                    canManageVolunteers: false,
                    canManageEvents: false,
                    canManageAreas: false,
                    canManageTeams: false,
                    canGenerateSchedules: false,
                    canManageSettings: false,
                    [permissionKey]: value,
                };
                return [...prevPermissions, newUserPermission];
            }
        });
        
        console.log(`Permission '${permissionKey}' for user ${userId} set to ${value}`);
    };

    const getUserPermissions = (userId: string): Omit<UserPermission, 'userId' | 'userDisplayName' | 'userPhotoURL'> => {
        const userPerms = permissions.find(p => p.userId === userId);
        return userPerms || {
            canManageVolunteers: false,
            canManageEvents: false,
            canManageAreas: false,
            canManageTeams: false,
            canGenerateSchedules: false,
            canManageSettings: false,
        };
    };

    const permissionLabels: { key: keyof Omit<UserPermission, 'userId' | 'userDisplayName' | 'userPhotoURL'>; label: string }[] = [
        { key: 'canManageVolunteers', label: 'Gerenciar Voluntários' },
        { key: 'canManageEvents', label: 'Gerenciar Eventos' },
        { key: 'canManageAreas', label: 'Gerenciar Áreas' },
        { key: 'canManageTeams', label: 'Gerenciar Equipes' },
        { key: 'canGenerateSchedules', label: 'Gerar Escalas' },
        { key: 'canManageSettings', label: 'Gerenciar Configurações' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Configurações</h1>
                <p className="text-muted-foreground">Gerencie as permissões de acesso para cada usuário.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Permissões de Usuário</CardTitle>
                    <CardDescription>
                        Controle o que cada usuário pode ver e fazer dentro do aplicativo.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-md">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[300px]">Usuário</TableHead>
                                    {permissionLabels.map(({ label }) => <TableHead key={label}>{label}</TableHead>)}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {displayUsers.map((displayUser) => {
                                    const userPerms = getUserPermissions(displayUser.uid);
                                    const isCurrentUserAdmin = displayUser.email === adminUserEmail;
                                    return (
                                        <TableRow key={displayUser.uid}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar>
                                                        <AvatarImage src={displayUser.photoURL ?? ''} alt={displayUser.displayName ?? ''} />
                                                        <AvatarFallback>{displayUser.displayName?.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <span className="font-medium">{displayUser.displayName}</span>
                                                    {isCurrentUserAdmin && <Badge>Admin</Badge>}
                                                </div>
                                            </TableCell>
                                            {permissionLabels.map(({ key }) => (
                                                <TableCell key={key}>
                                                    <div className="flex items-center space-x-2">
                                                        <Switch
                                                            id={`${displayUser.uid}-${key}`}
                                                            checked={userPerms[key]}
                                                            onCheckedChange={(value) => handlePermissionChange(displayUser.uid, key, value)}
                                                            disabled={isCurrentUserAdmin}
                                                            aria-readonly={isCurrentUserAdmin}
                                                        />
                                                    </div>
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
