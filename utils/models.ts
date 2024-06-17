export interface FormValidationRule {
  key: string;
  message: string;
  isValid: () => boolean;
}

export type FormErrorType = Record<string, string[]>;

export enum RoleEnum {
  ADMIN = 'admin',
  CLIENT = 'client',
}

export interface User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: RoleEnum;
}

export interface AuthPayload {
  success: boolean;
  user: User;
  accessToken: string;
}

export interface VerifyTokenPayload {
  success: boolean;
  user: User;
}

export interface LogoutTokenPayload {
  success: boolean;
  msg: string;
}
