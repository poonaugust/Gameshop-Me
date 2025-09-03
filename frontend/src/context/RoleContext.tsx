import React, { createContext, useContext, useState } from "react";

export type Role = {
  id: string;
  name: string;
  color: string;
  permissions: Record<string, boolean>;
  members: number[];
};

type RolesContextType = {
  roles: Role[];
  addRole: () => Role;
  updateRole: (id: string, updated: Partial<Role>) => void;
  removeRole: (id: string) => void;
};

const RolesContext = createContext<RolesContextType | undefined>(undefined);

export const RolesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const permissionsList = ["view_store", "purchase_game", "view_library", "manage_users", "manage_roles"];

  const [roles, setRoles] = useState<Role[]>([
    {
      id: "1",
      name: "Admin",
      color: "#1890ff",
      permissions: Object.fromEntries(permissionsList.map((p) => [p, true])),
      members: [1, 2],
    },
    {
      id: "2",
      name: "Customer",
      color: "#52c41a",
      permissions: Object.fromEntries(permissionsList.map((p) => [p, false])),
      members: [3],
    },
    {
      id: "3",
      name: "@everyone",
      color: "#aaa",
      permissions: Object.fromEntries(permissionsList.map((p) => [p, false])),
      members: [],
    },
  ]);

  const addRole = () => {
    const newId = (roles.length + 1).toString();
    const newRole: Role = {
      id: newId,
      name: "New Role",
      color: "#a0a0a0",
      permissions: Object.fromEntries(permissionsList.map((p) => [p, false])),
      members: [],
    };
    setRoles((prev) => [...prev, newRole]);
    return newRole;
  };

  const updateRole = (id: string, updated: Partial<Role>) => {
    setRoles((prev) => prev.map((r) => (r.id === id ? { ...r, ...updated } : r)));
  };

  const removeRole = (id: string) => {
    setRoles((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <RolesContext.Provider value={{ roles, addRole, updateRole, removeRole }}>
      {children}
    </RolesContext.Provider>
  );
};

export const useRoles = () => {
  const context = useContext(RolesContext);
  if (!context) throw new Error("useRoles must be used within a RolesProvider");
  return context;
};
