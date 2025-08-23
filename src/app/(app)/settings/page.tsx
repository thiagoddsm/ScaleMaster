"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/use-auth';
import type { UserPermission } from '@/lib/types';
import { userPermissions as initialUserPermissions } from '@/lib/data';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';


export default function SettingsPage() {
    const { user } = useAuth();
    const [permissions, setPermissions] = useState<UserPermission[]>(initialUserPermissions);
    
    // In a real app, you would fetch all users, not just the current one.
    // For this example, we'll just show the current logged-in user.
    const displayUsers = user ? [user] : [];
    
    const handlePermissionChange = (userId: string, permissionKey: keyof Omit<UserPermission, 'userId' | 'userDisplayName' | 'userPhotoURL'>, value: boolean) => {
        setPermissions(prevPermissions => {
            const userIndex = prevPermissions.findIndex(p => p.userId === userId);
            
            if (userIndex > -1) {
                 // Update existing permission
                 return prevPermissions.map((p, index) => 
                    index === userIndex ? { ...p, [permissionKey]: value } : p
                );
            } else {
                // Add new permission entry for the user
                const newUserPermission: UserPermission = {
                    userId,
                    userDisplayName: user?.displayName || 'Unknown User',
                    userPhotoURL: user?.photoURL || '',
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
        
        // Here you would typically save the updated permissions to your database.
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
                                    return (
                                        <TableRow key={displayUser.uid}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar>
                                                        <AvatarImage src={displayUser.photoURL ?? ''} alt={displayUser.displayName ?? ''} />
                                                        <AvatarFallback>{displayUser.displayName?.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <span className="font-medium">{displayUser.displayName}</span>
                                                </div>
                                            </TableCell>
                                            {permissionLabels.map(({ key, label }) => (
                                                <TableCell key={key}>
                                                    <div className="flex items-center space-x-2">
                                                        <Switch
                                                            id={`${displayUser.uid}-${key}`}
                                                            checked={userPerms[key]}
                                                            onCheckedChange={(value) => handlePermissionChange(displayUser.uid, key, value)}
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
