import type { Role } from "./Role";
import type { Permission } from "./Permission";

export interface RolePermission {
  ID: number;
  RoleID: number;
  PermissionID: number;
  Role?: Role;
  Permission?: Permission;
}