export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  deleted: boolean;
  role: Role;
}

export interface Role {
  id: number;
  name: string;
}
