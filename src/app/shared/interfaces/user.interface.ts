export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: Role;
}

export interface Role {
  id: number;
  name: string;
}
