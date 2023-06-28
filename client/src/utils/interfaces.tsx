export interface UserCredentials {
  id: number;
  name: string;
  email: string;
  password?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}
