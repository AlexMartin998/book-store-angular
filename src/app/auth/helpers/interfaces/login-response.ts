import { User } from 'src/app/shared/interfaces';

export interface LoginResponse {
  token: string;
  user: User;
}
