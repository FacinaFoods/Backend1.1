export interface UserViews {
    id?: number,
    name: string,
    email: string,
    level: string | null,
}

export interface BodyLogin {
    email: string,
    password: string
}

export interface NewUser {
    name: string,
    level: string | null,
    email: string,
    password: string;
}