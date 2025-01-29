/** @format */

export interface UserViews {
  id?: number;
  name: string;
  email: string;
  level: string | null;
}

export interface BodyLogin {
  email: string;
  password: string;
}

export interface NewUser {
  name: string;
  level: string | null;
  email: string;
  password: string;
}

export interface UserJwt {
  id: number;
  name: string;
  email: string;
  level: string;
  iat: number;
  exp: number;
}

export interface UserFull {
  id: number;
  name: string;
  level: string;
  email: string;
  password: string;
}
