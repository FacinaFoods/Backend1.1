export interface SellerViews {
    id: number,
    name: string,
    level: string | null,
    email: string,
}

export interface BodyLogin {
    email: string,
    password: string
}

export interface NewSeller {
    name: string,
    level: string | null,
    email: string,
    password: string;
}