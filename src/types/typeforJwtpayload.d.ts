

export interface jwtpayLoadType {

    id: number;
    role: "admin" | "customer";
    name: string;
    email:  string;
    phone: string;
    iat: number;
    exp: number;

}