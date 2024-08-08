export interface LoginResponse {
  user: User;
  token: string;
}

export interface User {
  id: number;
  user: string;
  role: string;
}
