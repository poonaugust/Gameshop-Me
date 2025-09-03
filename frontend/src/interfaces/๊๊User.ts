import type { Role } from "./Role";
export interface User {
  ID: number;
  Username: string;
  Password?: string;
  Email: string;
  FirstName?: string;
  LastName?: string;
  Birthday?: string; // ISO string
  RoleID?: number;
  Role?: Role;
}

export interface CreateUserRequest {
  Username: string;
  Password: string;
  Enail: string;
}

export interface LoginUserRequest {
  Username: string;
  Password: string;
}

// Keep old interfaces for backward compatibility
export interface UserInterface {
  ID: number;
  Username: string;
  Password?: string;
  Email: string;
  FirstName?: string;
  LastName?: string;
  Birthday?: string; 
  RoleID?: number;
  Role?: Role;
}