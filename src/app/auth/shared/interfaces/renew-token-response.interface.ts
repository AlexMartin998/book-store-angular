import { User } from 'src/app/shared/interfaces';

// it would be convenient to have a Mapper to map the backend response so that, if it changes, we ONLY have to modify the Mapper and NOT the entire Code
export interface RenewTokenResponse {
  token: string;
  user: User;
}
