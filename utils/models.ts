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

export interface UserCriteria {
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  role: RoleEnum;
}

export interface ObjectInterface {
  _id: string;
  name: string;
  description: string;
}

export interface ObjectCriteria {
  name: string;
  description: string;
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

export interface Payload {
  success: boolean;
  msg: string;
}

export interface Paginate<T> {
  rows: T[];
  currentPage: number | null;
  totalPages: number | null;
  limit: number | null;
  total: number | null;
}

export interface Single<T> {
  item: T;
  success: boolean;
}
