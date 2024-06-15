export interface IUserPut {
  id: number;
  username: string;
  email: string;
  password: string;
  newPass: string;
  bio: string;
  state: string;
}

interface IRol {
  id: number;
  roleName: string;
}

export interface IUserMan {
  id: number;
  username: string;
  email: string;
  rol: IRol[];
  lastConnection: string;
}
