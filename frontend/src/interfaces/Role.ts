import type { RolePermission } from "./RolePermission";
import type { User } from "./๊๊User"

export interface Role {
  ID: number;
  Title: string;
  Description: string;
  RolePermission?: RolePermission[];
  Users?: User[];
}

export interface CreateRoleRequest {

}