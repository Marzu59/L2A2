

export interface jwtpayLoadType {

    id: number;
    role: "admin" | "customer";
    name: string;
    email:  string;
    phone: string;
    iat: number;
    exp: number;

};



export interface Boookingtype {
    id: number | string;
    customer_id: number | string;
    vehicle_id: number | string ;
    rent_start_date: Date;
    rent_end_date: Date;  
    total_price: number | string;
    status: string;
    created_at: Date;     
  };